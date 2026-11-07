---
title: ZetaCore
description: Write Paper plugins without the boilerplate.
icon: Wrench
---

ZetaCore is a lightweight framework for Paper plugins. You write commands, listeners and config classes, annotate them, and ZetaCore discovers and registers them on startup. This removes the usual registration boilerplate (`getCommand(...).setExecutor(...)`, `registerEvents(...)`) and the need to pass your main class into every constructor.

The following is a complete plugin with one command and one config file:

```java title="MyPlugin.java"
public final class MyPlugin extends ZetaCorePlugin {
    // no code required
}
```

```java title="FeedCommand.java"
@Command("feed")
@Permission("myplugin.feed")
public class FeedCommand extends PluginCommand<MyPlugin> {
    private final MainConfig config;

    public FeedCommand(MyPlugin plugin, MainConfig config) {
        super(plugin);
        this.config = config;
    }

    @Override
    public boolean execute(CommandContext ctx) {
        ctx.getPlayerSender().ifPresent(player -> player.setFoodLevel(config.foodLevel));
        return true;
    }

    @Override
    public List<String> tabComplete(CommandContext ctx) {
        return List.of();
    }
}
```

```java title="MainConfig.java"
@ConfigFile("config.yml")
public class MainConfig {
    public int foodLevel = 20;
}
```

No manual registration is needed. On startup, ZetaCore scans your plugin's package, creates `FeedCommand` with the plugin instance and the parsed `config.yml`, and registers `/feed`.

## Features

- **Commands** defined by annotated classes, without `plugin.yml` entries.
- **Event listeners** that are registered automatically.
- **Dependency injection** through constructors or `@Inject` fields.
- **Typed configuration**: YAML files are mapped onto plain Java classes, with defaults defined as field values.
- **Messages and translations** with MiniMessage, `&` color codes, a prefix and placeholders.
- **Permissions**, **PlaceholderAPI placeholders**, **update checks** and **bStats**, all registered automatically.
- **Conditional components** that are only loaded when, for example, another plugin is installed.

## Getting started

::::cards
:::card{href="/zetacore/setup" title="Setup" icon="Package"}
Add ZetaCore to your Maven or Gradle project.
:::

:::card{href="/zetacore/first-plugin" title="Your first plugin" icon="Rocket"}
Build a small working plugin and learn how ZetaCore fits together.
:::

:::card{href="/zetacore/troubleshooting" title="Troubleshooting" icon="Bug"}
Common errors and how to resolve them.
:::

:::card{href="https://jd.zetacore.zetaplugins.com" title="Javadocs" icon="BookOpen"}
The complete API reference.
:::
::::

## License

ZetaCore is open source under the GNU General Public License v3.0. The source is on [GitHub](https://github.com/ZetaPlugins/zetacore).
