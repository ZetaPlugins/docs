---
title: Update Checker
description: Check GitHub, Hangar, or Modrinth for new plugin releases.
---

ZetaCore includes an abstract `UpdateChecker` base class plus concrete checkers for GitHub, Hangar, and Modrinth. Each implementation is annotated with `@Service`, but they still need to be constructed with the repository or project identifiers they check against.

The common workflow is:

1. Create the checker with your plugin instance and project identifiers.
2. Call `checkForUpdates(true)` after startup or on a scheduled task.
3. Inspect `isNewVersionAvailable()` and `getLatestVersion()` if you need to react in code.

### GitHub

```java
GitHubUpdateChecker checker = new GitHubUpdateChecker(this, "owner", "repo");
checker.checkForUpdates(true);
```

GitHub checks the latest release tag from the Releases API and compares it against the plugin version with semantic-version parsing when possible.

### Hangar

```java
HangarUpdateChecker checker = new HangarUpdateChecker(this, "owner", "project-slug");
checker.checkForUpdates(true);
```

Hangar compares the latest project version for the current Minecraft version and builds a version URL for the matched release.

### Modrinth

```java
ModrinthUpdateChecker checker = new ModrinthUpdateChecker(this, "project-id");
checker.checkForUpdates(true);
```

Modrinth checks the latest published version for the current Minecraft version and compares it against your plugin version.

### Base behavior

`UpdateChecker` exposes a few things that are useful regardless of the source:

- `checkForUpdates(boolean logMessage)` to perform the lookup.
- `isNewVersionAvailable()` to read the result.
- `getLatestVersion()` to inspect the newest version string.
- `getLatestVersionUrl()` to link users to the release page.

If you log update checks from the console, the base class also formats a readable banner with the plugin name, current version, newest version, and download URL.
