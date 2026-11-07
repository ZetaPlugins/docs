---
title: Configuration
description: All options in the TimberZ config.yml
icon: Wrench
---

TimberZ creates its config files in `plugins/TimberZ` the first time the server starts with the plugin installed.

:::files

- plugins/
    - TimberZ/
        - lang/
            - en-US.yml
            - de-DE.yml
            - …
        - config.yml
        - blocks.yml
    - …

:::

| File         | What it's for                                                                            |
| ------------ | ---------------------------------------------------------------------------------------- |
| `config.yml` | General settings, explained on this page                                                 |
| `blocks.yml` | Which logs, leaves, saplings and axes TimberZ uses. See [Blocks](/timberz/config/blocks) |
| `lang/*.yml` | All messages. See [Messages](/timberz/config/messages)                                   |

After changing a file, run [`/timberz reload`](/timberz/commands#timberz-reload). Some settings need a full restart, which is noted below.

## General

```yaml
checkForUpdates: true
lang: "en-US"
accentColor: "<#00D26A>"
```

| Option            | Description                                                                                                | Default     |
| ----------------- | ---------------------------------------------------------------------------------------------------------- | ----------- |
| `checkForUpdates` | Tells operators on join when a new version is available.                                                   | `true`      |
| `lang`            | The language file to use from the `lang` folder, without `.yml`. See [Messages](/timberz/config/messages). | `en-US`     |
| `accentColor`     | The color that replaces `%ac%` in all messages.                                                            | `<#00D26A>` |

## Timber settings

```yaml
toggleTimber: true
requireCustomEnchant: true
restrictAxeModelData: false
allowedModelData:
  - 100
requireAxeMaterial: true

instantLeafDecay: true
replant: true
durabilityMultiplier: 1.0
minDurability: 10
instaBreakLeavesWithTimber: false

messageOnRegionViolation: false
auraSkillsXPMultiplier: 1.0
```

### Access

These decide who can fell trees and with which item. See [Who Can Use Timber](/timberz/guide/access) for example setups.

| Option                 | Description                                                                                                                                                                    | Default |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `toggleTimber`         | Players turn timber mode on and off with **F** or `/timberz toggle`. If `false`, timber is always on. Needs a restart.                                                         | `true`  |
| `requireCustomEnchant` | Only axes with the [Timber enchantment](/timberz/guide/enchantment) fell trees.                                                                                                | `true`  |
| `restrictAxeModelData` | Only axes with a custom model data value from `allowedModelData` fell trees.                                                                                                   | `false` |
| `allowedModelData`     | The custom model data values allowed when `restrictAxeModelData` is on.                                                                                                        | `[100]` |
| `requireAxeMaterial`   | Only items from the `axes` list in the [`blocks.yml`](/timberz/config/blocks#axes) fell trees. If `false`, any item works and **F** no longer toggles timber. Needs a restart. | `true`  |

### Felling

See [Felling Trees](/timberz/guide/felling) for how these work.

| Option                       | Description                                                                                                                                    | Default |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `instantLeafDecay`           | Leaves around a felled tree decay right away.                                                                                                  | `true`  |
| `replant`                    | Plants a sapling where the tree stood.                                                                                                         | `true`  |
| `durabilityMultiplier`       | Durability cost per log. `0.5` halves the cost, `2.0` doubles it.                                                                              | `1.0`   |
| `minDurability`              | How much durability the axe must have left after felling. If it would have less, the tree isn't felled.                                        | `10`    |
| `instaBreakLeavesWithTimber` | Players who can use timber break leaves instantly with their axe. Also needs a [`leafBlocks` list](/timberz/config/blocks#insta-break-leaves). | `false` |

### Integrations

| Option                     | Description                                                                                                          | Default |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------- |
| `messageOnRegionViolation` | Tells players when they try to use timber in a [WorldGuard](/timberz/integrations#worldguard) region that denies it. | `false` |
| `auraSkillsXPMultiplier`   | Multiplies the Foraging XP from felled trees with [AuraSkills](/timberz/integrations#auraskills).                    | `1.0`   |

## Tree detection

```yaml
leavesSearchRadius: 4
maxTreeSize: 500
maxSearchRadius: 1
diagonalSearchRange: 2
minLeavesRequired: 5
minLogsRequired: 3
```

:::warning[Expert settings]
These values are already fine-tuned for vanilla trees. Changing them can cause builds to be felled, or real trees to be ignored. They need a server restart.
:::

| Option                | Description                                                                                     | Default |
| --------------------- | ----------------------------------------------------------------------------------------------- | ------- |
| `minLogsRequired`     | How many connected logs a tree needs at least.                                                  | `3`     |
| `minLeavesRequired`   | How many matching leaves must touch the logs.                                                   | `5`     |
| `maxSearchRadius`     | How far from each log to look for those leaves, in blocks.                                      | `1`     |
| `maxTreeSize`         | The maximum number of logs that are cut down at once. Bigger trees are only partly felled.      | `500`   |
| `diagonalSearchRange` | How far apart two logs can be and still count as connected. Higher values catch wider branches. | `2`     |
| `leavesSearchRadius`  | How far around each log leaves are removed with `instantLeafDecay`.                             | `4`     |
