---
title: Config files
description: Turn YAML files into plain Java objects, with defaults, nesting, lists, maps and reloading.
icon: FileCog
---

Instead of reading values with `getConfig().getString("path", "default")` throughout your code, define each config file once as a Java class and use it as a regular object.

## The basics

Put the default file in `src/main/resources`:

```yaml title="config.yml"
lang: en-US
max-homes: 3
spawn-protection: true
disabled-worlds:
  - world_nether
```

Define a matching class:

```java title="MainConfig.java"
@ConfigFile("config.yml")
public class MainConfig {
    public String lang = "en-US";

    @ConfigKey(name = "max-homes")
    public int maxHomes = 3;

    @ConfigKey(name = "spawn-protection")
    public boolean spawnProtection = true;

    @ConfigKey(name = "disabled-worlds")
    public List<String> disabledWorlds = new ArrayList<>();
}
```

Then inject it where needed:

```java
@Service
public class HomeService {
    private final MainConfig config;

    public HomeService(MainConfig config) {
        this.config = config;
    }

    public boolean canSetMore(int current) {
        return current < config.maxHomes;
    }
}
```

The file is loaded and mapped automatically.

### How fields map to keys

- By default, the YAML key is the **exact field name**: `maxHomes` reads `maxHomes:`.
- Use `@ConfigKey(name = "max-homes")` when the YAML key differs, for example in kebab-case.
- Field initializers are the **defaults**. If a key is missing, the field keeps its default, so existing config files remain valid when new options are added.

### Rules

- The class (and any nested section class) must be `public` and have a `public` no-arg constructor. The implicit one is fine.
- The file must exist in your jar's resources. On first start, it is copied to the plugin folder.
- Prefer primitives (`int`, `double`, `boolean`) over wrappers (`Integer`, `Double`), and `double` over `float`. With a `Double` field, a value written as `5` in YAML is read as an integer, and mapping fails. A `double` field is fine with that.

## Supported types

| Java type                                       | YAML                              |
| ----------------------------------------------- | --------------------------------- |
| `String`, `int`, `long`, `double`, `boolean`…   | `key: value`                      |
| enums                                           | `mode: survival` (any case works) |
| `List<String>`, `List<Integer>`…                | a YAML list                       |
| `List<SomeEnum>`                                | a list of enum names              |
| `Map<String, Integer>` etc.                     | a section with key/value pairs    |
| `@ConfigSection` classes                        | a nested section                  |
| `List<YourSection>`, `Map<String, YourSection>` | lists/maps of nested sections     |

Other types, such as `Location`, `ItemStack` or `UUID`, are not supported directly. Store them as a `String` or a section and convert them in your code.

## Nested sections

```yaml title="config.yml"
economy:
  enabled: true
  start-balance: 100.0
  currency-symbol: "$"
```

```java
@ConfigFile("config.yml")
public class MainConfig {
    public Economy economy = new Economy();

    @ConfigSection
    public static class Economy {
        public boolean enabled = false;

        @ConfigKey(name = "start-balance")
        public double startBalance = 0.0;

        @ConfigKey(name = "currency-symbol")
        public String currencySymbol = "$";
    }
}
```

```java
if (config.economy.enabled) { ... }
```

Initialize section fields (`= new Economy()`) so they are not `null` when the section is missing from the file.

## Lists and maps of sections

Maps and lists can contain sections. For example, a set of kits:

```yaml title="kits.yml"
kits:
  starter:
    cooldown: 3600
    items:
      - STONE_SWORD
      - BREAD
  vip:
    cooldown: 86400
    permission: myplugin.kit.vip
    items:
      - DIAMOND_SWORD
      - GOLDEN_APPLE
```

```java title="KitsConfig.java"
@ConfigFile("kits.yml")
public class KitsConfig {
    public Map<String, Kit> kits = new LinkedHashMap<>();

    @ConfigSection
    public static class Kit {
        public int cooldown = 0;
        public String permission = null;
        public List<Material> items = new ArrayList<>();
    }
}
```

```java
KitsConfig.Kit kit = kitsConfig.kits.get("vip");
kit.items.forEach(material -> player.getInventory().addItem(new ItemStack(material)));
```

`List<Material>` works because `Material` is an enum. `List<Kit>` works too, for a YAML list of sections. Note that in 3.0.0, enum fields (such as `public GameMode mode`) are not supported inside **list** items. Use a `String` and convert it yourself. Map values and regular sections are not affected.

## More than one file

Create one class per file, each with its own `@ConfigFile`:

```java
@ConfigFile("config.yml") public class MainConfig { ... }
@ConfigFile("kits.yml")   public class KitsConfig { ... }
@ConfigFile("storage.yml") public class StorageConfig { ... }
```

Subfolders are supported: `@ConfigFile("modules/chat.yml")`.

## Reloading

Inject `ConfigService` and call `reload()`:

```java
configService.reload();
```

This re-reads every file and **updates the existing config objects in place**, so all classes holding an injected config see the new values. If any file fails to map, no config object is changed.

:::tip
Because objects are updated in place, **do not copy config values into your own fields** (`this.maxHomes = config.maxHomes`). Read `config.maxHomes` when needed so reloads take effect.
:::

[Translations](messages) are not config classes and must be reloaded separately with `lang.reload()`.

## Raw access

For cases the mapper does not cover, `ConfigService` provides a standard Bukkit `FileConfiguration`:

```java
FileConfiguration data = configService.getConfig("data.yml");
data.set("players." + uuid, 5);
configService.saveConfig("data.yml", data);
```

As with config classes, the file must exist in your jar's resources (an empty `data.yml` is sufficient); otherwise the first load throws an exception.

`getConfig(MainConfig.class)` returns a mapped config where injection is not available.

## Mapping errors

If a value has the wrong type (`max-homes: lots`) or an enum constant does not exist (`mode: flying`), a `ConfigMappingException` naming the field is thrown when the config is first loaded. Look for `Failed to map configuration to class ...` in the console and check the "Caused by" line.
