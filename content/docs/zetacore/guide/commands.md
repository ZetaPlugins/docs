---
title: Command Registration
description: Register commands and tab completers with annotations and the auto registrar.
---

`AutoCommandRegistrar` scans your package for command classes and registers them for you. The command class itself can act as the executor, and it can also implement `TabCompleter`.

Use these annotations on the command class:

- `@Command` for the command name or names.
- `@Alias` for aliases.
- `@Description` for the Bukkit description.
- `@Usage` for the usage string.
- `@Permission` for the required permission.

```java
package com.example.myplugin.command;

import com.example.myplugin.MyPlugin;
import com.zetaplugins.zetacore.command.CommandContext;
import com.zetaplugins.zetacore.command.PluginCommand;
import com.zetaplugins.zetacore.command.annotation.Alias;
import com.zetaplugins.zetacore.command.annotation.Command;
import com.zetaplugins.zetacore.command.annotation.Description;
import com.zetaplugins.zetacore.command.annotation.Permission;
import com.zetaplugins.zetacore.command.annotation.Usage;

@Command({"hello", "hi"})
@Alias({"greet"})
@Description("Sends a greeting message")
@Usage("/%command% [player]")
@Permission("myplugin.command.%command%")
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
    public java.util.List<String> tabComplete(CommandContext ctx) {
        return java.util.List.of();
    }
}
```

Register everything during `onEnable`:

```java
new AutoCommandRegistrar.Builder()
    .withPlugin(this)
    .withPackagePrefix(getClass().getPackageName())
    .withServiceRegistry(services)
    .build()
    .registerAllCommands();
```

If you still have a `plugin.yml` command, you can register it manually with `registerCommand(name, executor, tabCompleter)`.
