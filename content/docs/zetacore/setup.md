---
title: Setup
description: Add ZetaCore to your Maven or Gradle project.
icon: Package
---

ZetaCore is a library, not a standalone plugin. Server owners do not install it separately; instead, you **shade it into your plugin jar**.

You need **Java 17+** and **Paper 1.20.4+** (or a fork of Paper).

## Add the dependency

The current version of ZetaCore can be found in the GitHub [releases](https://github.com/ZetaPlugins/zetacore/releases).

::::tabs
:::tab[Maven]

```xml title="pom.xml"
<repositories>
    <repository>
        <id>papermc</id>
        <url>https://repo.papermc.io/repository/maven-public/</url>
    </repository>
    <repository>
        <id>zetaplugins</id>
        <url>https://maven.zetaplugins.com/</url>
    </repository>
</repositories>

<dependencies>
    <dependency>
        <groupId>io.papermc.paper</groupId>
        <artifactId>paper-api</artifactId>
        <version>1.20.4-R0.1-SNAPSHOT</version>
        <scope>provided</scope>
    </dependency>
    <dependency>
        <groupId>com.zetaplugins</groupId>
        <artifactId>zetacore</artifactId>
        <!-- use the latest version from the releases page -->
        <version>LATEST_VERSION</version>
        <!-- compile, NOT provided: it has to end up in your jar -->
        <scope>compile</scope>
    </dependency>
</dependencies>
```

Then shade and relocate it. Replace `com.example.myplugin` with your own package:

```xml title="pom.xml"
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-shade-plugin</artifactId>
            <version>3.6.0</version>
            <executions>
                <execution>
                    <phase>package</phase>
                    <goals>
                        <goal>shade</goal>
                    </goals>
                </execution>
            </executions>
            <configuration>
                <createDependencyReducedPom>false</createDependencyReducedPom>
                <relocations>
                    <relocation>
                        <pattern>com.zetaplugins.zetacore</pattern>
                        <shadedPattern>com.example.myplugin.libs.zetacore</shadedPattern>
                    </relocation>
                    <relocation>
                        <pattern>org.json.simple</pattern>
                        <shadedPattern>com.example.myplugin.libs.jsonsimple</shadedPattern>
                    </relocation>
                </relocations>
            </configuration>
        </plugin>
    </plugins>
</build>
```

:::

:::tab[Gradle]

```groovy title="build.gradle"
plugins {
    id 'java'
    id 'com.gradleup.shadow' version '8.3.0'
}

repositories {
    mavenCentral()
    maven { url = 'https://repo.papermc.io/repository/maven-public/' }
    maven { url = 'https://maven.zetaplugins.com/' }
}

dependencies {
    compileOnly 'io.papermc.paper:paper-api:1.20.4-R0.1-SNAPSHOT'
    implementation 'com.zetaplugins:zetacore:3.0.0'
}

shadowJar {
    archiveClassifier.set('')
    relocate 'com.zetaplugins.zetacore', 'com.example.myplugin.libs.zetacore'
    relocate 'org.json.simple', 'com.example.myplugin.libs.jsonsimple'
}

build.dependsOn shadowJar
```

:::
::::

:::warning[Don't use `provided` / `compileOnly` for ZetaCore]
If ZetaCore is not included in your jar, the server throws `NoClassDefFoundError: com/zetaplugins/zetacore/...` as soon as your plugin loads.
:::

### Why relocation is required

If two plugins shade ZetaCore without relocating it, both ship identical class names and only the copy that loads first is used. This leads to errors that only occur when both plugins are installed. Relocation gives each plugin its own isolated copy.

Relocating into your own package (`com.example.myplugin.libs...`) is supported. ZetaCore excludes its own classes when scanning your package.

## Next steps

Continue with [your first plugin](first-plugin).
