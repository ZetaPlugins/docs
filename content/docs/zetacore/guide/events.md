---
title: Event Registration
description: Register Bukkit listeners automatically with @EventListener and the auto registrar.
---

Listeners work the same way as commands: annotate them, scan your package, and register them through the auto registrar.

```java
package com.example.myplugin.listener;

import com.zetaplugins.zetacore.event.annotation.EventListener;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;

@EventListener
public class JoinListener implements Listener {
    @EventHandler
    public void onJoin(PlayerJoinEvent event) {
        event.getPlayer().sendMessage("Welcome!");
    }
}
```

Register the listeners during startup:

```java
new AutoEventListenerRegistrar.Builder()
    .withPlugin(this)
    .withPackagePrefix(getClass().getPackageName())
    .withServiceRegistry(services)
    .build()
    .registerAllListeners();
```

If you already have listener instances, call `registerListener(...)` directly.
