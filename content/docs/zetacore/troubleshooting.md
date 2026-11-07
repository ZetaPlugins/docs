---
title: Troubleshooting
description: What the common ZetaCore errors mean and how to fix them.
icon: Bug
---

If an error occurs during startup, ZetaCore logs `Failed to enable MyPlugin, disabling plugin.` followed by the underlying exception. Find the **last "Caused by"** line and look up the message below.

## Startup errors

### `... is not annotated with @Service`

A constructor parameter or `@Inject` field has a type that ZetaCore cannot provide.

**Fix:** annotate the class with `@Service`. For classes you do not own, provide a [`@Bean`](services#third-party-objects-bean). Config classes require `@ConfigFile`.

### `No active @Service implementation found for SomeInterface`

An interface was requested, but no active `@Service` in your plugin implements it, or all implementations are disabled by a [condition](conditions).

**Fix:** add a `@Service` implementation, or check why its condition is not met (inactive implementations are listed in the message). For `Messenger` or `LocalizationService`, see the next entry.

### `No active @Service implementation found for ...Messenger` / `...LocalizationService`

ZetaCore's `Messenger` interface was injected directly.

**Fix:** follow the [messages setup](messages#setup) and inject your own `Messages` class instead.

### `Multiple providers for ...Messenger: @Service ... and @Bean ...`

`Messenger`, `LocalizationService` or `UpdateChecker` was provided through a `@Bean` method, which is not supported in 3.0.0.

**Fix:** subclass the type as your own `@Service` class. See [messages](messages#setup) and [update checks](updates-and-metrics).

### `Multiple @Service implementations found for SomeInterface: [A, B]`

More than one active service implements the requested interface.

**Fix:** use [conditions](conditions) so only one is active, or mark the default one with `@Service(binds = SomeInterface.class)`.

### `Multiple providers for X: ... and ...`

The same type is provided more than once, for example by two `@Bean` methods or by a `@Bean` and a `@Service`.

**Fix:** remove one provider, or use mutually exclusive [conditions](conditions).

### `Circular dependency detected: [...] -> X`

Two or more classes depend on each other. The message shows the dependency chain.

**Fix:** move the shared logic into a separate service. Alternatively, if one class only needs the other after construction, inject the `ServiceRegistry` and resolve it later with `registry.getOrCreate(Other.class)`.

### `Cannot inject primitive parameter of type int`

A constructor has a primitive parameter, such as `public MyService(int max)`.

**Fix:** inject your config class and read the value from it.

### `No suitable constructor found` / `has multiple @Inject constructors`

The class has several constructors and ZetaCore cannot determine which one to use.

**Fix:** put `@Inject` on exactly one of them, or leave the class with a single constructor.

### `X is inactive because @ConditionalOnPlugin("...") is not met`

A class depends on a service that is disabled by a condition.

**Fix:** apply the same condition to the dependent class, or depend on an interface that always has an active implementation. See [conditions](conditions#injecting-inactive-services).

### `Failed to map configuration to class ...`

A config value does not match its field type, for example text in an `int` field or an unknown enum constant.

**Fix:** the "Caused by" line names the field. Correct the YAML value or the field type. See [config](config#rules).

### `The embedded resource 'xyz.yml' cannot be found`

A file referenced by `@ConfigFile("xyz.yml")`, or a language file, is missing from your jar.

**Fix:** add it under `src/main/resources/` with the same path and name.

### `NoClassDefFoundError: com/zetaplugins/zetacore/...`

ZetaCore is not included in your jar.

**Fix:** use `compile` / `implementation` scope and the shade/shadow plugin. See [setup](setup).

## Other common problems

### A command or listener is not registered

- Is it inside your main class's package or a sub-package? Only that package is scanned.
- Is it annotated with `@Command` or `@EventListener`?
- Does the class extend `PluginCommand` (or implement `CommandExecutor`) / implement `Listener`?
- Does it have a condition that is not met?
- Is a `CommandRegistrationCustomizer` filtering it out?
- Check the console. Failures for individual commands or listeners are logged (for example `Failed to register command: X`) without disabling the plugin.

The startup line (`Enabled with N services, N commands, N listeners...`) shows how many components were registered.

### A command does nothing

The command most likely threw a `CommandException` without a registered handler, or returned `false`. See [error handling](commands#error-handling).

### Messages show the wrong prefix

Define `prefix:` in your language files. See [messages](messages#the-files).

### Config changes are not applied after a reload

Values copied into your own fields (`this.max = config.max`) are not updated. Read from the config object instead, which is updated in place. Language files must be reloaded separately with `lang.reload()`.

### `onEnable()` cannot be overridden

`onEnable()` is `final` in `ZetaCorePlugin`. Override `onStartup()` and `onShutdown()`, or use a service with `@PostConstruct` / `@PreDestroy`. See [your first plugin](first-plugin#running-code-on-startup-or-shutdown).

## Using ZetaCore without `ZetaCorePlugin`

All components can be used independently if you need to keep your own `onEnable`. In that case, wire them up manually:

```java
public final class MyPlugin extends JavaPlugin {
    private ServiceRegistry services;

    @Override
    public void onEnable() {
        services = new ServiceRegistry.Builder()
                .withPlugin(this)
                .withRequireServiceAnnotation(true)
                .build();

        ConfigService configService = new ConfigService(this);
        services.registerInstance(configService);
        services.addResolver(configService.asResolver()); // lets you inject @ConfigFile classes

        services.registerConfigurations();   // @Configuration / @Bean
        services.initializeEagerServices();  // @Service(eagerlyLoad = true)

        PermissionRegistrar.registerAll(PermissionRegistrar.discover(services.getClassScanner()));

        new AutoCommandRegistrar.Builder()
                .withPlugin(this)
                .withServiceRegistry(services)
                .build()
                .registerAllCommands();

        new AutoEventListenerRegistrar.Builder()
                .withPlugin(this)
                .withServiceRegistry(services)
                .build()
                .registerAllListeners();
    }

    @Override
    public void onDisable() {
        if (services != null) services.shutdown(); // @PreDestroy / close()
    }
}
```

This covers most of what `ZetaCorePlugin` does, except PlaceholderAPI, bStats and update checks. Extending `ZetaCorePlugin` is recommended for most plugins.
