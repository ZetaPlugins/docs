---
title: Blocks
description: Choose which trees, leaves, saplings and axes TimberZ uses
icon: Boxes
---

The `blocks.yml` file tells TimberZ which blocks belong together. All entries use [material names](https://jd.papermc.io/paper/1.21.4/org/bukkit/Material.html) in upper case.

## Logs and leaves

```yaml
logToLeafMap:
  - "OAK_LOG:OAK_LEAVES"
  - "BIRCH_LOG:BIRCH_LEAVES"
  - "STRIPPED_OAK_LOG:OAK_LEAVES"
  # …
```

Each entry is `LOG:LEAVES`. Only logs in this list can be felled, and a tree is only detected if it has the matching leaves around it. You can list the same log several times to allow more than one leaf type:

```yaml
  - "OAK_LOG:OAK_LEAVES"
  - "OAK_LOG:AZALEA_LEAVES"
  - "OAK_LOG:FLOWERING_AZALEA_LEAVES"
```

By default, all overworld trees are included: oak, birch, spruce, jungle, acacia, dark oak, mangrove, cherry and pale oak, plus their stripped logs.

:::tip[Nether trees]
Crimson and warped stems aren't included. You can add them with their wart blocks as "leaves":

```yaml
  - "CRIMSON_STEM:NETHER_WART_BLOCK"
  - "WARPED_STEM:WARPED_WART_BLOCK"
```

Add them to `logToSaplingMap` with their fungus too, if you want them replanted.
:::

To stop a tree type from being felled, remove its line.

## Saplings

```yaml
logToSaplingMap:
  - "OAK_LOG:OAK_SAPLING"
  - "MANGROVE_LOG:MANGROVE_PROPAGULE"
  # …
```

Each entry is `LOG:SAPLING`. When `replant` is on, this sapling is planted after the tree is felled. Logs without an entry are not replanted.

Changes to this list need a server restart.

## Axes

```yaml
axes:
  - "WOODEN_AXE"
  - "STONE_AXE"
  - "GOLDEN_AXE"
  - "IRON_AXE"
  - "DIAMOND_AXE"
  - "NETHERITE_AXE"
```

The items that count as axes when `requireAxeMaterial` is on. You can add other items here, for example `"COPPER_AXE"` on newer versions, or a tool your custom lumberjack item is based on.

## Insta-break leaves

The `instaBreakLeavesWithTimber` option reads the leaves it applies to from a `leafBlocks` list, which isn't part of the default file. Add it yourself if you use that option:

```yaml
leafBlocks:
  - "OAK_LEAVES"
  - "BIRCH_LEAVES"
  - "SPRUCE_LEAVES"
  - "JUNGLE_LEAVES"
  - "ACACIA_LEAVES"
  - "DARK_OAK_LEAVES"
  - "MANGROVE_LEAVES"
  - "CHERRY_LEAVES"
  - "PALE_OAK_LEAVES"
  - "AZALEA_LEAVES"
  - "FLOWERING_AZALEA_LEAVES"
```
