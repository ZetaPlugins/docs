---
title: Felling Trees
description: How TimberZ detects trees, what gets broken and what it costs
icon: TreePine
---

## When a tree is felled

When a player breaks a log, TimberZ fells the whole tree if all of these are true:

- the player is **not sneaking**
- the player is [allowed to use timber](/timberz/guide/access): they have the permission, timber mode is on and the axe qualifies
- the log is listed in the [`blocks.yml`](/timberz/config/blocks)
- the log is part of a **real tree** (see below)
- the axe has **enough durability** left

If any of these isn't met, the log breaks normally.

## Tree detection

TimberZ tries hard to only fell natural trees, not log cabins or wooden builds. A group of logs counts as a tree when:

- there is another log of the same type **directly or diagonally above** the broken one. Breaking the topmost log of a tree only breaks that log.
- at least **3 logs** of the same type are connected to each other
- at least **5 matching leaves** touch the logs. Leaves must match the log type, so oak logs need oak leaves.

Only logs of the **same type** as the broken one are cut down. Logs are connected directly or diagonally, so branches of acacia and big oak trees are included. The trunk below the broken log is cut down too.

A tree can have at most **500 logs**. You can fine-tune all of these values in the [`config.yml`](/timberz/config#tree-detection).

:::note[Player-placed logs]
TimberZ doesn't track which logs were placed by players. A build made of logs with leaves around it can look like a tree and be felled. Use the [WorldGuard flag](/timberz/integrations#worldguard) to protect builds.
:::

## What happens to the tree

1. **Logs** break one after another from the bottom up, with particles and sounds. They drop items as if the player broke each one with their axe.
2. **Leaves** around the tree decay within about two seconds and drop their items as usual. Leaves that are closer to a neighboring tree are left alone. You can turn this off with `instantLeafDecay`.
3. A **sapling** is planted where the tree stood, about three seconds after felling. For 2×2 trees like dark oak and big spruce, four saplings are planted. You can turn this off with `replant`.

Saplings are only planted on grass, dirt, coarse dirt, podzol, rooted dirt or farmland, and only if the spot is free.

## Durability

Felling a tree costs durability on the axe:

```plaintext
durability cost = number of logs × durabilityMultiplier
```

With the default multiplier of `1.0`, a tree with 12 logs costs 12 durability, the same as breaking every log by hand. The cost isn't reduced by Unbreaking.

To protect axes from breaking, a tree is only felled if the axe has at least **10 durability** left afterwards. Otherwise the player gets a message and only the one log breaks.

You can change both values with `durabilityMultiplier` and `minDurability` in the [`config.yml`](/timberz/config#timber-settings). For example, set `durabilityMultiplier: 0.5` to make felling half as expensive.

## Breaking leaves faster

If `instaBreakLeavesWithTimber` is enabled, players who are allowed to use timber can break leaves instantly with their axe.

:::warning
This option also needs a `leafBlocks` list in the [`blocks.yml`](/timberz/config/blocks#insta-break-leaves), which isn't there by default.
:::
