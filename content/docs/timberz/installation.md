---
title: Installation
description: Install TimberZ on your Paper server
icon: Download
---

## Requirements

- A **Paper** server or a fork of it, like Purpur. Spigot and Bukkit are not supported.
- Minecraft **1.21.4** or newer
- Java 21

::::steps

### Download the Plugin

To install TimberZ on your server, you first need to download the latest version of TimberZ from a trusted platform such as [Modrinth](https://modrinth.com/plugin/timberz/versions), or any other **official** platform.

:::warning
**Be alert:** This plugin is only available on its official [GitHub](https://github.com/ZetaPlugins/TimberZ) and [Modrinth](https://modrinth.com/plugin/timberz) pages. Any versions found on third-party sites like 9Minecraft.net are **unauthorized and may contain malware**. Always download from official sources to stay safe.
:::

There are two files for every release. Pick the one that matches your server version:

| File                           | Minecraft versions |
| ------------------------------ | ------------------ |
| `TimberZ-<version>-1.21.4.jar` | 1.21.4 – 1.21.8    |
| `TimberZ-<version>-1.21.9.jar` | 1.21.9 and newer   |

### Upload

After downloading the `.jar` file, upload it to the `plugins` directory of your server. If your host provides you with a panel, this directory is often found under a section named `Files` or `File Manager`.

### Finalizing

Restart the server so TimberZ can load. A full restart is required, because TimberZ registers its [Timber enchantment](/timberz/guide/enchantment) while the server starts. `/reload` or plugin managers won't work.

If you want to check that TimberZ is installed correctly, you can either try to use the `/timberz` command or use `/pl` and check if TimberZ is green.

If either of these commands fail, or provide an error, seek [_support_](https://strassburger.org/discord)!
::::

Next, read [Getting Started](/timberz/getting_started) to cut down your first tree.
