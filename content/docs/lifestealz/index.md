---
title: LifeStealZ
description: The ultimate lifesteal SMP plugin for Paper servers.
icon: Heart
---

LifeStealZ turns your server into a lifesteal SMP. Every player starts with a set number of hearts. Killing another player steals one of theirs, and dying takes one of yours. A player who runs out of hearts is **eliminated** until a teammate brings them back with a revive crystal.

Almost every part of this loop can be changed: how many hearts players start with, the maximum they can reach, what happens on natural deaths, and which items and recipes exist.

## How it works

::::steps

### Start with hearts

New players join with `startHearts` hearts (10 by default) and can collect up to `maxHearts`.

### Steal hearts in PvP

When a player kills another player, the killer gains a heart and the victim loses one. Dying to anything else can also cost a heart.

### Trade and craft

Players can turn hearts into items with [`/withdrawheart`](/lifestealz/commands/withdrawheart), trade them, or craft new ones with [custom recipes](/lifestealz/config/customitems).

### Elimination and revival

At zero hearts a player is eliminated and kicked. A revive crystal, or an admin using [`/revive`](/lifestealz/commands/revive), brings them back.

::::

## Features

**Gameplay**

- Heart stealing, withdrawing and natural heart loss
- Start, minimum and maximum hearts
- Revive crystals with an optional revive limit
- Grace period for new players
- Optionally disable totems and crystal PvP

**Customization**

- Custom heart and revive items with your own crafting recipes, viewable in game
- Every message editable, with MiniMessage, HEX colors and gradients
- SQLite and MySQL storage, with import and export between them

**Integrations**

- [PlaceholderAPI](/lifestealz/crosspluginsupport/placeholderapi) placeholders
- Custom [WorldGuard](/lifestealz/crosspluginsupport/worldguard) flags
- Bedrock players via Floodgate
- A [developer API](/lifestealz/dev/usinglszapi) for your own plugins

## Getting started

::::cards
:::card{href="/lifestealz/installation" title="Installation" icon="Download"}
Install LifeStealZ on your server in three steps.
:::

:::card{href="/lifestealz/config" title="Configuration" icon="Settings"}
Set starting hearts, heart limits, death behavior and more.
:::

:::card{href="/lifestealz/config/customitems" title="Custom Items" icon="Sparkles"}
Create your own heart and revive items and their recipes.
:::

:::card{href="/lifestealz/commands" title="Commands" icon="Terminal"}
Every command and permission at a glance.
:::
::::

## Resources

::::cards
:::card{href="https://modrinth.com/plugin/lifestealz" title="Modrinth" icon="Modrinth"}
Download the latest version.
:::

:::card{href="https://hangar.papermc.io/KartoffelChipss/LifestealZ" title="Hangar" icon="Hangar"}
Download from PaperMC's plugin repository.
:::

:::card{href="https://strassburger.org/discord" title="Support Discord" icon="Discord"}
Ask questions in #support or open a ticket.
:::

:::card{href="https://github.com/KartoffelChipss/LifeStealZ" title="GitHub" icon="GitHub"}
Source code, issues and feature requests.
:::

:::card{href="https://lifestealz.com/" title="Website" icon="Globe"}
The official LifeStealZ website.
:::

:::card{href="https://jd.lsz.zetaplugins.com/" title="JavaDoc" icon="BookOpen"}
API reference for developers.
:::

:::card{href="https://bstats.org/plugin/bukkit/LifeStealZ/18735" title="bStats" icon="ChartColumn"}
Usage statistics across all servers.
:::
::::
