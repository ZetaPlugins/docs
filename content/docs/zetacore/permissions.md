---
title: Permissions
description: Define your permission nodes in code and have them registered automatically.
icon: ShieldCheck
---

Permissions can still be declared in `plugin.yml`. Alternatively, define them in code as constants with defaults and descriptions, and ZetaCore registers them on startup.

## Defining permissions

Create a class annotated with `@PermissionHolder` that contains `static` `Permission` fields:

```java title="Perms.java"
import com.zetaplugins.zetacore.permission.Permission;
import com.zetaplugins.zetacore.permission.PermissionHolder;
import org.bukkit.permissions.PermissionDefault;

@PermissionHolder
public final class Perms {
    public static final Permission FEED = new Permission("myplugin.feed", PermissionDefault.TRUE, "Use /feed");
    public static final Permission FEED_OTHERS = FEED.child("others", PermissionDefault.OP); // myplugin.feed.others

    public static final Permission ADMIN = new Permission("myplugin.admin", PermissionDefault.OP, "Administrative commands");
    public static final Permission RELOAD = ADMIN.child("reload");                          // myplugin.admin.reload

    private Perms() {}
}
```

These permissions are registered on startup. Permissions that already exist, for example from `plugin.yml`, are left unchanged.

- `new Permission("node")` defaults to `PermissionDefault.OP` with no description.
- `.child("x")` appends `.x` and copies the parent's default and description, unless you pass new ones.

:::warning[Imports]
ZetaCore has two types named `Permission`: `com.zetaplugins.zetacore.permission.Permission` (the node class shown here) and `com.zetaplugins.zetacore.command.annotation.Permission` (the command annotation). Bukkit also has `org.bukkit.permissions.Permission`. If you use more than one in the same file, use the fully qualified name for the others.
:::

## Checking permissions

```java
if (!Perms.FEED_OTHERS.has(sender)) {
    throw new CommandPermissionException(Perms.FEED_OTHERS);
}
```

`has(...)` accepts any `Permissible`, including players and the console. `CommandPermissionException` accepts a node directly; see [error handling](commands#error-handling) for turning it into a message.

## Using them on commands

The `@Permission` command annotation takes a `String` and cannot reference a `Permission` object. Use a string constant to avoid duplication:

```java
@PermissionHolder
public final class Perms {
    public static final String FEED_NODE = "myplugin.feed";
    public static final Permission FEED = new Permission(FEED_NODE, PermissionDefault.TRUE, "Use /feed");
}
```

```java
@Command("feed")
@com.zetaplugins.zetacore.command.annotation.Permission(Perms.FEED_NODE)
public class FeedCommand extends PluginCommand<MyPlugin> { ... }
```

## Using enums

Permissions can also be defined as an enum implementing `PermissionNode`. No annotation is needed, because ZetaCore discovers all types that implement `PermissionNode`:

```java
public enum Perms implements PermissionNode {
    FEED("myplugin.feed", PermissionDefault.TRUE, "Use /feed"),
    FEED_OTHERS("myplugin.feed.others", PermissionDefault.OP, "Feed other players"),
    RELOAD("myplugin.reload", PermissionDefault.OP, "Reload the config");

    private final String value;
    private final PermissionDefault def;
    private final String description;

    Perms(String value, PermissionDefault def, String description) {
        this.value = value;
        this.def = def;
        this.description = description;
    }

    @Override public String getValue() { return value; }
    @Override public PermissionDefault getPermissionDefault() { return def; }
    @Override public String getDescription() { return description; }
}
```

```java
if (Perms.RELOAD.has(sender)) { ... }
```
