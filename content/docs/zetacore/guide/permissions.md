---
title: Permission Registration
description: Define permission nodes and register them with Bukkit.
---

ZetaCore represents permissions with `PermissionNode` and `Permission`. That gives you a simple way to define a permission tree and register it in one pass.

```java
package com.example.myplugin.permission;

import com.zetaplugins.zetacore.permission.Permission;
import com.zetaplugins.zetacore.permission.PermissionNode;
import org.bukkit.permissions.PermissionDefault;

public final class MyPermissions {
    public static final PermissionNode ADMIN = new Permission(
        "myplugin.admin",
        PermissionDefault.OP,
        "Administrative access"
    );

    public static final PermissionNode ADMIN_RELOAD = ADMIN.child("reload");

    private MyPermissions() {
    }
}
```

Register permissions during startup:

```java
PermissionRegistrar.registerAll(MyPermissions.class);
```

If you want to gather multiple permission holder classes first, use the collection helpers and then register the result.
