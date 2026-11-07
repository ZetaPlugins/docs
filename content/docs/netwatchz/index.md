---
title: NetwatchZ
description: Keep bots and unwanted connections off your server.
icon: Shield
---

NetwatchZ checks every player's IP address when they connect, and turns them away if the connection comes from a blocked IP, a blocked country or a VPN. It runs on **Spigot**, **Paper** and **Velocity**, so you can protect a single server or a whole network from the proxy.

## How it works

When a player connects, NetwatchZ can run three independent checks:

1. **IP lists**: the address is compared against IP and CIDR lists, used as a blacklist or a whitelist. Lists can be downloaded from a URL and refreshed automatically. A public VPN list is set up by default.
2. **Geoblocking**: the address is looked up (with GeoLite2, ip-api.com, ipwhois.app or your own service) and blocked or allowed by country.
3. **VPN detection**: an online service like vpnapi.io or proxycheck.io checks whether the address belongs to a VPN or proxy.

Only the IP list check is enabled by default. Operators are always let through unless you turn this off, so you can't lock yourself out.

## Features

- IP blacklists and whitelists, from files or fetched from a URL
- Geoblocking by country, as a blacklist or whitelist
- VPN and proxy blocking
- Any IP information service can be configured
- Automatic download and refresh of the GeoLite2 database
- Support for Spigot, Paper and Velocity

## Getting started

::::cards
:::card{href="/netwatchz/installation" title="Installation" icon="Download"}
Install NetwatchZ on your server or proxy.
:::
::::

## Resources

::::cards
:::card{href="https://modrinth.com/plugin/netwatchz" title="Modrinth" icon="Modrinth"}
Download the latest version.
:::

:::card{href="https://strassburger.org/discord" title="Support Discord" icon="Discord"}
Ask questions in #support or open a ticket.
:::

:::card{href="https://github.com/ZetaPlugins/NetwatchZ" title="GitHub" icon="GitHub"}
Source code, issues and feature requests.
:::

:::card{href="https://bstats.org/plugin/bukkit/NetwatchZ/27376" title="bStats" icon="ChartColumn"}
Usage statistics across all servers.
:::
::::
