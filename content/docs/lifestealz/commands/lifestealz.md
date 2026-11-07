---
title: /lifestealz
description: The main LifeStealZ command with all admin subcommands
icon: Compass
---

`/lifestealz` (alias `/lsz`) bundles the plugin's management features into subcommands. Running it without a subcommand shows the installed version and links to the docs and support.

| Subcommand                               | Description                      | Permission                     | Default |
| ---------------------------------------- | -------------------------------- | ------------------------------ | ------- |
| [`help`](#lifestealz-help)               | Show the in-game help            | `lifestealz.help`              | true    |
| [`recipe`](#lifestealz-recipe)           | View the recipe of a custom item | `lifestealz.viewrecipes`       | true    |
| [`reload`](#lifestealz-reload)           | Reload the config files          | `lifestealz.admin.reload`      | op      |
| [`hearts`](#lifestealz-hearts)           | Change or view a player's hearts | `lifestealz.admin.setlife`     | op      |
| [`giveItem`](#lifestealz-giveitem)       | Give a custom item to a player   | `lifestealz.admin.giveitem`    | op      |
| [`graceperiod`](#lifestealz-graceperiod) | Skip or restart a grace period   | `lifestealz.admin.graceperiod` | op      |
| [`checkbypass`](#lifestealz-checkbypass) | Check a player's bypass status   | `lifestealz.admin.bypasscheck` | op      |
| [`data`](#lifestealz-data)               | Import or export player data     | `lifestealz.managedata`        | op      |
| [`debug`](#lifestealz-debug)             | Create a debug report            | `lifestealz.admin.debug`       | op      |

:::tip[Targeting multiple players]
Where noted, the `<player>` argument also accepts `+` for all **online** players and `*` for all online **and offline** players.
:::

---

## /lifestealz help

```plaintext
/lifestealz help
```

Shows a list of the subcommands you have permission to use.

**Permission:** `lifestealz.help` (default: true)

---

## /lifestealz recipe

```plaintext
/lifestealz recipe <item> [recipeId]
```

Opens a GUI that shows the crafting recipe of a custom item.

| Argument     | Description                                                                                               |
| ------------ | --------------------------------------------------------------------------------------------------------- |
| `<item>`     | ID of a custom item that has a recipe, as defined in [`items.yml`](../config/customitems). Tab-completes. |
| `[recipeId]` | Which recipe to show if the item has more than one. Defaults to the first recipe.                         |

```plaintext title="Examples"
/lsz recipe defaultheart
/lsz recipe revive 2
```

**Permission:** `lifestealz.viewrecipes` (default: true)

---

## /lifestealz reload

```plaintext
/lifestealz reload
```

Reloads all config files, so changes take effect without restarting the server.

**Permission:** `lifestealz.admin.reload` (default: op)

---

## /lifestealz hearts

```plaintext
/lifestealz hearts <add | set | remove> <player> <amount>
/lifestealz hearts get <player>
```

Changes or shows the **max hearts** of a player.

| Argument   | Description                                                                     |
| ---------- | ------------------------------------------------------------------------------- |
| `add`      | Adds `<amount>` hearts                                                          |
| `set`      | Sets the hearts to exactly `<amount>`                                           |
| `remove`   | Removes `<amount>` hearts                                                       |
| `get`      | Shows how many hearts the player has. Takes no amount.                          |
| `<player>` | An online or offline player. `add`, `set` and `remove` also accept `+` and `*`. |
| `<amount>` | Number of hearts                                                                |

```plaintext title="Examples"
/lsz hearts add Steve 2
/lsz hearts set + 10
/lsz hearts remove * 1
/lsz hearts get Alex
```

**Permission:** `lifestealz.admin.setlife` (default: op)

---

## /lifestealz giveItem

```plaintext
/lifestealz giveItem <player> <item> [amount] [silent]
```

Gives a custom item, such as a heart or a revive crystal, to a player.

| Argument   | Description                                                                     |
| ---------- | ------------------------------------------------------------------------------- |
| `<player>` | An online player, or `+` for all online players                                 |
| `<item>`   | ID of any custom item from [`items.yml`](../config/customitems). Tab-completes. |
| `[amount]` | How many items to give. Defaults to `1`.                                        |
| `[silent]` | Add `silent` to give the item without notifying the receiving player            |

```plaintext title="Examples"
/lsz giveItem Steve defaultheart
/lsz giveItem Steve revive 3
/lsz giveItem + defaultheart 1 silent
```

**Permission:** `lifestealz.admin.giveitem` (default: op)

---

## /lifestealz graceperiod

```plaintext
/lifestealz graceperiod <player> <skip | reset>
```

Manages the grace period of a player.

| Argument   | Description                                       |
| ---------- | ------------------------------------------------- |
| `<player>` | An online or offline player, `+` or `*`           |
| `skip`     | Ends the player's grace period immediately        |
| `reset`    | Restarts the player's grace period from the start |

```plaintext title="Examples"
/lsz graceperiod Steve skip
/lsz graceperiod * reset
```

**Permission:** `lifestealz.admin.graceperiod` (default: op)

---

## /lifestealz checkbypass

```plaintext
/lifestealz checkbypass <player>
```

Shows whether a player has the `lifestealz.bypass` permission, which prevents heart loss, heart drops and killer rewards on death.

| Argument   | Description                             |
| ---------- | --------------------------------------- |
| `<player>` | An online or offline player, `+` or `*` |

**Permission:** `lifestealz.admin.bypasscheck` (default: op)

---

## /lifestealz data

```plaintext
/lifestealz data <import | export> <file>
```

Exports all player data to a CSV file, or imports it from one. This is mainly used to [switch storage methods](../config/datamigration).

| Argument | Description                           |
| -------- | ------------------------------------- |
| `export` | Writes all player data to `<file>`    |
| `import` | Loads player data from `<file>`       |
| `<file>` | Name of the CSV file, e.g. `data.csv` |

```plaintext title="Examples"
/lsz data export backup.csv
/lsz data import backup.csv
```

:::warning
Restart the server after importing data to make sure everything is loaded correctly.
:::

**Permission:** `lifestealz.managedata` (default: op)

---

## /lifestealz debug

```plaintext
/lifestealz debug generate
/lifestealz debug upload [confirm]
```

Creates a debug report with information about your server, the plugin and its config. Share it when asking for [support](https://strassburger.org/discord).

| Argument   | Description                                                                          |
| ---------- | ------------------------------------------------------------------------------------ |
| `generate` | Saves the report as `debug-report.json` and `debug-report.txt` in your server folder |
| `upload`   | Uploads the report and gives you a link to share. Asks for confirmation first.       |
| `confirm`  | Confirms the upload and accepts the privacy policy                                   |

**Permission:** `lifestealz.admin.debug` (default: op)
