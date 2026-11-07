---
title: Guide Overview
description: A walkthrough of the core ZetaCore APIs and how they fit together in a plugin.
---

This section splits the framework into focused pages so you can read the parts you need in order.

Start here if you want the full flow from plugin startup to features:

- [Plugin Base](plugin-base)
- [Dependency Injection](dependency-injection)
- [Command Registration](commands)
- [Event Registration](events)
- [Config Parsing](config)
- [Messaging](messaging)
- [PlaceholderAPI Integration](papi)
- [Update Checker](update-checker)
- [Permission Registration](permissions)

A typical plugin starts by extending `ZetaCorePlugin`, building a `ServiceRegistry`, then registering commands, listeners, config services, messages, and permissions from that shared context.
