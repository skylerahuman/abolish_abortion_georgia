## 2024-05-22 - Accessibility Improvements for Join Form

**Learning:** Visual-only progress indicators and loading states exclude screen reader users from understanding form status.
**Action:** Always use `role="progressbar"` for multi-step forms and `aria-busy`/`aria-label` for loading buttons to ensure state changes are communicated.

## 2024-05-23 - Accessibility for Custom Controls

**Learning:** Custom toggle buttons (like donation amounts) need `aria-pressed` to communicate state to screen readers, and design-heavy inputs (like custom amounts with currency symbols) often lack visible labels, requiring `aria-label`.
**Action:** When implementing custom selection UIs or inputs without standard labels, always add `aria-pressed` or `aria-label` to ensure screen reader users aren't left guessing.

## 2026-02-19 - Auto-Submit Form Testing

**Learning:** Tests that explicitly click a submit button on an auto-submitting form (e.g., ZIP lookup on the 5th digit) create race conditions, as the button may disappear or become disabled before the click action completes.
**Action:** When testing auto-submitting forms, avoid explicit clicks; instead, wait for and assert the expected result (e.g., success message or next step visibility).

## 2026-02-19 - CI with PNPM

**Learning:** CI workflows often default to  which requires a . For Version 10.28.0 (compiled to binary; bundled Node.js v22.22.0)
Usage: pnpm [command] [flags]
       pnpm [ -h | --help | -v | --version ]

These are common pnpm commands used in various situations, use 'pnpm help -a' to list all commands

Manage your dependencies:
      add                  Installs a package and any packages that it depends
                           on. By default, any new package is installed as a
                           prod dependency
   i, install              Install all dependencies for a project
  ln, link                 Connect the local project to another one
  rm, remove               Removes packages from node_modules and from the
                           project's package.json
      unlink               Unlinks a package. Like yarn unlink but pnpm
                           re-installs the dependency after removing the
                           external link
  up, update               Updates packages to their latest version based on the
                           specified range

Review your dependencies:
      audit                Checks for known security issues with the installed
                           packages
  ls, list                 Print all the versions of packages that are
                           installed, as well as their dependencies, in a
                           tree-structure
      outdated             Check for outdated packages
      why                  Shows all packages that depend on the specified
                           package

Run your scripts:
      create               Create a project from a "create-*" or "@foo/create-*"
                           starter kit
      dlx                  Fetches a package from the registry without
                           installing it as a dependency, hot loads it, and runs
                           whatever default command binary it exposes
      exec                 Executes a shell command in scope of a project
      run                  Runs a defined package script

Other:
   c, config               Manage the pnpm configuration files
      init                 Create a package.json file
      publish              Publishes a package to the registry
      self-update          Updates pnpm to the latest version

Options:
  -r, --recursive          Run the command for each project in the workspace. projects without a committed lockfile (which is sometimes the case in early dev), use Progress: resolved 0, reused 1, downloaded 0, added 0
 WARN  deprecated eslint@8.57.1: This version is no longer supported. Please see https://eslint.org/version-support for other options.
Progress: resolved 169, reused 155, downloaded 0, added 0
 WARN  5 deprecated subdependencies found: @humanwhocodes/config-array@0.13.0, @humanwhocodes/object-schema@2.0.3, glob@7.2.3, inflight@1.0.6, rimraf@3.0.2
Already up to date
Progress: resolved 537, reused 468, downloaded 0, added 0, done

> abolition-georgia@0.0.1 prepare /app
> svelte-kit sync || echo ''


Done in 5.4s using pnpm v10.28.0 to ensure dependencies install correctly.
**Action:** Always check  when switching package managers.

## 2026-02-19 - CI with PNPM

**Learning:** CI workflows often default to npm ci which requires a package-lock.json. For pnpm projects without a committed lockfile (which is sometimes the case in early dev), use pnpm install --no-frozen-lockfile to ensure dependencies install correctly.
**Action:** Always check .github/workflows when switching package managers.
