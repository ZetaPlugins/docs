---
title: Dependency Injection
description: Register and inject services with ServiceRegistry, @Service, @Inject, and @PostConstruct.
---

ZetaCore's dependency injection is centered on `ServiceRegistry`. Mark service classes with `@Service`, inject dependencies with `@Inject`, and use `@PostConstruct` for setup that should run after injection.

```java
package com.example.myplugin.service;

import com.zetaplugins.zetacore.di.annotation.Service;

@Service
public class GreetingService {
    public String greeting() {
        return "Hello from ZetaCore";
    }
}
```

```java
package com.example.myplugin.feature;

import com.example.myplugin.service.GreetingService;
import com.zetaplugins.zetacore.di.annotation.Inject;
import com.zetaplugins.zetacore.di.annotation.PostConstruct;
import com.zetaplugins.zetacore.di.annotation.Service;

@Service
public class WelcomeService {
    @Inject
    private GreetingService greetingService;

    @PostConstruct
    void init() {
        // Runs after services have been injected.
    }

    public String welcome() {
        return greetingService.greeting();
    }
}
```

If you want to bind an implementation to an interface, use `binds` on the service annotation. The registry can also resolve abstract types by discovering a matching `@Service` implementation in your package.

```java
ServiceRegistry services = new ServiceRegistry.Builder()
    .withPlugin(this)
    .withPackagePrefix(getClass().getPackageName())
    .build();

services.initializeEagerServices();
```

If you want stricter behavior, enable `requireServiceAnnotation` in the builder so only annotated concrete classes are registered directly.
