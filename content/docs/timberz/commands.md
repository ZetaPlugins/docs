---
title: Commands
description: All TimberZ commands and permissions
icon: Terminal
---

TimberZ has one command, `/timberz`, with the alias `/tz`. Running it without a subcommand shows the installed version.

| Command                              | Description                        | Permission          | Default |
| ------------------------------------ | ---------------------------------- | ------------------- | ------- |
| `/timberz`                           | Show the installed version         | none                | true    |
| [`/timberz help`](#timberz-help)     | Show links to the docs and support | none                | true    |
| [`/timberz toggle`](#timberz-toggle) | Turn timber mode on or off         | `timberz.usetimber` | true    |
| [`/timberz reload`](#timberz-reload) | Reload the config files            | `timberz.admin`     | op      |

## Permissions

| Permission          | Description                                                                  | Default |
| ------------------- | ---------------------------------------------------------------------------- | ------- |
| `timberz.usetimber` | Fell trees and toggle timber mode. Without it, players can never use timber. | true    |
| `timberz.admin`     | Use `/timberz reload`                                                        | op      |

---

## /timberz help

```plaintext
/timberz help
```

Shows the installed version with links to these docs and the support Discord.

---

## /timberz toggle

```plaintext
/timberz toggle
```

Turns [timber mode](/timberz/guide/access#timber-mode) on or off, just like pressing **F** with an axe. Can only be run by a player.

This command only exists when `toggleTimber` is enabled in the config.

**Permission:** `timberz.usetimber` (default: true)

---

## /timberz reload

```plaintext
/timberz reload
```

Reloads the `config.yml`, `blocks.yml` and the language file.

Some settings are only read when the server starts. Restart the server after changing:

- `toggleTimber` and `requireAxeMaterial`
- the [tree detection](/timberz/config#tree-detection) settings
- the `logToSaplingMap` in the `blocks.yml`

**Permission:** `timberz.admin` (default: op)
