---
title: Messages
description: Change any message or menu text, or add your own language
icon: MessageSquare
---

Every message, menu title and item text in CookieClickerZ comes from a language file in `plugins/CookieClickerZ/lang`. The plugin ships with these languages:

| Code    | Language |
| ------- | -------- |
| `en-US` | English  |
| `de-DE` | German   |
| `ru-RU` | Russian  |
| `cs-CZ` | Czech    |

Pick one with the `lang` option in the [`config.yml`](/cookieclickerz/config#general) and run `/cc reload`.

## Editing messages

Open the language file you're using, change the text and run `/cc reload`. For example, to change the message players get when they don't have enough cookies:

```yaml
notEnoughCookies: "&cYou need more %cookieName% for that!"
```

You can use legacy color codes like `&c` and [MiniMessage](https://docs.advntr.dev/minimessage/format.html) tags for HEX colors, gradients, and hover or click events.

### Placeholders in every message

| Placeholder    | Replaced with                                                   |
| -------------- | --------------------------------------------------------------- |
| `%ac%`         | The accent color, set with `accentColor` at the top of the file |
| `%cookieName%` | The `cookieName` from the `config.yml`                          |

Many messages also have their own placeholders, like `%player%` or `%amount%`. The default text of each message shows which ones it supports.

### Accent color and prefix

The first lines of each language file set the look of all messages:

```yaml
accentColor: "<#D2691E>"
prefix: "&8[%ac%CookieClickerZ&8]"
```

Change `accentColor` to recolor the whole plugin at once.

## What's in a language file

| Section                 | Contains                                                                            |
| ----------------------- | ----------------------------------------------------------------------------------- |
| Top-level keys          | Chat messages, like errors and command confirmations                                |
| `numCheatSheet`         | The output of [`/cc numbers`](/cookieclickerz/commands/cookieclicker#cc-numbers)    |
| `eventMessages`         | Messages for when [events](/cookieclickerz/gameplay/events) start and end           |
| `clickerHologram`       | The [hologram](/cookieclickerz/integrations/holograms) text above clickers          |
| `inventories`           | Titles and item texts of all menus                                                  |
| `achievementCategories` | Names of the achievement categories                                                 |
| `achievements`          | Names and descriptions of all [achievements](/cookieclickerz/gameplay/achievements) |

## Adding a language

::::steps

### Copy a language file

Copy `en-US.yml` in the `lang` folder and give it a new name, for example `fr-FR.yml`.

### Translate it

Translate the texts in your new file. Keep the keys (the part before the `:`) and placeholders like `%player%` unchanged.

### Use it

Set `lang: "fr-FR"` in the `config.yml` and run `/cc reload`.

::::

If the language file set in the config doesn't exist, CookieClickerZ falls back to `en-US`.

:::tip[Share your translation]
CookieClickerZ is translated by the community on [Twoglot](https://twoglot.com/@KartoffelChipss/cookieclickerz). If you translate it into a new language, consider adding it there so everyone can use it. See [Localization](/localization).
:::

:::note
After updating CookieClickerZ, new messages might be missing from your language file. The plugin then uses the English text for those. Compare your file with the [latest en-US.yml](https://github.com/ZetaPlugins/CookieClickerZ/blob/main/src/main/resources/lang/en-US.yml) to add them.
:::
