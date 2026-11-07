---
title: Getting Started
description: Cut down your first tree and choose how players get to use TimberZ
icon: Rocket
---

## Felling your first tree

With the default settings, players need two things to fell a tree:

1. An axe with the **Timber** enchantment
2. Timber mode turned **on**

::::steps

### Get a Timber axe

The Timber enchantment works like any other enchantment. You can get it from an enchanting table, an enchanted book from a librarian villager, or an anvil. See [Timber Enchantment](/timberz/guide/enchantment) for details.

To test it right away as an operator, give yourself one:

```plaintext
/give @s diamond_axe[enchantments={"timberz:timber":1}]
```

### Turn on timber mode

Hold the axe in your main hand and press **F** (swap hands). The action bar shows `Timber: ON`. Press **F** again to turn it off. You can also use `/timberz toggle`.

### Break a log

Break a log of a tree, for example at the bottom of the trunk. The tree is cut down log by log from the bottom up, the leaves decay and a sapling is replanted a few seconds later.

To break a single log normally, **sneak** while breaking it.

::::

:::tip
Timber mode isn't saved. After a server restart, it's off for everyone again.
:::

## Choosing a setup

The default setup is only one option. You can make TimberZ work for everyone with any axe, or only with special lumberjack axes from your own items. See [Who Can Use Timber](/timberz/guide/access) for ready-to-use setups.

## Next steps

::::cards
:::card{href="/timberz/guide/felling" title="Felling Trees" icon="TreePine"}
How trees are detected, durability costs and replanting.
:::

:::card{href="/timberz/config" title="Configuration" icon="Wrench"}
All options in the config.yml.
:::
::::
