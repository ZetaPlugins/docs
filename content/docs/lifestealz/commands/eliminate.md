---
title: /eliminate
description: Eliminate a player instantly
icon: Skull
---

Eliminates a player immediately, the same as if they had run out of hearts.

```plaintext
/eliminate <player>
```

| Argument   | Description                              |
| ---------- | ---------------------------------------- |
| `<player>` | The player to eliminate. Must be online. |

## What happens

1. The player's max hearts are set to `0`.
2. Their entire inventory is dropped at their location.
3. They are kicked from the server.
4. If `announceElimination` is enabled in the config, the elimination is announced in chat.

The player can be brought back with [`/revive`](revive) or a revive crystal.

## Examples

```plaintext
/eliminate Steve
```

## Permission

| Permission                   | Default |
| ---------------------------- | ------- |
| `lifestealz.admin.eliminate` | op      |
