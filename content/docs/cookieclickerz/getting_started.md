---
title: Getting Started
description: Create your first clicker block and learn the basics
icon: Rocket
---

This page walks you through setting up your first clicker and explains what players see when they use it.

::::steps

### Create a clicker block

Stand close to the block you want to turn into a clicker (within 5 blocks), look at it and run:

```plaintext
/cc clicker add <name>
```

The name is only used to identify the clicker in commands, for example `/cc clicker add spawn`. Every clicker needs a unique name.

You can create as many clickers as you like. They all share the same player progress, so it doesn't matter which one a player uses.

:::tip
Clicker blocks can't be broken, so you don't need to protect them separately.
:::

### Add a hologram (optional)

Install [DecentHolograms](https://modrinth.com/plugin/decentholograms) or FancyHolograms and keep `hologram: true` in the `config.yml`. A hologram then appears above every clicker. See [Holograms](/cookieclickerz/integrations/holograms) to change its text and height.

### Start clicking

- **Left-click** the block to bake cookies. The action bar shows how many cookies you just got and your total.
- **Right-click** the block to open the main menu.

::::

## The main menu

The main menu shows your current cookies, cookies per click, offline income and prestige level. From there players can open:

| Menu             | What it does                                                                           |
| ---------------- | -------------------------------------------------------------------------------------- |
| **Upgrades**     | Buy [upgrades](/cookieclickerz/gameplay/upgrades) that increase your cookies per click |
| **Achievements** | View your [achievements](/cookieclickerz/gameplay/achievements) and their progress     |
| **Prestige**     | Reset your progress for a permanent [multiplier](/cookieclickerz/gameplay/prestige)    |
| **Top**          | The leaderboard of the best players on the server                                      |

Players can also open every menu directly with [`/cc open`](/cookieclickerz/commands/cookieclicker#cc-open).

## Managing clickers

Use `/cc clicker list` to see all clickers. Click a name in the list to teleport to it.

To remove a clicker, run:

```plaintext
/cc clicker remove <name>
```

The block itself stays in place and turns back into a normal block.

## Next steps

::::cards
:::card{href="/cookieclickerz/gameplay/clicking" title="How clicking works" icon="MousePointerClick"}
Cookies per click, number shorthands and offline income.
:::

:::card{href="/cookieclickerz/config" title="Configuration" icon="Wrench"}
Change sounds, events, the anti-cheat and storage.
:::
::::
