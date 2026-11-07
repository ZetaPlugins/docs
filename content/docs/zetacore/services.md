---
title: Services
description: Share logic and state between classes without passing your main class around.
icon: Boxes
---

## Overview

Shared components, such as a home storage used by a command, a listener and a PlaceholderAPI expansion, are commonly exposed through getters on the main class or through static fields. Both approaches couple every class to the main class and make the code harder to maintain.

With ZetaCore, you mark the shared class as a **service** and declare it as a dependency wherever it is needed.

## Creating a service

```java
@Service
public class HomeService {
    private final Map<UUID, Map<String, Location>> homes = new HashMap<>();

    public void setHome(Player player, String name) {
        homes.computeIfAbsent(player.getUniqueId(), id -> new HashMap<>())
             .put(name, player.getLocation());
    }

    public Optional<Location> getHome(Player player, String name) {
        return Optional.ofNullable(homes.getOrDefault(player.getUniqueId(), Map.of()).get(name));
    }
}
```

## Using a service

Declare it as a constructor parameter:

```java
@Command("home")
public class HomeCommand extends PluginCommand<MyPlugin> {
    private final HomeService homes;

    public HomeCommand(MyPlugin plugin, HomeService homes) {
        super(plugin);
        this.homes = homes;
    }
    // ...
}
```

```java
@EventListener
public class DeathListener implements Listener {
    private final HomeService homes;

    public DeathListener(HomeService homes) {
        this.homes = homes;
    }
    // ...
}
```

Both receive the **same** `HomeService` instance. Services are singletons, created the first time they are requested.

Services can depend on other services in the same way:

```java
@Service
public class TeleportService {
    private final HomeService homes;
    private final MainConfig config;

    public TeleportService(HomeService homes, MainConfig config) {
        this.homes = homes;
        this.config = config;
    }
}
```

## Constructor and field injection

Both styles are supported:

```java
// constructor injection
@Service
public class TeleportService {
    private final HomeService homes;

    public TeleportService(HomeService homes) {
        this.homes = homes;
    }
}
```

```java
// field injection
@Service
public class TeleportService {
    @Inject
    private HomeService homes;
}
```

Constructor injection allows `final` fields and makes dependencies explicit. Field injection is more concise.

If a class has **more than one constructor**, annotate the one ZetaCore should use with `@Inject`. With a single constructor, no annotation is needed.

## Built-in injectable types

The following types are always available without registration:

| Type                                 | What you get                                         |
| ------------------------------------ | ---------------------------------------------------- |
| `MyPlugin` / `JavaPlugin` / `Plugin` | your plugin instance                                 |
| `java.util.logging.Logger`           | your plugin's logger                                 |
| any `@ConfigFile` class              | the parsed config (see [config](config))             |
| `ConfigService`                      | load, save and reload config files                   |
| any `@Service` class                 | that service                                         |
| anything from a `@Bean` method       | that object (see [below](#third-party-objects-bean)) |
| `ServiceRegistry`                    | the DI container itself, for advanced use cases      |

## Lifecycle callbacks

`@PostConstruct` methods run after the service is created and its dependencies are injected. `@PreDestroy` methods run when the plugin is disabled.

```java
@Service(eagerlyLoad = true)
public class DatabaseService {
    private final MainConfig config;
    private final Logger logger;
    private Connection connection;

    public DatabaseService(MainConfig config, Logger logger) {
        this.config = config;
        this.logger = logger;
    }

    @PostConstruct
    void connect() throws SQLException {
        connection = DriverManager.getConnection(config.databaseUrl);
        logger.info("Connected to the database");
    }

    @PreDestroy
    void disconnect() throws SQLException {
        connection.close();
    }

    public Connection connection() {
        return connection;
    }
}
```

Notes:

- If a class implements `AutoCloseable`, `close()` is called automatically on shutdown.
- Shutdown happens in **reverse** creation order, so a service is stopped before its dependencies.
- If a `@PostConstruct` method throws during startup, the error is logged and the plugin is disabled, for example when the database is unreachable.
- Errors in `@PreDestroy` methods are logged, and the remaining services are still shut down.

### When services are created

By default, services are created **lazily**, when first requested. Because commands and listeners are created on startup, their dependencies are created on startup as well.

If a service must run even when nothing depends on it (for example, to start a repeating task or open a connection), use `@Service(eagerlyLoad = true)` to create it on startup.

## Third-party objects (`@Bean`)

Classes you do not own (such as Gson, a HikariCP pool or an HTTP client), objects that require setup logic, and implementations selected at runtime cannot use `@Service`. Provide them through `@Bean` methods in a `@Configuration` class:

```java
@Configuration
public class Beans {
    @Bean
    public Gson gson() {
        return new GsonBuilder().setPrettyPrinting().create();
    }

    @Bean
    public Storage storage(StorageConfig config, JavaPlugin plugin) {
        return switch (config.type) {
            case "mysql" -> new MySqlStorage(config);
            default -> new SqliteStorage(plugin.getDataFolder());
        };
    }
}
```

`Gson` and `Storage` can now be injected anywhere:

```java
@Service
public class StatsService {
    public StatsService(Storage storage, Gson gson) { ... }
}
```

- A bean is registered under the method's **return type**. Returning the `Storage` interface makes the bean injectable as `Storage`.
- Bean method parameters are injected like constructor parameters.
- Beans are singletons, created lazily. Use `@Bean(eagerlyLoad = true)` for startup.
- The returned object receives field injection and `@PostConstruct` calls, and `@PreDestroy` / `close()` are called on shutdown. If `Storage` implements `AutoCloseable`, it is closed automatically.

:::warning
In ZetaCore 3.0.0, ZetaCore's own `Messenger`, `LocalizationService` and `UpdateChecker` types cannot be provided through `@Bean`; startup fails with `Multiple providers for ...`. Subclass them as your own `@Service` instead. See [messages](messages#setup) and [update checks](updates-and-metrics).
:::

## Interfaces and multiple implementations

An interface can be injected when exactly **one** `@Service` implements it:

```java
public interface EconomyService {
    double getBalance(OfflinePlayer player);
}

@Service
public class BuiltinEconomy implements EconomyService { ... }

// elsewhere:
public ShopCommand(MyPlugin plugin, EconomyService economy) { ... } // gets BuiltinEconomy
```

If **several** implementations are active, ZetaCore cannot choose one and startup fails. There are two ways to resolve this:

**Only one implementation is active at a time**, for example Vault when installed and a built-in economy otherwise. Use [conditions](conditions):

```java
@Service
@ConditionalOnPlugin("Vault")
public class VaultEconomy implements EconomyService { ... }

@Service
@ConditionalOnMissingPlugin("Vault")
public class BuiltinEconomy implements EconomyService { ... }
```

**All implementations are active and one is the default.** Mark the default with `binds`:

```java
@Service(binds = EconomyService.class)
public class BuiltinEconomy implements EconomyService { ... }
```

## Prototype scope

```java
@Service(scope = ServiceScope.PROTOTYPE)
public class Countdown { ... }
```

Each injection point receives a new `Countdown` instance. Prototype services are not tracked, so `@PreDestroy` is not called on them.

## Creating objects manually

Objects created at runtime, such as a GUI per player or a game per arena, can still receive services:

```java
// let ZetaCore build it, with constructor + field injection
ArenaGame game = serviceRegistry.create(ArenaGame.class);

// or create it yourself and inject only the @Inject fields
ArenaGame game = new ArenaGame(arena);
serviceRegistry.injectServices(game);
```

`create` does not register the object as a singleton; each call returns a new instance.

## Accessing services from outside

Code outside the DI system, such as static utilities or a public API for other plugins, can access services through the plugin:

```java
MyPlugin plugin = JavaPlugin.getPlugin(MyPlugin.class);
HomeService homes = plugin.getServiceRegistry().getOrCreate(HomeService.class);
```

Use this sparingly. Classes created by ZetaCore should declare their dependencies in the constructor instead.

## Rules and limitations

- **Dependencies must be services.** Requesting a class that is not a `@Service`, `@Bean`, `@ConfigFile` or built-in type fails with `... is not annotated with @Service`. Commands and listeners themselves do not need `@Service`; only their dependencies do. To allow injecting unannotated classes, set `@ZetaPlugin(requireServiceAnnotation = false)`.
- **No circular dependencies.** If A depends on B and B depends on A, startup fails with `Circular dependency detected`. Move the shared logic into a third service.
- **Primitives cannot be injected.** Instead of `public MyService(int maxHomes)`, inject your config class and read `config.maxHomes`.
- **Services must be inside your plugin's package** to be discovered.
