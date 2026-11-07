---
title: All Commands
description: Quick reference of every LifeStealZ command and its permission
icon: List
---

This page lists every LifeStealZ command at a glance. Click a command to see its arguments, examples and details.

## Reading the syntax

| Notation   | Meaning                                    |
| ---------- | ------------------------------------------ |
| `<arg>`    | Required argument                          |
| `[arg]`    | Optional argument                          |
| `<a \| b>` | Choose exactly one of the listed options   |
| `+`        | Targets all **online** players             |
| `*`        | Targets all online **and offline** players |

## Player commands

These commands are available to every player by default.

| Command                                       | Description                               | Permission               |
| --------------------------------------------- | ----------------------------------------- | ------------------------ |
| [`/hearts`](hearts)                           | Show how many hearts you or a player have | `lifestealz.viewhearts`  |
| [`/withdrawheart`](withdrawheart)             | Turn your max hearts into heart items     | `lifestealz.withdraw`    |
| [`/lsz help`](lifestealz#lifestealz-help)     | Show the in-game help                     | `lifestealz.help`        |
| [`/lsz recipe`](lifestealz#lifestealz-recipe) | View the crafting recipe of a custom item | `lifestealz.viewrecipes` |

## Admin commands

These commands are only available to operators by default.

| Command                                                 | Description                                  | Permission                     |
| ------------------------------------------------------- | -------------------------------------------- | ------------------------------ |
| [`/eliminate`](eliminate)                               | Eliminate a player instantly                 | `lifestealz.admin.eliminate`   |
| [`/revive`](revive)                                     | Revive an eliminated player                  | `lifestealz.admin.revive`      |
| [`/lsz reload`](lifestealz#lifestealz-reload)           | Reload the config files                      | `lifestealz.admin.reload`      |
| [`/lsz hearts`](lifestealz#lifestealz-hearts)           | Change or view a player's hearts             | `lifestealz.admin.setlife`     |
| [`/lsz giveItem`](lifestealz#lifestealz-giveitem)       | Give a custom item to a player               | `lifestealz.admin.giveitem`    |
| [`/lsz graceperiod`](lifestealz#lifestealz-graceperiod) | Skip or restart a player's grace period      | `lifestealz.admin.graceperiod` |
| [`/lsz checkbypass`](lifestealz#lifestealz-checkbypass) | Check whether a player has heart-loss bypass | `lifestealz.admin.bypasscheck` |
| [`/lsz data`](lifestealz#lifestealz-data)               | Import or export all player data             | `lifestealz.managedata`        |
| [`/lsz debug`](lifestealz#lifestealz-debug)             | Create a debug report for support            | `lifestealz.admin.debug`       |

`/lsz` is a shorthand for `/lifestealz` and works everywhere.

## Other permissions

These permissions don't unlock a command on their own, but change how commands and the plugin behave.

| Permission                     | Description                                                                 | Default |
| ------------------------------ | --------------------------------------------------------------------------- | ------- |
| `lifestealz.bypassrevivelimit` | Allows using `bypass` with [`/revive`](revive) to ignore the revive limit   | op      |
| `lifestealz.revive`            | Allows reviving players with a revive crystal                               | true    |
| `lifestealz.bypass`            | The player doesn't lose hearts, drop hearts or reward their killer on death | false   |
