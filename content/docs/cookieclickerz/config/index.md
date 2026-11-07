---
title: Configuration
description: All options in the CookieClickerZ config.yml
icon: Wrench
---

CookieClickerZ creates its config files in `plugins/CookieClickerZ` the first time the server starts with the plugin installed.

:::files

- plugins/
    - CookieClickerZ/
        - lang/
            - en-US.yml
            - de-DE.yml
            - …
        - config.yml
        - upgrades.yml
        - prestige.yml
        - achievements.yml
        - achievementCategories.yml
        - clicker.yml
    - …

:::

| File                        | What it's for                                                                                                                       |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `config.yml`                | General settings, explained on this page                                                                                            |
| `upgrades.yml`              | All upgrades. See [Upgrades](/cookieclickerz/gameplay/upgrades#creating-your-own-upgrades)                                          |
| `prestige.yml`              | Prestige levels. See [Prestige](/cookieclickerz/gameplay/prestige#configuring-prestige)                                             |
| `achievements.yml`          | Commands that run when an achievement is unlocked. See [Achievements](/cookieclickerz/gameplay/achievements#rewarding-achievements) |
| `achievementCategories.yml` | Head textures of the achievement categories                                                                                         |
| `clicker.yml`               | The saved clicker blocks. Use [`/cc clicker`](/cookieclickerz/commands/cookieclicker#cc-clicker) instead of editing it by hand      |
| `lang/*.yml`                | All messages and menu texts. See [Messages](/cookieclickerz/config/messages)                                                        |

After changing the `config.yml` or a language file, run [`/cc reload`](/cookieclickerz/commands/cookieclicker#cc-reload). Changes to `upgrades.yml`, `prestige.yml` and `achievements.yml` are used right away.

:::tip[Colors]
Everywhere text is shown, you can use legacy color codes like `&c` and `&l`, as well as [MiniMessage](https://docs.advntr.dev/minimessage/format.html) for HEX colors, gradients, and hover and click events.
:::

## General

```yaml
checkForUpdates: true
lang: "en-US"
cookieName: "Cookies"
mainItem: "COOKIE"
hologram: true
```

| Option            | Description                                                                                                                                                           | Default   |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `checkForUpdates` | Tells operators on join when a new version is available.                                                                                                              | `true`    |
| `lang`            | The language file to use from the `lang` folder, without `.yml`. Included are `en-US`, `de-DE`, `ru-RU` and `cs-CZ`. See [Messages](/cookieclickerz/config/messages). | `en-US`   |
| `cookieName`      | What cookies are called in messages. Change this if you want to bake something else, like "Coins".                                                                    | `Cookies` |
| `mainItem`        | The [material](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Material.html) shown in the middle of the main menu.                                               | `COOKIE`  |
| `hologram`        | Shows a hologram above every clicker. Needs DecentHolograms or FancyHolograms. See [Holograms](/cookieclickerz/integrations/holograms).                               | `true`    |

## Offline cookies

```yaml
offlineCookies:
  enabled: true
  joinMessage: true
```

| Option        | Description                                                                                                | Default |
| ------------- | ---------------------------------------------------------------------------------------------------------- | ------- |
| `enabled`     | Lets players earn [offline cookies](/cookieclickerz/gameplay/clicking#offline-cookies) while they're away. | `true`  |
| `joinMessage` | Tells players how many cookies they earned when they join.                                                 | `true`  |

## Leaderboard

```yaml
leaderboard:
  enabled: true
  size: 10
  updateInterval: 60
```

| Option           | Description                                                                                         | Default |
| ---------------- | --------------------------------------------------------------------------------------------------- | ------- |
| `enabled`        | Turns the leaderboard on. Calculating it takes some performance, so disable it if you don't use it. | `true`  |
| `size`           | How many players are shown.                                                                         | `10`    |
| `updateInterval` | How often the leaderboard is recalculated, in seconds.                                              | `60`    |

:::warning
Changes to the leaderboard settings need a server restart.
:::

## Events

```yaml
events:
  enabled: true
  rates:
    COOKIE_FRENZY: 0.005
    LUCKY: 0.007
    CLICK_FRENZY: 0.002
    RUIN: 0.002
    CURSED_FINGER: 0.002
```

| Option    | Description                                                                                               | Default |
| --------- | --------------------------------------------------------------------------------------------------------- | ------- |
| `enabled` | Turns random [events](/cookieclickerz/gameplay/events) on.                                                | `true`  |
| `rates`   | The chance per click for each event, where `1.0` is 100%. All rates together must not be more than `1.0`. |         |

## Sounds

```yaml
clickSound: "BLOCK_WOODEN_BUTTON_CLICK_ON"
upgradeSound: "ENTITY_PLAYER_LEVELUP"
prestigeSound: "ENTITY_PLAYER_LEVELUP"
errorSound: "ENTITY_VILLAGER_NO"
```

| Option          | Plays when…                                          |
| --------------- | ---------------------------------------------------- |
| `clickSound`    | a player clicks a clicker block                      |
| `upgradeSound`  | a player buys an upgrade                             |
| `prestigeSound` | a player prestiges                                   |
| `errorSound`    | something goes wrong, like not having enough cookies |

You can find all sound names in the [Spigot docs](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Sound.html).

## Anti-cheat

```yaml
anticheat:
  cps:
    enabled: true
    max: 15
    message: "&cYou are clicking too fast!"
    commands:
    # - "kick %player% &cYou are clicking too fast!"

  nomovement:
    enabled: true
    max: 15
    message: "&cYou are not moving!"
    commands:
    # - "kick %player% &cYou are not moving!"
```

| Option               | Description                                                                                      | Default |
| -------------------- | ------------------------------------------------------------------------------------------------ | ------- |
| `cps.enabled`        | Ignores clicks from players who click too fast.                                                  | `true`  |
| `cps.max`            | The maximum clicks per second.                                                                   | `15`    |
| `nomovement.enabled` | Ignores clicks from players who haven't moved for a while. Catches most auto-clickers.           | `true`  |
| `nomovement.max`     | How long a player can stand still before their clicks are ignored, in seconds.                   | `15`    |
| `message`            | The message the player gets instead of cookies.                                                  |         |
| `commands`           | Console commands that run on every blocked click. `%player%` is replaced with the player's name. | none    |

:::warning
`commands` run on **every** blocked click, not only once. A kick works well, but avoid commands like broadcasts that would spam the chat.
:::

## Storage

```yaml
storage:
  type: "SQLite"
  host: "localhost"
  port: 3306
  database: "cookieclicker"
  username: "root"
  password: "password"
```

| Option     | Description                                                                                                      | Default         |
| ---------- | ---------------------------------------------------------------------------------------------------------------- | --------------- |
| `type`     | `SQLite` stores data in a local file. `MySQL` uses a database server, for example to share data between servers. | `SQLite`        |
| `host`     | The address of your MySQL server.                                                                                | `localhost`     |
| `port`     | The port of your MySQL server.                                                                                   | `3306`          |
| `database` | The name of the database. It must already exist.                                                                 | `cookieclicker` |
| `username` | The database user.                                                                                               | `root`          |
| `password` | The database password.                                                                                           | `password`      |

`host` to `password` are only used with `MySQL`. Changing the storage needs a server restart, and existing data isn't moved over automatically.

## Player cache

```yaml
playerCache:
  enabled: true
  saveInterval: 60
  maxSize: 1000
```

:::warning[Expert settings]
You usually don't need to change these.
:::

| Option         | Description                                                                     | Default |
| -------------- | ------------------------------------------------------------------------------- | ------- |
| `enabled`      | Keeps player data in memory and saves it in batches, instead of on every click. | `true`  |
| `saveInterval` | How often cached data is saved to the database, in seconds.                     | `60`    |
| `maxSize`      | The maximum number of players kept in the cache.                                | `1000`  |
