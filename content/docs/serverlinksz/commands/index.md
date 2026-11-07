---
title: All Commands
description: Quick reference of every ServerLinksZ command and its permission
icon: List
---

The main command is `/serverlinksz`, with the aliases `/sl`, `/slz` and `/serverlinks`. Running it without a subcommand shows the installed version.

## Reading the syntax

| Notation | Meaning           |
| -------- | ----------------- |
| `<arg>`  | Required argument |
| `[arg]`  | Optional argument |

## Overview

| Command                                                     | Description                           | Permission           | Default |
| ----------------------------------------------------------- | ------------------------------------- | -------------------- | ------- |
| [`/link <id>`](link)                                        | Show a link in chat                   | —                    | all     |
| [`/<id>`](link#per-link-commands)                           | Show a specific link, e.g. `/discord` | —                    | all     |
| [`/sl help`](#sl-help)                                      | Show the in-game help                 | —                    | all     |
| [`/sl add <id> <name> <url> [allowCommand] [type]`](sl_add) | Add a new link                        | `serverlinksz.admin` | op      |
| [`/sl remove <id>`](sl_remove)                              | Remove a link                         | `serverlinksz.admin` | op      |
| [`/sl reload`](#sl-reload)                                  | Reload the config, messages and links | `serverlinksz.admin` | op      |
| [`/slzdebug`](#slzdebug)                                    | Create a debug report for support     | `serverlinksz.admin` | op      |

:::tip
Adding links with `/sl add` is handy for quick changes. For full control (names with spaces, link types, ordering), edit `plugins/ServerLinksZ/links.yml` directly and run `/sl reload`.
:::

---

## /sl help

```plaintext
/sl help
```

Shows a short help message with a link to the support Discord.

---

## /sl reload

```plaintext
/sl reload
```

Reloads `config.yml`, the language files and `links.yml`.

:::note
Players need to rejoin to see updated links in their pause menu. Newly enabled [per-link commands](link#per-link-commands) are only registered after a server restart.
:::

**Permission:** `serverlinksz.admin` (default: op)

---

## /slzdebug

```plaintext
/slzdebug
```

Creates a debug report with information about your server, the plugin and its config. Share it when asking for [support](https://strassburger.org/discord).

**Permission:** `serverlinksz.admin` (default: op)
