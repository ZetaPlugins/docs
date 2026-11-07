---
title: Timber Enchantment
description: How players get the Timber enchantment
icon: Sparkles
---

TimberZ adds a real **Timber** enchantment to the game. With `requireCustomEnchant: true`, which is the default, only axes with this enchantment can fell trees.

| Property   | Value            |
| ---------- | ---------------- |
| ID         | `timberz:timber` |
| Max level  | I                |
| Applies to | All axes         |
| Rarity     | Rare (weight 2)  |
| Anvil cost | High             |

## Getting the enchantment

Players get Timber the same way as vanilla enchantments:

- **Enchanting table**: it can show up when enchanting an axe.
- **Villagers**: librarians can sell Timber enchanted books.
- **Anvil**: combine an axe with a Timber book.

## Giving it directly

Operators can give a Timber axe or book with vanilla commands:

```plaintext
/give @s diamond_axe[enchantments={"timberz:timber":1}]
/enchant @s timberz:timber
/give @s enchanted_book[stored_enchantments={"timberz:timber":1}]
```

These also work in other plugins that run commands, like shops, crates or quest plugins.

:::note
The enchantment is registered while the server starts. If you install or update TimberZ, a full server restart is needed.
:::

## Not using the enchantment

If you don't want an enchantment, set `requireCustomEnchant: false` in the [`config.yml`](/timberz/config#timber-settings). The enchantment still exists in the game, but is no longer needed. See [Who Can Use Timber](/timberz/guide/access) for other setups.
