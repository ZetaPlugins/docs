---
title: /withdrawheart
description: Turn your max hearts into heart items
icon: HeartMinus
---

Removes max hearts from you and gives you the same number of heart items, which you can trade, store or give to other players.

```plaintext
/withdrawheart [amount] [confirm]
```

| Argument    | Description                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------- |
| `[amount]`  | How many hearts to withdraw. Defaults to `1`.                                               |
| `[confirm]` | Withdraw even if it would eliminate you. Only works if `allowDyingFromWithdraw` is enabled. |

## Examples

```plaintext
/withdrawheart
/withdrawheart 3
/withdrawheart 5 confirm
```

## Limitations

The withdrawal is refused if:

- You would have fewer than `minWithdrawHearts` hearts left.
- You don't have enough free inventory space for the heart items.
- You are in your grace period and `gracePeriod.allowWithdraw` is disabled.
- Withdrawing would eliminate you and you didn't add `confirm`.

:::warning
Withdrawing with `confirm` sets your hearts to `0`. You are eliminated and kicked, and all your remaining hearts are dropped as heart items into your inventory.
:::

## Permission

| Permission            | Default |
| --------------------- | ------- |
| `lifestealz.withdraw` | true    |
