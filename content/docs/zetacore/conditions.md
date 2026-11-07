---
title: Optional features
description: Only load services, commands and listeners when another plugin is installed or a config option is on.
icon: ToggleRight
---

Optional integrations, such as hooking into WorldGuard only when it is installed, usually require manual plugin checks and careful class loading to avoid `NoClassDefFoundError`.

With ZetaCore, you annotate the class instead. If the condition is not met, the class is ignored entirely.

## Depending on another plugin

```java
@EventListener
@ConditionalOnPlugin("WorldGuard")
public class RegionEnterListener implements Listener { ... }
```

```java
@Command("claim")
@ConditionalOnPlugin({"WorldGuard", "WorldEdit"}) // needs both
public class ClaimCommand extends PluginCommand<MyPlugin> { ... }
```

The inverse is also available:

```java
@Service
@ConditionalOnMissingPlugin("Vault")
public class BuiltinEconomy implements EconomyService { ... }
```

:::warning[Add them to `softdepend`]
Conditions check whether a plugin is loaded **when your plugin starts**. If the other plugin loads later, it is treated as missing. List every plugin you check in `plugin.yml`:

```yaml
softdepend: [WorldGuard, WorldEdit, Vault]
```

:::

## Custom conditions

Implement `Condition`. Like other managed classes, it can declare services and config classes as constructor parameters:

```java
public class EconomyEnabled implements Condition {
    private final MainConfig config;

    public EconomyEnabled(MainConfig config) {
        this.config = config;
    }

    @Override
    public boolean matches() {
        return config.economy.enabled;
    }
}
```

```java
@Command({"balance", "pay"})
@Conditional(EconomyEnabled.class)
public class EconomyCommands extends PluginCommand<MyPlugin> { ... }
```

Each condition is evaluated once on startup and the result is cached. Changing the underlying option requires a restart; reloading the config does not register or unregister components.

## Supported targets

Conditions can be placed on `@Service`, `@Command`, `@EventListener` and `@Configuration` classes, and on individual `@Bean` methods.

Conditions can be combined. `@ConditionalOnPlugin("Vault")` together with `@Conditional(EconomyEnabled.class)` requires both to match.

## Switching implementations

The most common use of conditions is to select one of several implementations of an interface, with exactly one active at a time:

```java
public interface EconomyService {
    double getBalance(OfflinePlayer player);
    void withdraw(OfflinePlayer player, double amount);
}
```

```java
@Service
@ConditionalOnPlugin("Vault")
public class VaultEconomy implements EconomyService {
    // talks to Vault
}
```

```java
@Service
@ConditionalOnMissingPlugin("Vault")
public class BuiltinEconomy implements EconomyService {
    // your own simple storage
}
```

Other classes depend on `EconomyService` without knowing which implementation is active:

```java
public ShopCommand(MyPlugin plugin, EconomyService economy) { ... }
```

The same approach works with `@Bean` methods:

```java
@Configuration
public class EconomyBeans {
    @Bean
    @ConditionalOnPlugin("Vault")
    public EconomyService vault() { return new VaultEconomy(); }

    @Bean
    @ConditionalOnMissingPlugin("Vault")
    public EconomyService builtin(Storage storage) { return new BuiltinEconomy(storage); }
}
```

## Injecting inactive services

If a class depends on a service whose condition is not met, startup fails with an error such as:

```text
VaultEconomy is inactive because @ConditionalOnPlugin("Vault") is not met
```

Classes that depend on an optional service should therefore use the same condition, or depend on an interface that always has an active implementation, as shown above.
