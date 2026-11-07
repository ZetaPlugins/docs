---
title: PlaceholderAPI
description: Show cookies, prestige and leaderboards in other plugins
icon: Braces
---

If [PlaceholderAPI](https://modrinth.com/plugin/placeholderapi) is installed, CookieClickerZ registers its placeholders automatically. You can use them in any plugin that supports PlaceholderAPI, like scoreboards, tab lists, chat or holograms.

## Player placeholders

These show the stats of the player viewing them.

| Placeholder                               | Description                           | Example   |
| ----------------------------------------- | ------------------------------------- | --------- |
| `%cookieclickerz_name%`                   | The player's name                     | `Steve`   |
| `%cookieclickerz_totalcookies%`           | The player's cookies as a full number | `1250000` |
| `%cookieclickerz_totalcookies_formatted%` | The player's cookies, shortened       | `1.25M`   |
| `%cookieclickerz_cookiesperclick%`        | Cookies per click, shortened          | `512`     |
| `%cookieclickerz_offlinecookies%`         | Offline cookies per minute, shortened | `2.4K`    |
| `%cookieclickerz_prestige%`               | The player's prestige level           | `3`       |
| `%cookieclickerz_totalclicks%`            | How often the player has clicked      | `48210`   |

Cookies per click doesn't include the prestige multiplier.

## Leaderboard

Leaderboard placeholders show the top players in a category:

```plaintext
%cookieclickerz_<category>_top_<position>_<field>%
```

| Part         | Options                                                                                                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `<category>` | `cookies` (or `totalcookies`), `cpc` (or `cookiesperclick`), `offlinecookies`, `prestige`, `totalclicks`                          |
| `<position>` | The rank, starting at `1`. Can't be higher than the leaderboard `size` in the [`config.yml`](/cookieclickerz/config#leaderboard). |
| `<field>`    | `name` for the player name, `amount` for the full number, `formattedamount` for the shortened number                              |

If there is no player at that position yet, the placeholder shows `N/A`.

### Examples

| Placeholder                                      | Shows                                      |
| ------------------------------------------------ | ------------------------------------------ |
| `%cookieclickerz_cookies_top_1_name%`            | The player with the most cookies           |
| `%cookieclickerz_cookies_top_1_formattedamount%` | Their cookies, for example `4.2B`          |
| `%cookieclickerz_prestige_top_3_name%`           | The player with the third-highest prestige |
| `%cookieclickerz_totalclicks_top_2_amount%`      | The second-highest click count             |

:::note
Leaderboard placeholders only update when the leaderboard is recalculated, every 60 seconds by default. They need the leaderboard to be enabled in the config.
:::
