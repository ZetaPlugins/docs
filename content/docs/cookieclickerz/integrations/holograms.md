---
title: Holograms
description: Show a floating text above every clicker block
icon: Type
---

CookieClickerZ can place a hologram above every clicker block so players know what it is. This needs one of these plugins:

- [DecentHolograms](https://modrinth.com/plugin/decentholograms)
- [FancyHolograms](https://modrinth.com/plugin/fancyholograms)

If both are installed, FancyHolograms is used. Holograms are created automatically for all clickers when the server starts and whenever you add a clicker.

## Turning holograms on or off

Holograms are on by default. To turn them off, set this in your `config.yml`:

```yaml
hologram: false
```

## Changing the text

The hologram text is in your [language file](/cookieclickerz/config/messages), not in the `config.yml`:

```yaml
clickerHologram:
  - "%ac%&l🍪 Cookie Clicker 🍪"
  - "&7Click to get %cookieName%!"
clickerHologramOffset: 2.0
```

| Option                  | Description                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| `clickerHologram`       | The lines of the hologram, from top to bottom. Supports color codes, MiniMessage, `%ac%` and `%cookieName%`. |
| `clickerHologramOffset` | How high above the clicker block the hologram floats, in blocks.                                             |

Changes to the text are applied after a server restart.

:::tip[Leaderboard holograms]
To show a leaderboard next to your clicker, create a separate hologram with your hologram plugin and use the [leaderboard placeholders](/cookieclickerz/integrations/placeholderapi#leaderboard).
:::
