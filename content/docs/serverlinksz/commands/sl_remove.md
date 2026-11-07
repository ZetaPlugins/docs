---
title: /sl remove
description: Remove an existing server link
icon: Minus
---

Removes a link from the server's links menu and from `links.yml`.

```plaintext
/sl remove <id>
```

| Argument | Description                              |
| -------- | ---------------------------------------- |
| `<id>`   | ID of the link to remove. Tab-completes. |

## Examples

```plaintext
/sl remove discord
/sl remove store
```

:::note
Players need to rejoin to see the change.
:::

## Permission

| Permission           | Default |
| -------------------- | ------- |
| `serverlinksz.admin` | op      |
