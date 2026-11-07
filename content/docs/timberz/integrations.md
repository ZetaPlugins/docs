---
title: Integrations
description: Use TimberZ with WorldGuard, PlaceholderAPI and AuraSkills
icon: Puzzle
---

TimberZ works with these plugins out of the box. Just install them, no extra setup needed.

## WorldGuard

With [WorldGuard](https://enginehub.org/worldguard) installed, TimberZ adds a `timber` region flag. It's allowed everywhere by default. Deny it to stop players from felling trees in a region, for example at spawn or in a build area:

```plaintext
/rg flag spawn timber deny
```

Players can still break single logs there, if the region allows building.

To tell players why timber isn't working, enable `messageOnRegionViolation` in the [`config.yml`](/timberz/config#integrations). The message is `noTimberInThisRegion` in your [language file](/timberz/config/messages).

## PlaceholderAPI

With [PlaceholderAPI](https://modrinth.com/plugin/placeholderapi) installed, TimberZ registers this placeholder:

| Placeholder            | Description                                                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `%timberz_can_timber%` | `true` if the player can fell trees right now, otherwise `false`. Checks the permission, timber mode and WorldGuard region. |

The placeholder doesn't check the item the player is holding.

## AuraSkills

With [AuraSkills](https://modrinth.com/plugin/auraskills) installed, players get Foraging XP for every log of a felled tree, the same amount as for breaking it by hand.

To give more or less XP for trees felled with TimberZ, change the multiplier in the [`config.yml`](/timberz/config#integrations):

```yaml
# 2.0 = double XP, 0.5 = half XP
auraSkillsXPMultiplier: 1.0
```
