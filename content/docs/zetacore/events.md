---
title: Event listeners
description: Listen to Bukkit events without registering anything by hand.
icon: Zap
---

Annotate any class that implements `Listener` with `@EventListener` to have it registered on startup:

```java
@EventListener
public class BlockBreakListener implements Listener {
    @EventHandler
    public void onBreak(BlockBreakEvent event) {
        if (event.getBlock().getType() == Material.BEDROCK) {
            event.setCancelled(true);
        }
    }
}
```

`@EventHandler` methods behave as usual, including priorities and `ignoreCancelled`. ZetaCore only takes care of the `registerEvents(...)` call.

## Using services and config

Declare dependencies as constructor parameters:

```java
@EventListener
public class JoinListener implements Listener {
    private final MainConfig config;
    private final Messages messages;
    private final StatsService stats;

    public JoinListener(MainConfig config, Messages messages, StatsService stats) {
        this.config = config;
        this.messages = messages;
        this.stats = stats;
    }

    @EventHandler
    public void onJoin(PlayerJoinEvent event) {
        stats.recordJoin(event.getPlayer());
        if (config.welcomeEnabled) {
            messages.send(event.getPlayer(), true, "welcome", "<green>Welcome!");
        }
    }
}
```

Alternatively, use field injection:

```java
@EventListener
public class JoinListener implements Listener {
    @Inject private MainConfig config;
    @Inject private Messages messages;
    // ...
}
```

Both approaches are described in [services](services).

## Conditional listeners

```java
@EventListener
@ConditionalOnPlugin("WorldGuard")
public class RegionListener implements Listener { ... }
```

If WorldGuard is not installed, the listener is neither created nor registered. Add `WorldGuard` to `softdepend` in your `plugin.yml` so it loads first. See [conditions](conditions).

## Registering listeners manually

Listeners created at runtime, such as one per minigame round, are registered with the standard Bukkit API:

```java
getServer().getPluginManager().registerEvents(new RoundListener(arena), plugin);
```

If such a listener needs services, declare them as `@Inject` fields and pass the instance through the registry first:

```java
RoundListener listener = new RoundListener(arena);
serviceRegistry.injectServices(listener); // fills the @Inject fields
getServer().getPluginManager().registerEvents(listener, plugin);
```

See [services](services#creating-objects-manually).
