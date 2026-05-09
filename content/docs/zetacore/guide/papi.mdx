---
title: PlaceholderAPI Integration
description: Build and register PlaceholderAPI expansions with PapiExpansionService.
---

`PapiExpansionService` is the main entry point for PlaceholderAPI support. It lets you register exact placeholders, pattern-based placeholders, and annotated methods.

The simplest setup uses the plugin constructor so the expansion metadata comes from your plugin automatically:

```java
PapiExpansionService expansion = new PapiExpansionService(this)
    .addPlaceholder("server_name", (player, identifier) -> getServer().getName())
    .addPlaceholder("player_world", (player, identifier) -> player == null ? "unknown" : player.getWorld().getName());
```

To expose a method as a placeholder, annotate it with `@Papi`:

```java
package com.example.myplugin.papi;

import com.zetaplugins.zetacore.integration.papi.annotation.Papi;
import org.bukkit.OfflinePlayer;

public class MyPlaceholders {
    @Papi(identifier = "player_name")
    public String playerName(OfflinePlayer player) {
        return player.getName();
    }

    @Papi(identifier = "balance_{currency}")
    public String balance(OfflinePlayer player, @com.zetaplugins.zetacore.integration.papi.annotation.PapiParam("currency") String currency) {
        return currency + ": 100";
    }
}
```

Register annotated methods and then register the expansion if PlaceholderAPI is installed:

```java
PapiExpansionService expansion = new PapiExpansionService(this)
    .addAnnotatedPlaceholders(new MyPlaceholders());

if (PapiExpansionService.hasPapi()) {
    expansion.register();
}
```

What the expansion supports:

- Exact placeholders through `addPlaceholder(...)`.
- Pattern placeholders with `{name}` segments.
- Zero-argument methods, single-player methods, and pattern methods with typed `@PapiParam` parameters.
- `OfflinePlayer`, `Player`, `String`, and basic numeric and boolean parameter conversion for pattern placeholders.

Use `setPlayerNotFoundMessage(...)` and `setPlayerNotOnlineMessage(...)` if you want custom fallback strings for offline or missing players.
