---
title: Prestige
description: Trade your progress for a permanent cookie multiplier
icon: Crown
---

Once a player has baked enough cookies, they can **prestige**. This resets their progress, but gives them a permanent multiplier on every click, so they get back to where they were much faster.

## How prestige works

Open the prestige menu from the main menu or with `/cc open prestige`. Each level shows its price and multiplier. Players have to unlock the levels in order, so from Prestige II you can only buy Prestige III.

When a player prestiges:

- their **cookies** are set to `0`
- their **cookies per click** are set back to `1`
- their **offline cookies** are set to `0`
- all of their **upgrades** go back to level 0

What they keep is their prestige level, achievements, total clicks and the new multiplier. The multiplier applies to cookies from clicks. It doesn't replace the previous level's multiplier, it's simply the multiplier of the current level.

## Default levels

| Level        | Cost | Multiplier |
| ------------ | ---- | ---------- |
| Prestige I   | 1M   | 2×         |
| Prestige II  | 10M  | 3×         |
| Prestige III | 100M | 4×         |
| Prestige IV  | 1B   | 5×         |
| Prestige V   | 10B  | 6×         |
| …            | …    | …          |
| Prestige XX  | 10SS | 21×        |

Each level costs 10 times more than the one before and adds 1× to the multiplier.

## Configuring prestige

Prestige levels are defined in `plugins/CookieClickerZ/prestige.yml`. You can change the existing levels, add new ones or remove them.

```yaml
# Set to false to disable prestige completely
enabled: true

levels:
  1:
    name: "&8&l> <!b><#69e372>Prestige I"
    lore:
      - "Unlocks the VIP area!"
    hideOriginalLore: false
    cost: "1M"
    multiplier: 2
    commands:
      - "say %player% has just prestiged to Prestige I!"
      - "lp user %player% parent add vip"
```

| Option             | Description                                                                                                          |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `name`             | The name shown in the prestige menu.                                                                                 |
| `lore`             | Extra lines shown under the item. You can use `%price%` and `%multiplier%`. Optional.                                |
| `hideOriginalLore` | If `true`, only your own `lore` is shown instead of the default description.                                         |
| `cost`             | How many cookies this level costs. Supports [number suffixes](/cookieclickerz/gameplay/clicking#big-numbers).        |
| `multiplier`       | The cookie multiplier players get at this level. Must be a whole number.                                             |
| `commands`         | Console commands that run when a player reaches this level. `%player%` is replaced with the player's name. Optional. |

The level numbers must be whole numbers starting at `1` and should go up without gaps.

:::tip[Rewards]
Use `commands` to give out rewards that last beyond CookieClickerZ, like a rank, a crate key or a broadcast.
:::

## Managing prestige

Admins can view or change a player's prestige level with [`/cc prestige`](/cookieclickerz/commands/cookieclicker#cc-prestige). Setting a prestige level this way doesn't reset the player's progress or run the level's commands.
