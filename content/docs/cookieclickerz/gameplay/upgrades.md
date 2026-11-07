---
title: Upgrades
description: Buy upgrades to bake more cookies, and create your own in upgrades.yml
icon: ArrowBigUpDash
---

Upgrades are what make your cookie count grow. Each upgrade level permanently adds cookies per click (CPC) and offline cookies. There's no maximum level, but every level costs more than the last.

## Buying upgrades

Open the upgrade shop from the main menu or with `/cc open upgrades`. Each item shows the price of the next level, what it gives and how many levels you own.

| Click       | Buys                             |
| ----------- | -------------------------------- |
| Left-click  | 1 level                          |
| Right-click | 10 levels                        |
| Shift-click | As many levels as you can afford |

The shop needs the `cookieclickerz.upgrades` permission, which everyone has by default.

### How prices work

The price of an upgrade grows with each level you own:

```plaintext
price = baseprice × priceMultiplier ^ level
```

For example, the **Wooden Pickaxe** has a base price of `50` and a multiplier of `1.1`. The first level costs 50 cookies, the second 55, the third 61 (prices are rounded), and so on. When you buy several levels at once, you pay the sum of each level's price.

:::warning
[Prestiging](/cookieclickerz/gameplay/prestige) resets all of your upgrades back to level 0.
:::

## Default upgrades

CookieClickerZ ships with 18 upgrades, from a **Wooden Pickaxe** (50 cookies, +1 CPC) all the way to a **God Apple** (5T cookies, +131,072 CPC). Each upgrade doubles the CPC of the one before it. You can change or remove any of them.

## Creating your own upgrades

All upgrades are defined in `plugins/CookieClickerZ/upgrades.yml`. You can add as many as you want. The key at the top (here `golden_cookie`) is the upgrade's ID. It's used in commands and permissions, so it should only contain letters, numbers and underscores.

```yaml
golden_cookie:
  name: "&6Golden Cookie"
  baseprice: "1M"
  priceMultiplier: 1.5
  item: "GOLD_INGOT"
  cpc: "500"
  offlineCookies: "250"
  customModelId: 400
  requirePermission: false
```

| Option              | Description                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `name`              | The display name in the shop. Supports color codes and MiniMessage.                                                                       |
| `baseprice`         | The price of the first level. Supports [number suffixes](/cookieclickerz/gameplay/clicking#big-numbers) like `1M`.                        |
| `priceMultiplier`   | How much the price grows per level. `1.0` keeps the price the same, `2.0` doubles it every level.                                         |
| `item`              | The [material](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Material.html) shown in the shop.                                      |
| `cpc`               | Cookies per click added per level.                                                                                                        |
| `offlineCookies`    | [Offline cookies](/cookieclickerz/gameplay/clicking#offline-cookies) per minute added per level.                                          |
| `customModelId`     | A custom model data ID, so a resource pack can give the item its own texture. Optional.                                                   |
| `requirePermission` | If `true`, players need the `cookieclickerz.buyupgrade.<id>` permission to buy it, for example `cookieclickerz.buyupgrade.golden_cookie`. |

:::tip[Rank-only upgrades]
Combine `requirePermission: true` with a permission plugin like LuckPerms to make upgrades exclusive to a rank. Operators have every `cookieclickerz.buyupgrade.*` permission by default.
:::

## Giving upgrades

Admins can give upgrade levels to players for free with [`/cc giveupgrade`](/cookieclickerz/commands/cookieclicker#cc-giveupgrade), for example as a vote reward:

```plaintext
/cc giveupgrade Steve golden_cookie 5
```
