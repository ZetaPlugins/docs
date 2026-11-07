---
title: /cookieclicker
description: The main CookieClickerZ command with all of its subcommands
icon: Terminal
---

`/cookieclicker` (aliases `/cc` and `/cookieclickerz`) bundles all CookieClickerZ features into subcommands. Running it without a subcommand shows the installed version.

| Subcommand                         | Description                          | Permission                                | Default |
| ---------------------------------- | ------------------------------------ | ----------------------------------------- | ------- |
| [`help`](#cc-help)                 | Show the in-game help                | none                                      | true    |
| [`open`](#cc-open)                 | Open a menu                          | `cookieclickerz.openmenu`                 | true    |
| [`numbers`](#cc-numbers)           | Show the number shorthand cheatsheet | `cookieclickerz.numcheatsheet`            | true    |
| [`clicker`](#cc-clicker)           | Manage clicker blocks                | `cookieclickerz.admin.manageclickers`     | op      |
| [`cookies`](#cc-cookies)           | Manage a player's cookies            | `cookieclickerz.admin.managecookies`      | op      |
| [`giveupgrade`](#cc-giveupgrade)   | Give upgrade levels                  | `cookieclickerz.admin.giveupgrade`        | op      |
| [`prestige`](#cc-prestige)         | Manage a player's prestige           | `cookieclickerz.admin.manageprestige`     | op      |
| [`events`](#cc-events)             | Manage a player's events             | `cookieclickerz.admin.manageevents`       | op      |
| [`achievements`](#cc-achievements) | Manage a player's achievements       | `cookieclickerz.admin.manageachievements` | op      |
| [`reload`](#cc-reload)             | Reload the config                    | `cookieclickerz.admin.reload`             | op      |

:::note[Online players only]
All commands that take a `<player>` only work for players who are currently online.
:::

---

## /cc help

```plaintext
/cc help
```

Shows a short explanation of how to create a clicker, with links to these docs and the support Discord.

**Permission:** none

---

## /cc open

```plaintext
/cc open <main | upgrades | achievements | prestige | top>
```

Opens a menu directly, without having to right-click a clicker block. This is handy for NPCs, menu plugins or custom items that run a command.

| Argument | Description                                                                              |
| -------- | ---------------------------------------------------------------------------------------- |
| `<menu>` | The menu to open: `main`, `upgrades`, `achievements`, `prestige` or `top` (leaderboard). |

Can only be run by a player.

**Permission:** `cookieclickerz.openmenu` (default: true)

---

## /cc numbers

```plaintext
/cc numbers
```

Shows a list of all [number suffixes](/cookieclickerz/gameplay/clicking#big-numbers) like `K`, `M` and `B` and what they stand for.

**Permission:** `cookieclickerz.numcheatsheet` (default: true)

---

## /cc clicker

```plaintext
/cc clicker add <name>
/cc clicker remove <name>
/cc clicker list
```

Creates and removes clicker blocks.

| Subcommand | Description                                                                                                                   |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `add`      | Turns the block you're looking at (up to 5 blocks away) into a clicker. The name must be unique. Can only be run by a player. |
| `remove`   | Removes the clicker with the given name. The block stays where it is.                                                         |
| `list`     | Lists all clickers. Click a name to teleport to it.                                                                           |

**Permission:** `cookieclickerz.admin.manageclickers` (default: op)

---

## /cc cookies

```plaintext
/cc cookies <player> <add | remove | set> <amount>
```

Changes how many cookies a player has.

| Argument   | Description                                                                                                           |
| ---------- | --------------------------------------------------------------------------------------------------------------------- |
| `<player>` | The player to change.                                                                                                 |
| `<action>` | `add` or `remove` cookies, or `set` them to an exact amount.                                                          |
| `<amount>` | The amount. Supports [number suffixes](/cookieclickerz/gameplay/clicking#big-numbers) like `2.5M`. Can't be negative. |

### Examples

```plaintext
/cc cookies Steve add 1000
/cc cookies Steve remove 2.5M
/cc cookies Steve set 0
```

**Permission:** `cookieclickerz.admin.managecookies` (default: op)

---

## /cc giveupgrade

```plaintext
/cc giveupgrade <player> <upgrade> <amount>
```

Gives a player upgrade levels for free. Their cookies per click and offline cookies go up as if they had bought the levels. The player gets a message about it.

| Argument    | Description                                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `<player>`  | The player who gets the upgrade.                                                                                                |
| `<upgrade>` | The upgrade ID from [`upgrades.yml`](/cookieclickerz/gameplay/upgrades#creating-your-own-upgrades), for example `iron_pickaxe`. |
| `<amount>`  | How many levels to give. Must be a positive whole number.                                                                       |

### Examples

```plaintext
/cc giveupgrade Steve wooden_pickaxe 10
```

**Permission:** `cookieclickerz.admin.giveupgrade` (default: op)

---

## /cc prestige

```plaintext
/cc prestige <player> [get]
/cc prestige <player> set <level>
```

Shows or changes a player's [prestige level](/cookieclickerz/gameplay/prestige).

| Subcommand | Description                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------- |
| `get`      | Shows the player's prestige level. This is also what happens if you leave out the subcommand. |
| `set`      | Sets the prestige level. `0` removes the prestige. Also updates the prestige achievements.    |

Unlike prestiging through the menu, `set` doesn't reset the player's cookies or upgrades and doesn't run the level's commands.

**Permission:** `cookieclickerz.admin.manageprestige` (default: op)

---

## /cc events

```plaintext
/cc events <player> start <event | random>
/cc events <player> get
```

Starts an [event](/cookieclickerz/gameplay/events) for a player, or shows which events are currently active.

| Argument  | Description                                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------------------ |
| `<event>` | One of `COOKIE_FRENZY`, `LUCKY`, `CLICK_FRENZY`, `RUIN` or `CURSED_FINGER`. Must be in upper case.                       |
| `random`  | Picks an event based on the configured rates. Because the rates include the chance of no event, this often does nothing. |

### Examples

```plaintext
/cc events Steve start COOKIE_FRENZY
/cc events Steve get
```

**Permission:** `cookieclickerz.admin.manageevents` (default: op)

---

## /cc achievements

```plaintext
/cc achievements <player> get <achievement>
/cc achievements <player> set <achievement> <progress>
```

Shows or changes a player's progress on an [achievement](/cookieclickerz/gameplay/achievements).

| Argument        | Description                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `<achievement>` | The achievement ID, for example `clicks_finger_workout`. See [all achievements](/cookieclickerz/gameplay/achievements#all-achievements). |
| `<progress>`    | The new progress as a whole number.                                                                                                      |

### Examples

```plaintext
/cc achievements Steve get clicks_finger_workout
/cc achievements Steve set event_sugar_rush 25
```

**Permission:** `cookieclickerz.admin.manageachievements` (default: op)

---

## /cc reload

```plaintext
/cc reload
```

Reloads the `config.yml` and the language files. Changes to `upgrades.yml`, `prestige.yml` and `achievements.yml` are picked up automatically. Leaderboard and storage settings need a full server restart.

**Permission:** `cookieclickerz.admin.reload` (default: op)

---

## /ccdebug

```plaintext
/ccdebug generate
/ccdebug upload [confirm]
```

Creates a debug report with information about your server, the plugin and its config files. Share it when asking for help in the [support Discord](https://strassburger.org/discord).

| Argument   | Description                                                                          |
| ---------- | ------------------------------------------------------------------------------------ |
| `generate` | Saves the report as `debug-report.json` and `debug-report.txt` in your server folder |
| `upload`   | Uploads the report and gives you a link to share. Asks for confirmation first.       |

**Permission:** `cookieclickerz.admin.debug` (default: op)
