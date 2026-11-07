---
title: All Commands
description: Quick reference of every CookieClickerZ command and permission
icon: List
---

This page lists every CookieClickerZ command at a glance. Click a command to see its arguments, examples and details.

All commands are subcommands of `/cookieclicker`. You can also use the shorter aliases `/cc` or `/cookieclickerz`.

## Reading the syntax

| Notation   | Meaning                                  |
| ---------- | ---------------------------------------- |
| `<arg>`    | Required argument                        |
| `[arg]`    | Optional argument                        |
| `<a \| b>` | Choose exactly one of the listed options |

## Player commands

These commands are available to every player by default.

| Command                                   | Description                          | Permission                     |
| ----------------------------------------- | ------------------------------------ | ------------------------------ |
| [`/cc help`](/cookieclickerz/commands/cookieclicker#cc-help)       | Show the in-game help                | none                           |
| [`/cc open`](/cookieclickerz/commands/cookieclicker#cc-open)       | Open one of the menus                | `cookieclickerz.openmenu`      |
| [`/cc numbers`](/cookieclickerz/commands/cookieclicker#cc-numbers) | Show the number shorthand cheatsheet | `cookieclickerz.numcheatsheet` |

## Admin commands

These commands are only available to operators by default.

| Command                                             | Description                                 | Permission                                |
| --------------------------------------------------- | ------------------------------------------- | ----------------------------------------- |
| [`/cc clicker`](/cookieclickerz/commands/cookieclicker#cc-clicker)           | Add, list or remove clicker blocks          | `cookieclickerz.admin.manageclickers`     |
| [`/cc cookies`](/cookieclickerz/commands/cookieclicker#cc-cookies)           | Add, remove or set a player's cookies       | `cookieclickerz.admin.managecookies`      |
| [`/cc giveupgrade`](/cookieclickerz/commands/cookieclicker#cc-giveupgrade)   | Give upgrade levels to a player             | `cookieclickerz.admin.giveupgrade`        |
| [`/cc prestige`](/cookieclickerz/commands/cookieclicker#cc-prestige)         | View or set a player's prestige level       | `cookieclickerz.admin.manageprestige`     |
| [`/cc events`](/cookieclickerz/commands/cookieclicker#cc-events)             | Start or view events for a player           | `cookieclickerz.admin.manageevents`       |
| [`/cc achievements`](/cookieclickerz/commands/cookieclicker#cc-achievements) | View or set a player's achievement progress | `cookieclickerz.admin.manageachievements` |
| [`/cc reload`](/cookieclickerz/commands/cookieclicker#cc-reload)             | Reload the config and language files        | `cookieclickerz.admin.reload`             |
| [`/ccdebug`](/cookieclickerz/commands/cookieclicker#ccdebug)                 | Create a debug report for support           | `cookieclickerz.admin.debug`              |

Running `/cc` without a subcommand shows the installed version.

## Other permissions

These permissions don't unlock a command, but control what players can do in-game.

| Permission                        | Description                                                                                                                      | Default |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `cookieclickerz.useclicker`       | Get cookies by clicking a clicker block                                                                                          | true    |
| `cookieclickerz.openmenu`         | Open the main menu by right-clicking a clicker                                                                                   | true    |
| `cookieclickerz.upgrades`         | Open the upgrade shop                                                                                                            | true    |
| `cookieclickerz.viewachievements` | View achievements                                                                                                                | true    |
| `cookieclickerz.prestige`         | Open the prestige menu                                                                                                           | true    |
| `cookieclickerz.top`              | Open the leaderboard                                                                                                             | true    |
| `cookieclickerz.buyupgrade.<id>`  | Buy an upgrade that has `requirePermission: true`. See [Upgrades](/cookieclickerz/gameplay/upgrades#creating-your-own-upgrades). | op      |
