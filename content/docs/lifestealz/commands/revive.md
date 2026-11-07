---
title: /revive
description: Revive an eliminated player without a revive crystal
icon: Ambulance
---

Revives an eliminated player without needing a revive crystal.

```plaintext
/revive <player | *> [bypass]
```

| Argument   | Description                                                                                         |
| ---------- | --------------------------------------------------------------------------------------------------- |
| `<player>` | The eliminated player to revive. Tab-completes with eliminated players. Use `*` to revive everyone. |
| `[bypass]` | Ignore the revive limit. Requires `lifestealz.bypassrevivelimit`.                                   |

## What happens

The player's hearts are set to `reviveHearts` from the config, and their revive counter goes up by one. They can join the server again right away.

Only eliminated players can be revived. If a player has already been revived `maxRevives` times, the command fails unless you add `bypass`.

## Examples

```plaintext
/revive Steve
/revive Steve bypass
/revive *
```

## Permissions

| Permission                     | Description             | Default |
| ------------------------------ | ----------------------- | ------- |
| `lifestealz.admin.revive`      | Use `/revive`           | op      |
| `lifestealz.bypassrevivelimit` | Use the `bypass` option | op      |
