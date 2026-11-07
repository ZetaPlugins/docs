---
title: Commands
description: Arguments, subcommands, tab completion, permissions and error handling.
icon: SquareTerminal
---

## The basic shape

A command is a class that extends `PluginCommand<YourPlugin>` and is annotated with `@Command`:

```java
@Command("hello")
public class HelloCommand extends PluginCommand<MyPlugin> {
    public HelloCommand(MyPlugin plugin) {
        super(plugin);
    }

    @Override
    public boolean execute(CommandContext ctx) {
        ctx.getSender().sendMessage("Hello!");
        return true;
    }

    @Override
    public List<String> tabComplete(CommandContext ctx) {
        return List.of();
    }
}
```

Place it anywhere inside your plugin's package. ZetaCore registers it on startup; no `plugin.yml` entry is needed.

:::tip
Return `true` from `execute`. Unlike plain Bukkit commands, returning `false` does not print the usage message. To show the usage, [throw a `CommandUsageException`](#error-handling).
:::

## Aliases, description, usage, permission

```java
@Command("heal")
@Alias({"h", "patchup"})
@Description("Heal yourself or someone else")
@Usage("/%command% [player]")
@Permission("myplugin.command.%command%")
public class HealCommand extends PluginCommand<MyPlugin> { ... }
```

`%command%` is replaced with the command name, so the same annotation values can be reused across commands.

The permission is attached to the command and handled by the server like any other command permission. For finer-grained checks, such as per subcommand or for targeting other players, check permissions in `execute`. See [permissions](permissions).

### One class, several commands

`@Command` accepts several names. Each name is registered as a **separate** command, not as an alias:

```java
@Command({"gmc", "gms", "gma", "gmsp"})
public class GamemodeShortcutCommand extends PluginCommand<MyPlugin> {
    @Override
    public boolean execute(CommandContext ctx) {
        GameMode mode = switch (ctx.getCommand().getName()) {
            case "gmc" -> GameMode.CREATIVE;
            case "gma" -> GameMode.ADVENTURE;
            case "gmsp" -> GameMode.SPECTATOR;
            default -> GameMode.SURVIVAL;
        };
        // ...
        return true;
    }
    // ...
}
```

`ctx.getCommand().getName()` returns the command that was executed. `ctx.getLabel()` returns the label the sender typed, which may be an alias.

## Reading arguments

`ctx.getArgs()` returns an `ArgumentList`, a wrapper around `String[] args` with parsing helpers:

```java
ArgumentList args = ctx.getArgs();

args.size();                         // how many args
args.hasArg(1);                      // is there a 2nd arg?
args.getArg(0);                      // the 1st arg, or null
args.getString(0, "help");           // the 1st arg, or "help"

args.getInt(1, 1);                   // int, or 1 if missing / not a number
args.getInt(1, 1, 1, 64);            // ...and clamped between 1 and 64
args.getDouble(2, 0.0);
args.getLong(2, 0L);
args.getBoolean(3, false);           // accepts true/false, yes/no, y/n, 1/0

args.getEnum(0, GameMode.class);                       // null if invalid
args.getEnum(0, GameMode.class, GameMode.SURVIVAL);    // with default

args.getJoinedString(1);             // everything from arg 1 on, joined with spaces
                                     // e.g. "/broadcast hello there world" -> "hello there world"
```

The overloads without a default (`getInt(1)`, `getDouble(1)`, `getLong(1)`) throw `NumberFormatException` if the argument is missing or invalid.

### Getting players

```java
// the sender, if it's a player
Optional<Player> self = ctx.getPlayerSender();

// the online player named in arg 0 (exact name)
Optional<Player> target = ctx.getPlayer(0);

// arg 0 if given, otherwise the sender (the "/heal [player]" pattern)
Optional<Player> who = ctx.getPlayerOrSender(0);
```

If argument 0 is given but the player is not online, `getPlayerOrSender` returns an empty `Optional`. It does **not** fall back to the sender in that case.

## Subcommands

There is no dedicated subcommand API. Switch on the first argument instead:

```java
@Command("myplugin")
@Alias("mp")
public class MainCommand extends PluginCommand<MyPlugin> {
    private final ConfigService configService;

    public MainCommand(MyPlugin plugin, ConfigService configService) {
        super(plugin);
        this.configService = configService;
    }

    @Override
    public boolean execute(CommandContext ctx) throws CommandException {
        switch (ctx.getArgs().getString(0, "help").toLowerCase()) {
            case "reload" -> {
                if (!ctx.getSender().hasPermission("myplugin.reload")) {
                    throw new CommandPermissionException("myplugin.reload");
                }
                configService.reload();
                ctx.getSender().sendMessage("Reloaded!");
            }
            case "version" -> ctx.getSender().sendMessage(getPlugin().getPluginMeta().getVersion());
            default -> ctx.getSender().sendMessage("/mp <reload|version>");
        }
        return true;
    }

    @Override
    public List<String> tabComplete(CommandContext ctx) {
        if (ctx.getArgs().size() == 1) {
            return getDisplayOptions(List.of("reload", "version"), ctx.getArgs().getCurrentArg());
        }
        return List.of();
    }
}
```

For larger subcommands, move the logic into a [service](services) and call it from the switch.

## Tab completion

`tabComplete` receives the same `CommandContext`. Two helpers cover most cases:

```java
@Override
public List<String> tabComplete(CommandContext ctx) {
    ArgumentList args = ctx.getArgs();
    String typed = args.getCurrentArg(); // what's typed so far in the current arg

    return switch (args.size()) {
        case 1 -> getPlayerOptions(typed);                                   // online player names
        case 2 -> getDisplayOptions(List.of("small", "medium", "large"), typed); // your own options
        default -> List.of();
    };
}
```

Both filter the options to entries that start with the current input (case-insensitive).

## Error handling

Instead of nested checks and early returns, **throw** a `CommandException` from `execute`:

| Throw this                                      | When                                 |
| ----------------------------------------------- | ------------------------------------ |
| `CommandUsageException(usage)`                  | wrong arguments                      |
| `CommandPermissionException(permission)`        | no permission                        |
| `CommandSenderMustBePlayerException()`          | console ran a player-only command    |
| `CommandSenderMustBeOrSpecifyPlayerException()` | console ran `/heal` without a target |

```java
@Override
public boolean execute(CommandContext ctx) throws CommandException {
    Player target = ctx.getPlayerOrSender(0)
            .orElseThrow(CommandSenderMustBeOrSpecifyPlayerException::new);

    int amount = ctx.getArgs().getInt(1, -1);
    if (amount < 1) throw new CommandUsageException("/give-hearts <player> <amount>");

    // main logic
    return true;
}
```

:::warning[Exceptions need a handler]
ZetaCore does **not** provide default messages for these exceptions. If no handler is registered, the command silently does nothing. Register the handlers once in a base class, as shown below.
:::

### Registering handlers in a base command

Create an abstract base class that registers all handlers, and extend it instead of `PluginCommand`:

```java title="BaseCommand.java"
public abstract class BaseCommand extends PluginCommand<MyPlugin> {
    protected BaseCommand(MyPlugin plugin) {
        super(plugin);

        registerExceptionHandler(CommandUsageException.class, (ctx, e) -> {
            ctx.getSender().sendRichMessage("<red>Usage: " + e.getUsage());
            return true;
        });
        registerExceptionHandler(CommandPermissionException.class, (ctx, e) -> {
            ctx.getSender().sendRichMessage("<red>You don't have permission to do that.");
            return true;
        });
        registerExceptionHandler(CommandSenderMustBePlayerException.class, (ctx, e) -> {
            ctx.getSender().sendRichMessage("<red>Only players can use this.");
            return true;
        });
        registerExceptionHandler(CommandSenderMustBeOrSpecifyPlayerException.class, (ctx, e) -> {
            ctx.getSender().sendRichMessage("<red>Specify an online player.");
            return true;
        });
    }
}
```

```java
@Command("heal")
public class HealCommand extends BaseCommand {
    public HealCommand(MyPlugin plugin) {
        super(plugin);
    }
    // ...
}
```

The base class has no `@Command` annotation, so it is not registered as a command.

Handlers are resolved by exception class, falling back to its superclasses. You can define your own exceptions (`extends CommandException`), and a handler for `CommandException.class` acts as a catch-all.

For translated messages, pass your [messages service](messages) into the base class constructor and use it in the handlers.

### One-off errors

For one-off messages that do not warrant a dedicated exception class, use `GenericCommandException`, which carries its own handler:

```java
if (home == null) {
    throw new GenericCommandException((c, e) -> {
        c.getSender().sendRichMessage("<red>You don't have a home called " + name);
        return true;
    });
}
```

## Using services in commands

Commands are created by the [dependency injection](services) system, so any service can be declared as a constructor parameter:

```java
@Command("homes")
public class HomesCommand extends BaseCommand {
    private final HomeService homes;
    private final Messages messages;

    public HomesCommand(MyPlugin plugin, HomeService homes, Messages messages) {
        super(plugin);
        this.homes = homes;
        this.messages = messages;
    }
    // ...
}
```

Field injection with `@Inject` is also supported.

## Enabling commands from config

Implement `CommandRegistrationCustomizer` as a service. Each command name is passed to `shouldRegister` before registration:

```java
@Service
public class CommandToggles implements CommandRegistrationCustomizer {
    private final MainConfig config;

    public CommandToggles(MainConfig config) {
        this.config = config;
    }

    @Override
    public boolean shouldRegister(String commandName) {
        // config.yml: disabled-commands: [heal, feed]
        return !config.disabledCommands.contains(commandName);
    }

    @Override
    public void onCommandsRegistered(List<String> registered) {
        // optional: runs once afterwards with everything that got registered
    }
}
```

To enable a command only when another plugin is installed, use [conditions](conditions). `@ConditionalOnPlugin` can be placed directly on a command class.

## Namespaces

Commands are registered as `/feed` and `/myplugin:feed`, where the namespace defaults to your plugin name in lowercase. To change it, set `@ZetaPlugin(commandNamespace = "mp")` on your main class.

## Existing `plugin.yml` commands

If a `@Command` name is also declared in your `plugin.yml`, ZetaCore uses that entry and sets your class as its executor and tab completer.

:::note[Separate tab completer classes]
If you write commands as plain `CommandExecutor`s instead of extending `PluginCommand`, you can put the tab completion in its own class with `@TabCompleterHandler("commandname")` on a class that implements `TabCompleter`. `PluginCommand` already handles both, so this is rarely needed.
:::
