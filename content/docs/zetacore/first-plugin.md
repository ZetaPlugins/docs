---
title: Your first plugin
description: Build a small working plugin and see what ZetaCore does for you.
icon: Rocket
---

This guide builds a plugin with a `/feed` command and a configurable welcome message. It covers the features you will use most often: commands, listeners, configuration and dependency injection.

Complete the [setup](setup) before you begin.

The finished project has the following structure:

:::files

- src/main/
    - java/com/example/myplugin/
        - MyPlugin.java
        - MainConfig.java
        - FeedCommand.java
        - WelcomeListener.java
    - resources/
        - plugin.yml
        - config.yml

:::

::::steps

### The main class

```java title="MyPlugin.java"
package com.example.myplugin;

import com.zetaplugins.zetacore.ZetaCorePlugin;

public final class MyPlugin extends ZetaCorePlugin {
}
```

Extend `ZetaCorePlugin` instead of `JavaPlugin`. No further code is required in the main class.

:::warning
`onEnable()` and `onDisable()` are `final` in `ZetaCorePlugin`, because ZetaCore uses them for its own startup and shutdown. To run your own code at these points, override `onStartup()` and `onShutdown()` instead (see [below](#running-code-on-startup-or-shutdown)).
:::

### plugin.yml

A standard `plugin.yml`. A `commands:` section is **not** required.

```yaml title="plugin.yml"
name: MyPlugin
version: 1.0.0
main: com.example.myplugin.MyPlugin
api-version: '1.20'
```

### A config file

Add the default config to your resources:

```yaml title="config.yml"
welcome-message: "<green>Welcome to the server, <yellow>%player%</yellow>!"
food-level: 20
```

Then define a matching Java class:

```java title="MainConfig.java"
package com.example.myplugin;

import com.zetaplugins.zetacore.config.annotation.ConfigFile;
import com.zetaplugins.zetacore.config.annotation.ConfigKey;

@ConfigFile("config.yml")
public class MainConfig {
    @ConfigKey(name = "welcome-message")
    public String welcomeMessage = "<green>Welcome!";

    @ConfigKey(name = "food-level")
    public int foodLevel = 20;
}
```

The field values act as defaults whenever a key is missing from the file. `@ConfigKey` is needed here because the YAML keys use `kebab-case`; if your keys match the field names exactly, it can be omitted. See [config files](config) for details.

### A command

```java title="FeedCommand.java"
package com.example.myplugin;

import com.zetaplugins.zetacore.command.CommandContext;
import com.zetaplugins.zetacore.command.PluginCommand;
import com.zetaplugins.zetacore.command.annotation.Command;
import com.zetaplugins.zetacore.command.annotation.Description;
import com.zetaplugins.zetacore.command.annotation.Permission;
import com.zetaplugins.zetacore.command.annotation.Usage;
import org.bukkit.entity.Player;

import java.util.List;
import java.util.Optional;

@Command("feed")
@Description("Fill up your hunger bar")
@Usage("/feed [player]")
@Permission("myplugin.feed")
public class FeedCommand extends PluginCommand<MyPlugin> {
    private final MainConfig config;

    public FeedCommand(MyPlugin plugin, MainConfig config) {
        super(plugin);
        this.config = config;
    }

    @Override
    public boolean execute(CommandContext ctx) {
        // /feed -> feed yourself, /feed Steve -> feed Steve
        Optional<Player> target = ctx.getPlayerOrSender(0);

        if (target.isEmpty()) {
            // console without an argument, or a player name that isn't online
            ctx.getSender().sendRichMessage("<red>Usage: /feed [player] (the player has to be online)");
            return true;
        }

        target.get().setFoodLevel(config.foodLevel);
        ctx.getSender().sendRichMessage("<green>Fed " + target.get().getName() + "!");
        return true;
    }

    @Override
    public List<String> tabComplete(CommandContext ctx) {
        if (ctx.getArgs().size() == 1) return getPlayerOptions(ctx.getArgs().getCurrentArg());
        return List.of();
    }
}
```

The constructor declares `MyPlugin` and `MainConfig` as parameters, and ZetaCore supplies both. You never instantiate `FeedCommand` yourself.

### A listener

```java title="WelcomeListener.java"
package com.example.myplugin;

import com.zetaplugins.zetacore.event.annotation.EventListener;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;

@EventListener
public class WelcomeListener implements Listener {
    private final MainConfig config;

    public WelcomeListener(MainConfig config) {
        this.config = config;
    }

    @EventHandler
    public void onJoin(PlayerJoinEvent event) {
        String message = config.welcomeMessage.replace("%player%", event.getPlayer().getName());
        event.getPlayer().sendRichMessage(message);
    }
}
```

The pattern is the same: annotate the class with `@EventListener` and declare its dependencies in the constructor.

### Build and run

Build the jar (`mvn package` or `./gradlew build`), copy it into the server's `plugins/` folder and start the server. The console should show a line similar to:

```text
[MyPlugin] Enabled with 1 services, 1 commands, 1 listeners, 0 permissions and 0 placeholders.
```

Joining the server displays the welcome message, and `/feed` restores your hunger bar.

::::

## What happens on startup

When the server enables your plugin, `ZetaCorePlugin` performs these steps:

1. Saves `config.yml` to the plugin folder if it does not exist yet.
2. Scans **your main class's package and all sub-packages** for annotated classes.
3. Starts all services marked for eager loading (see [services](services)).
4. Registers permissions, commands, listeners and PlaceholderAPI placeholders, in that order.
5. Starts bStats and update checks, if configured.
6. Calls `onStartup()`.

All commands and listeners are created through the [dependency injection](services) system, which is why their dependencies can be declared as constructor parameters.

:::tip
Only classes **inside your main class's package** are scanned. If your main class is in `com.example.myplugin`, a command in `com.example.other` will not be found. Keep all classes under one root package.
:::

## Running code on startup or shutdown

Override `onStartup()` and `onShutdown()`:

```java title="MyPlugin.java"
public final class MyPlugin extends ZetaCorePlugin {
    @Override
    protected void onStartup() {
        // everything is registered and ready here
        getLogger().info("MyPlugin is ready.");
    }

    @Override
    protected void onShutdown() {
        // runs before services are shut down
    }
}
```

In most cases, startup and shutdown logic is better placed in a [service](services#lifecycle-callbacks) using `@PostConstruct` and `@PreDestroy`.

## Changing the defaults

Annotate your main class with `@ZetaPlugin` to override the defaults:

```java title="MyPlugin.java"
@ZetaPlugin(
    packagePrefix = "com.example.myplugin", // which package to scan (default: main class's package)
    commandNamespace = "mp",                 // /mp:feed instead of /myplugin:feed
    bstatsId = 12345,                        // turn on bStats
    requireServiceAnnotation = true          // see the services page (default: true)
)
public final class MyPlugin extends ZetaCorePlugin {
}
```

All attributes are optional.

## Next steps

- [Commands](commands): arguments, subcommands, tab completion, error messages
- [Services](services): sharing logic and state between classes (recommended reading)
- [Messages](messages): translations, prefixes, colors
