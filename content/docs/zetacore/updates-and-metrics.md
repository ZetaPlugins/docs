---
title: Update checks & bStats
description: Tell server owners about new versions and collect bStats metrics with almost no code.
icon: RefreshCw
---

## Update checks

Create a `@Service` that extends the update checker for the platform you publish on:

::::tabs
:::tab[Modrinth]

```java
@Service
public class Updates extends ModrinthUpdateChecker {
    public Updates(JavaPlugin plugin) {
        super(plugin, "your-project-id-or-slug");
    }
}
```

:::
:::tab[Hangar]

```java
@Service
public class Updates extends HangarUpdateChecker {
    public Updates(JavaPlugin plugin) {
        super(plugin, "YourHangarName", "your-project-slug");
    }
}
```

:::
:::tab[GitHub]

```java
@Service
public class Updates extends GitHubUpdateChecker {
    public Updates(JavaPlugin plugin) {
        super(plugin, "your-github-name", "your-repo");
    }
}
```

:::
::::

On startup, ZetaCore runs all update checkers asynchronously. If a newer version is available, a notice is printed to the console:

```text
==========================================
A new version of MyPlugin is available!
New Version: 1.2.0 (Your version: 1.1.0)
Download here: https://modrinth.com/...
==========================================
```

The installed version is read from `version:` in your `plugin.yml`. Versions are compared semantically (`1.10.0` is newer than `1.9.0`). Modrinth and Hangar only consider releases for the server's Minecraft version.

### Notifying administrators in-game

Inject your checker and use its result:

```java
@EventListener
public class UpdateNotifyListener implements Listener {
    private final Updates updates;

    public UpdateNotifyListener(Updates updates) {
        this.updates = updates;
    }

    @EventHandler
    public void onJoin(PlayerJoinEvent event) {
        if (!updates.isNewVersionAvailable()) return;
        if (!event.getPlayer().hasPermission("myplugin.admin")) return;

        event.getPlayer().sendRichMessage(
            "<yellow>MyPlugin " + updates.getLatestVersion() + " is available. "
            + "<click:open_url:'" + updates.getLatestVersionUrl() + "'><u>Download</u></click>"
        );
    }
}
```

`isNewVersionAvailable()` returns `false` until the asynchronous check has completed, which typically happens shortly after startup.

### Making update checks optional

Use a [condition](conditions) to let server owners disable update checks:

```java
public class UpdateChecksEnabled implements Condition {
    private final MainConfig config;

    public UpdateChecksEnabled(MainConfig config) {
        this.config = config;
    }

    @Override
    public boolean matches() {
        return config.checkForUpdates;
    }
}
```

```java
@Service
@Conditional(UpdateChecksEnabled.class)
public class Updates extends ModrinthUpdateChecker { ... }
```

Any class that injects `Updates` must then use the same condition.

## bStats

Register your plugin on [bstats.org](https://bstats.org) and set the plugin ID on your main class:

```java
@ZetaPlugin(bstatsId = 12345)
public final class MyPlugin extends ZetaCorePlugin {
}
```

ZetaCore includes the bStats `Metrics` class, so no separate bStats dependency or relocation is needed.

### Custom charts

Implement `MetricsCustomizer` as a service:

```java
@Service
public class Charts implements MetricsCustomizer {
    private final MainConfig config;

    public Charts(MainConfig config) {
        this.config = config;
    }

    @Override
    public void customize(Metrics metrics) {
        metrics.addCustomChart(new Metrics.SimplePie("language", () -> config.lang));
        metrics.addCustomChart(new Metrics.SimplePie("economy_enabled",
                () -> String.valueOf(config.economy.enabled)));
    }
}
```

`Metrics` refers to `com.zetaplugins.zetacore.integration.bstats.Metrics`. All standard chart types are available: `SimplePie`, `AdvancedPie`, `DrilldownPie`, `SingleLineChart`, `MultiLineChart`, `SimpleBarChart`, `AdvancedBarChart`.
