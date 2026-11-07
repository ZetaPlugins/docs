---
title: Who Can Use Timber
description: Toggle mode, the Timber enchantment, custom axes and always-on setups
icon: KeyRound
---

TimberZ has several options that decide when a player can fell trees. They are combined, so a player has to meet **all** enabled requirements.

| Requirement                                       | Option                 | Default |
| ------------------------------------------------- | ---------------------- | ------- |
| The player has the `timberz.usetimber` permission | none                   | always  |
| Timber mode is turned on                          | `toggleTimber`         | `true`  |
| The item is an axe from the `blocks.yml`          | `requireAxeMaterial`   | `true`  |
| The axe has the Timber enchantment                | `requireCustomEnchant` | `true`  |
| The axe has a specific custom model data          | `restrictAxeModelData` | `false` |
| The WorldGuard region allows it                   | `timber` flag          | allowed |

Players can always break a single log by sneaking.

## Timber mode

With `toggleTimber: true`, players switch timber mode on and off:

- by pressing **F** (swap hands) while holding a qualifying axe, or
- with `/timberz toggle`.

While it's on, the action bar shows `Timber: ON`. Timber mode isn't saved, so it's off for everyone after a server restart.

Because **F** is used for toggling, players can't put axes in their offhand while this is enabled.

With `toggleTimber: false`, timber is always on as long as the other requirements are met.

## Permission

Players without `timberz.usetimber` can never use timber. Everyone has it by default. Remove it with a permission plugin to limit timber to certain ranks:

```plaintext
/lp group default permission set timberz.usetimber false
/lp group vip permission set timberz.usetimber true
```

## Example setups

::::tabs
:::tab[Enchantment (default)]

Players need an axe with the [Timber enchantment](/timberz/guide/enchantment) and toggle timber mode with **F**.

```yaml
toggleTimber: true
requireCustomEnchant: true
restrictAxeModelData: false
requireAxeMaterial: true
```

:::
:::tab[Any axe, toggleable]

Every axe works. Players choose when to use timber with **F**.

```yaml
toggleTimber: true
requireCustomEnchant: false
restrictAxeModelData: false
requireAxeMaterial: true
```

:::
:::tab[Any axe, always on]

Every axe fells trees right away. Players sneak to break single logs.

```yaml
toggleTimber: false
requireCustomEnchant: false
restrictAxeModelData: false
requireAxeMaterial: true
```

:::
:::tab[Lumberjack axes]

Only your own custom items fell trees, for example axes from a shop, crate or custom items plugin. They need a custom model data value from the `allowedModelData` list.

```yaml
toggleTimber: false
requireCustomEnchant: false
restrictAxeModelData: true
allowedModelData:
  - 100
requireAxeMaterial: true
```

Give one to test it:

```plaintext
/give @s diamond_axe[custom_model_data={floats:[100]}]
```

:::
::::

## Custom tools

With `requireAxeMaterial: false`, any item can fell trees, not only axes. This is mostly useful together with `restrictAxeModelData`, if your custom lumberjack tool isn't an axe. You can't toggle timber with **F** in this mode, but `/timberz toggle` still works.

To allow additional items without turning this off, add them to the `axes` list in the [`blocks.yml`](/timberz/config/blocks#axes) instead.

:::note
Changes to `toggleTimber` and `requireAxeMaterial` need a server restart to fully apply.
:::
