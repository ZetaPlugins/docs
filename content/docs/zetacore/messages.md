---
title: Messages & translations
description: Send prefixed, colored, translatable messages with placeholders.
icon: MessageSquare
---

ZetaCore's messaging system provides:

- messages in language files (`lang/en-US.yml`, `lang/de-DE.yml`...), picked with `lang:` in `config.yml`
- [MiniMessage](https://docs.advntr.dev/minimessage/format.html) **and** old `&a` color codes, in the same string
- a configurable prefix and accent color
- placeholders like `%player%`
- fallback texts in code, used when a key is missing

## Setup

Messaging requires two small classes. Copy them and adjust the list of languages.

```java title="Lang.java"
import com.zetaplugins.zetacore.di.annotation.Service;
import com.zetaplugins.zetacore.messaging.localization.BukkitLocalizationService;
import com.zetaplugins.zetacore.messaging.localization.LocalizationService;
import org.bukkit.plugin.java.JavaPlugin;

import java.util.List;

@Service
public class Lang implements LocalizationService {
    private final BukkitLocalizationService delegate;

    public Lang(JavaPlugin plugin) {
        this.delegate = new BukkitLocalizationService.Builder()
                .withPlugin(plugin)
                .withPossibleLangs(List.of("en-US", "de-DE")) // every file you ship in resources/lang/
                .build();
    }

    public void reload() {
        delegate.reload();
    }

    @Override
    public String getString(String key) {
        return delegate.getString(key);
    }

    @Override
    public String getString(String key, String fallback) {
        return delegate.getString(key, fallback);
    }

    @Override
    public List<String> getStringList(String key) {
        return delegate.getStringList(key);
    }
}
```

```java title="Messages.java"
import com.zetaplugins.zetacore.di.annotation.Service;
import com.zetaplugins.zetacore.messaging.AdventureMessenger;

@Service
public class Messages extends AdventureMessenger {
    public Messages(Lang lang) {
        super(lang);
    }
}
```

Inject **`Messages`** wherever you need to send messages.

:::note[Why wrapper classes are needed]
ZetaCore's own `Messenger` and `LocalizationService` implementations are not discovered when your plugin is scanned, and in 3.0.0 they cannot be provided through `@Bean`. Declaring your own `@Service` subclasses is the supported approach. Inject `Messages`, **not** the `Messenger` interface.
:::

### The files

```yaml title="config.yml"
lang: en-US
```

:::files

- src/main/resources/
    - config.yml
    - lang/
        - en-US.yml
        - de-DE.yml

:::

```yaml title="lang/en-US.yml"
prefix: "<dark_gray>[<gradient:#00D26A:#00B24F>MyPlugin</gradient><dark_gray>]"
accentColor: "<#00D26A>"

fed: "<green>You have been fed!"
fedOther: "<gray>You fed %ac%%player%<gray>."
noPermission: "&cYou can't do that."
help:
  - "%ac%<bold>MyPlugin help"
  - "<gray>/feed [player] <dark_gray>- fill up hunger"
  - "<gray>/home <name> <dark_gray>- teleport home"
```

On first start, every language listed in `withPossibleLangs` is copied to `plugins/MyPlugin/lang/`, where server owners can edit it. The language set by `lang:` is used, with `en-US` as the fallback.

:::warning
Always define `prefix` in your language files. Otherwise a generic default prefix is used that does not contain your plugin's name.
:::

## Sending messages

```java
// with prefix, by key, with a fallback if the key is missing
messages.send(sender, true, "fed", "<green>You have been fed!");

// with placeholders
messages.send(sender, true, "fedOther", "<gray>You fed %ac%%player%<gray>.",
        new Replaceable<>("%player%", target.getName()));

// several placeholders. Values can be anything; toString() is used
messages.send(sender, true, "balance", "Balance: %amount% %currency%",
        new Replaceable<>("%amount%", 42.5),
        new Replaceable<>("%currency%", "coins"));

// without prefix
messages.send(sender, false, "fed", "<green>You have been fed!");

// a list of lines (no prefix)
messages.sendList(sender, "help");

// a one-off string that isn't in the lang file
messages.sendRaw(sender, "%ac%Debug: <gray>%value%", new Replaceable<>("%value%", x));
```

The arguments of `send` are `(recipient, addPrefix, key, fallback, placeholders...)`. The recipient can be any `CommandSender`, including the console.

### Formatting reference

| Syntax                                           | Result                                             |
| ------------------------------------------------ | -------------------------------------------------- |
| `<red>`, `<bold>`, `<#ff8800>`, `<gradient:...>` | MiniMessage tags                                   |
| `&a`, `&l`, `&r`...                              | converted to MiniMessage; both styles can be mixed |
| `%ac%`                                           | the `accentColor` from the lang file               |
| `%whatever%`                                     | replaced by your `Replaceable("%whatever%", ...)`  |

Italics are disabled by default, so item names and lore are not rendered in italics.

:::tip
A leading `messages.` in keys is stripped, so `send(..., "messages.fed", ...)` and `send(..., "fed", ...)` read the same key. This simplifies migrating older plugins.
:::

## Reloading translations

`ConfigService.reload()` does not reload language files. Reload both in your reload command:

```java
configService.reload();
lang.reload();
```

`lang.reload()` also re-reads the `lang:` option, so the language can be changed without a restart.

## Legacy strings

`AdventureMessenger` sends Adventure components, which is recommended on Paper. If you need legacy `§` strings, extend `LegacyMessenger` in your `Messages` class instead. The API is the same.

## Reading translated strings

To read a string without sending it, inject `Lang` and call it directly:

```java
String title = lang.getString("guiTitle", "My GUI");
```

Convert the result with MiniMessage as needed, for example for item names or inventory titles.
