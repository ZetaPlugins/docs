---
title: Config Parsing
description: Map YAML files into typed Java objects with ConfigService and config annotations.
---

`ConfigService` loads YAML files from your plugin data folder and can map them into typed Java objects.

The typed mapper uses three annotations:

- `@ConfigFile` on the root config class.
- `@ConfigSection` on nested section classes.
- `@ConfigKey(name = "...")` when a YAML key does not match the field name.

```java
package com.example.myplugin.config;

import com.zetaplugins.zetacore.config.annotation.ConfigFile;
import com.zetaplugins.zetacore.config.annotation.ConfigKey;
import com.zetaplugins.zetacore.config.annotation.ConfigSection;

import java.util.List;
import java.util.Map;

@ConfigFile("settings.yml")
public class SettingsConfig {
    public String lang;

    @ConfigKey(name = "attr-with-dash")
    public String attrWithDash;

    public List<String> statusList;
    public Map<String, ItemConfig> advancedItems;
    public SettingsSection settings;

    @ConfigSection
    public static class SettingsSection {
        public boolean enableFeature;
    }

    @ConfigSection
    public static class ItemConfig {
        public int id;
        public String type;
        public List<String> description;
    }
}
```

Load it through the service:

```java
ConfigService configService = services.getOrCreate(ConfigService.class);
SettingsConfig config = configService.getConfig(SettingsConfig.class);
```

The mapper supports primitives, strings, booleans, enums, lists, maps, and nested section objects. Enums are resolved from their string names, so `"active"` becomes `ACTIVE` automatically.
