---
title: Events
description: Random events that boost or drain a player's cookies
icon: Sparkles
---

Every click on a clicker block has a small chance to start a random event. Some events help the player, others don't. A new event can only start when the player has no event running.

## Event types

| Event             | Type | Effect                                    | Duration   | Chance per click |
| ----------------- | ---- | ----------------------------------------- | ---------- | ---------------- |
| **Cookie Frenzy** | Good | 7× cookies per click                      | 77 seconds | 0.5%             |
| **Lucky**         | Good | Instantly get 10% of your current cookies | Instant    | 0.7%             |
| **Click Frenzy**  | Good | 777× cookies per click                    | 7 seconds  | 0.2%             |
| **Ruin**          | Bad  | Instantly lose 5% of your current cookies | Instant    | 0.2%             |
| **Cursed Finger** | Bad  | Half the cookies per click                | 66 seconds | 0.2%             |

Timed events announce when they start and end with a chat message and a beacon sound. Instant events only send a message.

Events also count towards the [event achievements](/cookieclickerz/gameplay/achievements#events).

## Changing the chances

You can change how often each event happens, or turn events off completely, in the `config.yml`:

```yaml
events:
  enabled: true
  rates:
    COOKIE_FRENZY: 0.005
    LUCKY: 0.007
    CLICK_FRENZY: 0.002
    RUIN: 0.002
    CURSED_FINGER: 0.002
```

Each rate is the chance per click, where `1.0` is 100% and `0.005` is 0.5%. Set a rate to `0` to disable a single event.

:::warning
All rates together must not add up to more than `1.0`.
:::

The effects and durations of the events can't be changed, but their messages can. They are in the `eventMessages` section of your [language file](/cookieclickerz/config/messages).

## Starting events manually

Admins can start an event for a player, or check which events are running, with [`/cc events`](/cookieclickerz/commands/cookieclicker#cc-events):

```plaintext
/cc events Steve start CLICK_FRENZY
/cc events Steve start random
/cc events Steve get
```

This works even when events are disabled in the config, so you can use it for your own rewards or server events.
