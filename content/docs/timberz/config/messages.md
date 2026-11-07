---
title: Messages
description: Change any TimberZ message or add your own language
icon: MessageSquare
---

All messages in TimberZ come from a language file in `plugins/TimberZ/lang`. The plugin ships with these languages:

| Code    | Language |
| ------- | -------- |
| `en-US` | English  |
| `de-DE` | German   |
| `pl-PL` | Polish   |
| `ru-RU` | Russian  |

Pick one with the `lang` option in the [`config.yml`](/timberz/config#general) and run `/timberz reload`.

## Editing messages

Open the language file you're using, change the text and run `/timberz reload`:

```yaml
timberModeOn: "&7Timber: &aON&7"
timberModeOff: "&7Timber: &cOFF&7"
notEnoughDurability: "&cYour axe is about to break!"
```

You can use legacy color codes like `&c` and [MiniMessage](https://docs.advntr.dev/minimessage/format.html) tags for HEX colors, gradients, and hover or click events. `%ac%` is replaced with the `accentColor` from the `config.yml`.

| Key                         | Shown when…                                                          |
| --------------------------- | -------------------------------------------------------------------- |
| `prefix`                    | Put in front of most chat messages                                   |
| `timberModeOn`              | Timber mode is on (action bar)                                       |
| `timberModeOff`             | Timber mode is turned off (action bar)                               |
| `notEnoughDurability`       | The axe doesn't have enough durability to fell the tree              |
| `noTimberInThisRegion`      | A WorldGuard region denies timber (needs `messageOnRegionViolation`) |
| `cannotDragAxesIntoOffHand` | A player tries to move an axe into their offhand                     |
| `help`                      | `/timberz help` is run                                               |
| `versionMsg`                | `/timberz` is run                                                    |
| `reloadMsg`                 | The plugin was reloaded                                              |
| `newVersionAvailable`       | An operator joins and an update is available                         |
| `noPermissionError`         | A player lacks permission for a command                              |
| `playerOnlyCommand`         | The console runs a player-only command                               |
| `usageError`                | A command is used incorrectly                                        |

## Adding a language

::::steps

### Copy a language file

Copy `en-US.yml` in the `lang` folder and give it a new name, for example `fr-FR.yml`.

### Translate it

Translate the texts in your new file. Keep the keys (the part before the `:`) and placeholders like `%version%` unchanged.

### Use it

Set `lang: "fr-FR"` in the `config.yml` and run `/timberz reload`.

::::

If the language file set in the config doesn't exist, TimberZ falls back to `en-US`.

:::tip[Share your translation]
TimberZ is translated by the community on [Twoglot](https://twoglot.com/@KartoffelChipss/timberz). If you translate it into a new language, consider adding it there so everyone can use it. See [Localization](/localization).
:::
