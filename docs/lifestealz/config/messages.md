---
id: messages
title: 💬 Messages
displayed_sidebar: lifestealz
---

import EmbedUrl from '@site/src/components/EmbedUrl';

# 💬 Messages

## Formatting

LifeStealZ uses a text library called MiniMessage. MiniMessage allows for better formatting and adds text click effects, gradients etc. You can read up on the formatting here:

<EmbedUrl url="https://docs.advntr.dev/minimessage/format.html" title="MiniMessage Formatting" />

If you don't like this formatting, you can just use the old formatting (&1, \&a etc.) and the plugin will automatically convert it to the newer formatting. You can even mismatch them together if you like!

## Placeholders

For the messages in the `messages` config section, you can use different placeholders. The placeholders, that you can use are already in the default messages and start and end with `%` (e.g. `%player%`).

For the custom command sections, the placeholders start and end with `&` (e.g. `&player&`) and are normally listed in a comment above.
