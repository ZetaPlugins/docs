---
title: /sl add
description: Add a new server link
icon: Plus
---

Adds a new link to the server's links menu and saves it to `links.yml`.

```plaintext
/sl add <id> <name> <url> [allowCommand] [type]
```

| Argument         | Description                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------- |
| `<id>`           | Unique ID of the link. Using an existing ID replaces that link.                               |
| `<name>`         | Display name. Supports color codes and MiniMessage, but **no spaces**.                        |
| `<url>`          | The link target. Must start with `http://` or `https://`.                                     |
| `[allowCommand]` | `true` lets players open the link with [`/link <id>`](link) and `/<id>`. Defaults to `false`. |
| `[type]`         | The link type. Defaults to `CUSTOM`. See [link types](#link-types).                           |

## Examples

```plaintext
/sl add discord <#7289da>&lDiscord https://discord.gg/yourserver true
/sl add website <#7cd770>&lWebsite https://yourserver.com
/sl add bugs Bugs https://yourserver.com/issues true REPORT_BUG
```

:::note
Players need to rejoin to see the new link. If you set `allowCommand` to `true`, the `/<id>` command is only available after a server restart.
:::

## Link types

With `CUSTOM`, the link shows your `<name>`. Every other type shows a label defined by the Minecraft client, translated into the player's language.

`CUSTOM`, `ANNOUNCEMENTS`, `COMMUNITY`, `COMMUNITY_GUIDELINES`, `FEEDBACK`, `FORUMS`, `NEWS`, `REPORT_BUG`, `STATUS`, `SUPPORT`, `WEBSITE`

## Permission

| Permission           | Default |
| -------------------- | ------- |
| `serverlinksz.admin` | op      |
