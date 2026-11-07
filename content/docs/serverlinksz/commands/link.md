---
title: /link
description: Let players open server links from chat
icon: Link
---

Sends a clickable link to the player in chat. Only links with `allowCommand: true` can be opened this way.

```plaintext
/link <id>
```

| Argument | Description                                                    |
| -------- | -------------------------------------------------------------- |
| `<id>`   | ID of the link. Tab-completes with all links players can open. |

```plaintext title="Examples"
/link discord
/link store
```

`/link` is enabled by default. Set `linkCommand: false` in the [config](../customization/config) to disable it.

## Per-link commands

Every link with `allowCommand: true` also gets its own command named after its ID. A link with the ID `discord` can be opened with `/discord`.

```yaml title="links.yml"
discord:
    name: '<#7289da>&lDiscord'
    url: 'https://discord.gg/yourserver'
    type: CUSTOM
    allowCommand: true # registers /discord
```

:::note
Per-link commands are registered on startup, so restart the server after enabling `allowCommand` on a link.
:::

## Permission

`/link` and per-link commands need no permission and can be used by every player.
