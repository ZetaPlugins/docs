---
title: PlaceholderAPI
description: Add PlaceholderAPI placeholders by annotating methods.
icon: Percent
---

Annotate a method with `@Papi` to expose it as a placeholder. ZetaCore discovers these methods, builds an expansion and registers it with PlaceholderAPI when it is installed. If PlaceholderAPI is not installed, this step is skipped.

## Setup

PlaceholderAPI is not required as a compile dependency, because `@Papi` is part of ZetaCore. Add it to `softdepend` in your `plugin.yml` so it loads before your plugin:

```yaml
softdepend: [PlaceholderAPI]
```

## Defining placeholders

```java
@Service
public class Placeholders {
    private final HomeService homes;

    public Placeholders(HomeService homes) {
        this.homes = homes;
    }

    @Papi(identifier = "homes")
    public String homeCount(OfflinePlayer player) {
        return String.valueOf(homes.count(player.getUniqueId()));
    }

    @Papi(identifier = "max_homes")
    public String maxHomes() {
        return "5";
    }
}
```

This registers `%myplugin_homes%` and `%myplugin_max_homes%`. The prefix is your plugin name in lowercase.

Any class in your plugin's package with `@Papi` methods is discovered. If the class is a `@Service`, the existing service instance is used.

### Method signatures

| Parameter       | Behavior                                                             |
| --------------- | -------------------------------------------------------------------- |
| none            | a global placeholder, independent of the player                      |
| `OfflinePlayer` | the player the placeholder is parsed for                             |
| `Player`        | the same, but only when online (otherwise returns `PlayerNotOnline`) |
| `String`        | the player's name                                                    |

Methods must return a `String`. Returning `null` marks the placeholder as unknown.

If a placeholder is parsed without a player, `PlayerNotFound` is returned, including for global placeholders.

## Placeholders with arguments

Add `{name}` segments to the identifier and bind them to parameters with `@PapiParam`:

```java
@Papi(identifier = "home_{name}_world")
public String homeWorld(OfflinePlayer player, @PapiParam("name") String homeName) {
    return homes.get(player.getUniqueId(), homeName)
            .map(loc -> loc.getWorld().getName())
            .orElse("none");
}
```

`%myplugin_home_base_world%` → calls `homeWorld(player, "base")`.

`@PapiParam` values are converted to `String`, `int`, `long`, `double`, `float` or `boolean` (including wrapper types):

```java
@Papi(identifier = "top_{rank}")
public String top(@PapiParam("rank") int rank) {
    return leaderboard.nameAt(rank);
}
```

`%myplugin_top_1%`, `%myplugin_top_2%`...

:::warning[No underscores in arguments]
A `{param}` segment matches up to the next `_`, so `%myplugin_home_my_base_world%` does **not** match `home_{name}_world`. This applies to every argument, including the last one. Use values without underscores, for example by separating words with `-`.
:::

## Customizing the expansion

Implement `PlaceholderExpansionCustomizer` as a service. It is applied before the expansion is registered:

```java
@Service
public class PapiSettings implements PlaceholderExpansionCustomizer {
    @Override
    public void customize(PapiExpansionService expansion) {
        expansion
            .setIdentifier("mp")                     // %mp_homes% instead of %myplugin_homes%
            .setPlayerNotOnlineMessage("offline")    // default: PlayerNotOnline
            .setPlayerNotFoundMessage("-");          // default: PlayerNotFound
    }
}
```

Placeholders can also be added programmatically in a customizer. Customizers only run if your plugin defines at least one `@Papi` method.

```java
expansion.addPlaceholder("server_tps", (player, id) -> String.format("%.1f", Bukkit.getTPS()[0]));
```
