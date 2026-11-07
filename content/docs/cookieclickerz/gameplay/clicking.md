---
title: Clicking & Cookies
description: How cookies are earned, how big numbers are written and how offline income works
icon: MousePointerClick
---

## Earning cookies

Every left-click on a clicker block gives you cookies. How many you get is calculated like this:

```plaintext
cookies per click × prestige multiplier × active event bonus
```

- **Cookies per click (CPC)** starts at `1` and goes up with every [upgrade](/cookieclickerz/gameplay/upgrades) you buy.
- **Prestige multiplier** comes from your current [prestige level](/cookieclickerz/gameplay/prestige). Without a prestige it's `1`.
- **Event bonus** applies while a timed [event](/cookieclickerz/gameplay/events) like Cookie Frenzy is running.

After each click, the action bar shows how many cookies you got and your new total. Each click also counts towards your click and cookie [achievements](/cookieclickerz/gameplay/achievements), and has a small chance to start a random event.

To click, players need the `cookieclickerz.useclicker` permission, which everyone has by default.

## Big numbers

Cookie counts grow fast, so CookieClickerZ shortens large numbers with suffixes. You can use the same suffixes when typing amounts in commands and config files, for example `/cc cookies Steve add 2.5M` or `baseprice: "10B"`.

| Suffix | Value           | Suffix | Value |
| ------ | --------------- | ------ | ----- |
| `K`    | 1,000 (10³)     | `S`    | 10²¹  |
| `M`    | 1,000,000 (10⁶) | `SS`   | 10²⁴  |
| `B`    | 10⁹             | `O`    | 10²⁷  |
| `T`    | 10¹²            | `N`    | 10³⁰  |
| `Q`    | 10¹⁵            | `D`    | 10³³  |
| `QQ`   | 10¹⁸            |        |       |

Players can see this list in-game with [`/cc numbers`](/cookieclickerz/commands/cookieclicker#cc-numbers).

:::note
Suffixes are case-sensitive. Use `1M`, not `1m`.
:::

## Offline cookies

Most upgrades also add **offline cookies**. This is the amount of cookies a player earns for every full minute they are offline.

When the player joins again, they get:

```plaintext
offline cookies × minutes offline
```

and a chat message tells them how much they earned. Offline cookies aren't affected by the prestige multiplier or events.

You can turn offline income or the join message off in the [`config.yml`](/cookieclickerz/config#offline-cookies).

## Leaderboard

The **Top** menu ranks players by their cookies. The leaderboard is recalculated every 60 seconds by default, so changes can take a moment to show up. You can change the size and update interval, or turn it off completely, in the [`config.yml`](/cookieclickerz/config#leaderboard).

The leaderboard is also available as [placeholders](/cookieclickerz/integrations/placeholderapi#leaderboard), for example for holograms or a scoreboard.

## Anti-cheat

To keep things fair, CookieClickerZ ignores clicks when a player:

- clicks faster than **15 times per second**, or
- hasn't moved for more than **15 seconds**, which usually means an auto-clicker is running.

The player gets a warning message instead of cookies. You can change the limits, the messages, and run commands like a kick in the [`config.yml`](/cookieclickerz/config#anti-cheat).
