---
title: Achievements
description: All achievements, their goals and how to reward players for them
icon: Trophy
---

Achievements give players goals to work towards. They unlock automatically and show a chat message when completed. Players can view their progress in the achievements menu, which they open from the main menu or with `/cc open achievements`.

Viewing achievements needs the `cookieclickerz.viewachievements` permission, which everyone has by default.

## All achievements

### Clicks

Counts every click on a clicker block.

| Achievement         | ID                           | Goal      |
| ------------------- | ---------------------------- | --------- |
| Rookie Clicker      | `clicks_clicker_rookie`      | 1         |
| Finger Workout      | `clicks_finger_workout`      | 1,000     |
| Click Champion      | `clicks_click_champion`      | 10,000    |
| Unstoppable Clicker | `clicks_unstoppable_clicker` | 100,000   |
| Cookie Machine      | `clicks_cookie_machine`      | 1,000,000 |

### Cookies

Reached when you have this many cookies at once.

| Achievement        | ID                           | Goal |
| ------------------ | ---------------------------- | ---- |
| First Batch        | `cookies_first_batch`        | 1K   |
| Cookie Connoisseur | `cookies_cookie_connoisseur` | 1M   |
| Cookie Collector   | `cookies_cookie_collector`   | 1B   |
| Cookie Hoarder     | `cookies_cookie_hoarder`     | 1T   |
| Cookie Overlord    | `cookies_cookie_overlord`    | 1Q   |

### Upgrades

Counts every upgrade level you buy.

| Achievement            | ID                                | Goal  |
| ---------------------- | --------------------------------- | ----- |
| Smart Shopper          | `upgrades_smart_shopper`          | 1     |
| Upgrade Master         | `upgrades_upgrade_master`         | 100   |
| Savvy Spender          | `upgrades_savvy_spender`          | 250   |
| Upgrade Enthusiast     | `upgrades_upgrade_enthusiast`     | 1,000 |
| Gotta Upgrade Them All | `upgrades_gotta_upgrade_them_all` | 5,000 |

### Prestige

Reached at a certain [prestige level](/cookieclickerz/gameplay/prestige).

| Achievement          | ID                             | Goal         |
| -------------------- | ------------------------------ | ------------ |
| Rebaked and Ready    | `prestige_rebaked_and_ready`   | Prestige I   |
| Twice as Tasty       | `prestige_twice_as_tasty`      | Prestige II  |
| Third Times a Charm  | `prestige_third_times_a_charm` | Prestige III |
| Oops, I Did It Again | `prestige_oops_i_did_it_again` | Prestige IV  |
| Eternal Oven         | `prestige_oven_eternal`        | Prestige V   |

### Events

Based on [events](/cookieclickerz/gameplay/events).

| Achievement     | ID                     | Goal                                      |
| --------------- | ---------------------- | ----------------------------------------- |
| Event Horizon   | `event_event_horizon`  | Get 150 events of any kind                |
| Not My Cookies! | `event_not_my_cookies` | Get 75 bad events (Ruin or Cursed Finger) |
| Sugar Rush      | `event_sugar_rush`     | Get 25 Cookie Frenzies                    |
| Money Magnet    | `event_money_magnet`   | Get more than 1M cookies from one Lucky   |
| Oof!            | `event_oof`            | Lose more than 1M cookies to one Ruin     |

## Rewarding achievements

You can run console commands when a player unlocks an achievement. Add them in `plugins/CookieClickerZ/achievements.yml` under the achievement's ID. `%player%` is replaced with the player's name.

```yaml
clicks_cookie_machine:
  commands:
    - "say %player% has earned the achievement Cookie Machine!"
    - "give %player% diamond 5"
```

The list of achievements itself is fixed, so you can't add new ones or change their goals.

## Changing names and icons

- The **names and descriptions** of achievements and categories are in the `achievements` and `achievementCategories` sections of your [language file](/cookieclickerz/config/messages).
- The **head textures** of the categories are in `achievementCategories.yml`. You can find texture values in the "For Developers" section on [minecraft-heads.com](https://minecraft-heads.com).

## Managing achievements

Admins can check or change a player's progress with [`/cc achievements`](/cookieclickerz/commands/cookieclicker#cc-achievements).
