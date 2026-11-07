---
title: Plugin Base
description: Learn what ZetaCorePlugin adds on top of Bukkit's JavaPlugin.
---

`ZetaCorePlugin` is a lightweight base class for Paper plugins. It does not hide Bukkit; it just gives you a couple of conveniences that show up often in plugin startup code.

It provides:

- `getPluginFile()` when you need the plugin jar file itself.
- `createBStatsMetrics(int pluginId)` when you want to initialize bStats quickly.

```java
package com.example.myplugin;

import com.zetaplugins.zetacore.ZetaCorePlugin;
import com.zetaplugins.zetacore.integration.bstats.Metrics;

public final class MyPlugin extends ZetaCorePlugin {
    @Override
    public void onEnable() {
        Metrics metrics = createBStatsMetrics(12345);
    }
}
```

Most real behavior lives in services, commands, listeners, and config objects. This class is just the foundation for those pieces.
