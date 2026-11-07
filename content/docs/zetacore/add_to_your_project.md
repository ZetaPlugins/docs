---
title: Add it to Your Project
description: Learn how to add ZetaCore to your Minecraft plugin project using Maven or Gradle.
icon: Package
---

To add ZetaCore to your Minecraft plugin project, you can use either Maven or Gradle as your build tool. Below are the instructions for both methods.

## Using Maven

Add the following repository and dependency to your `pom.xml` file:

```xml
<repositories>
    <repository>
        <id>zetaplugins</id>
        <url>https://maven.zetaplugins.com/</url>
    </repository>
</repositories>

<dependencies>
    <dependency>
        <groupId>com.zetaplugins</groupId>
        <artifactId>zetacore</artifactId>
        <!-- Replace {latest_version} with the latest version number -->
        <version>{latest_version}</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

If you want to shade ZetaCore into your plugin jar, you can change the scope to `compile` instead of `provided`. And make sure to configure your shading plugin accordingly.

For example, using the Maven Shade Plugin:

```xml
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
        <artifactSet>
            <includes>
                <include>com.zetaplugins:zetacore</include>
            </includes>
        </artifactSet>
        <transformers>
            <transformer
                    implementation="org.apache.maven.plugins.shade.resource.ServicesResourceTransformer" />
            <transformer
                    implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                <mainClass>{main_class_path}</mainClass>
            </transformer>
        </transformers>
    </configuration>
</plugin>
```

## Using Gradle

Add the following repository and dependency to your `build.gradle` file:

```groovy
repositories {
    maven {
        url 'https://maven.zetaplugins.com/'
    }
}

dependencies {
    implementation 'com.zetaplugins:zetacore:{latest_version}' // Replace {latest_version} with the latest version number
}
```
