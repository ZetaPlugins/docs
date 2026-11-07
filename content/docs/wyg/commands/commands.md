---
title: Commands & Permissions
description: Share your items with commands or chat markers, and control who can use them
icon: Terminal
---

WYG lets players show off the item in a hand or armor slot as a hoverable chat message. You can do it with a command, or just by typing a marker like `[hand]` in chat.

## Overview

| Command                    | Chat marker    | Shares             | Permission       | Default |
| -------------------------- | -------------- | ------------------ | ---------------- | ------- |
| `/wyg hand [target]`       | `[hand]`       | Item in main hand  | `wyg.hand`       | true    |
| `/wyg offhand [target]`    | `[offhand]`    | Item in offhand    | `wyg.offhand`    | true    |
| `/wyg helmet [target]`     | `[helmet]`     | Helmet             | `wyg.helmet`     | true    |
| `/wyg chestplate [target]` | `[chestplate]` | Chestplate         | `wyg.chestplate` | true    |
| `/wyg leggings [target]`   | `[leggings]`   | Leggings           | `wyg.leggings`   | true    |
| `/wyg boots [target]`      | `[boots]`      | Boots              | `wyg.boots`      | true    |
| `/wyg reload`              | —              | Reloads the config | `wyg.reload`     | op      |

`/showitem` works as an alias for `/wyg`.

---

## Sharing with a command

```plaintext
/wyg <slot> [target]
```

| Argument   | Description                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------------- |
| `<slot>`   | One of `hand`, `offhand`, `helmet`, `chestplate`, `leggings`, `boots`                                         |
| `[target]` | An online player. If set, the item is only sent to that player (and you). If omitted, it's shown to everyone. |

```plaintext title="Examples"
/wyg hand
/wyg helmet Alex
/showitem boots
```

If the slot is empty, you get an error message and nothing is shared. You can't target yourself; leave out `[target]` to share with everyone instead.

## Sharing in chat

You don't need a command at all. Put one or more slot markers anywhere in a normal chat message, and WYG replaces each with a hoverable item preview:

```plaintext title="Examples"
Got this new sword: [hand]
Peep the fit → [helmet] [chestplate] [leggings] [boots]
```

- Markers are the slot names in square brackets: `[hand]`, `[offhand]`, `[helmet]`, `[chestplate]`, `[leggings]`, `[boots]`.
- If a slot is empty or the marker is unknown, the text is left as it is.
- The message is sent to the same players as any other chat message.

How the item looks in chat and on hover is set by `item-display.format` and `hover-text.*` in the [config](../config/config).

## Reloading

```plaintext
/wyg reload
```

Reloads `config.yml` without restarting the server.

---

## Permissions

| Permission             | Description                                       | Default |
| ---------------------- | ------------------------------------------------- | ------- |
| `wyg.use`              | Use WYG commands                                  | true    |
| `wyg.hand`             | Share the item in the main hand                   | true    |
| `wyg.offhand`          | Share the item in the offhand                     | true    |
| `wyg.helmet`           | Share the helmet                                  | true    |
| `wyg.chestplate`       | Share the chestplate                              | true    |
| `wyg.leggings`         | Share the leggings                                | true    |
| `wyg.boots`            | Share the boots                                   | true    |
| `wyg.equipment.others` | Share an item with a specific player (`[target]`) | true    |
| `wyg.reload`           | Reload the configuration                          | op      |

:::note
Currently only `wyg.reload` is checked by the plugin. The other permissions are registered so you can already assign them, and may be enforced in a future update.
:::

## Troubleshooting

**Nothing happens when I type `[hand]`.** Make sure you're holding an item. If the item shows up but has no hover text, check that `hover-text.enabled` is `true`. Other chat plugins can also strip formatted components from messages.

**I can't use `/wyg reload`.** You need the `wyg.reload` permission or OP.
