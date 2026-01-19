# Git & Branching Rules

This document outlines the standard operating procedures for managing branches and git workflow within this repository. Adhering to these rules ensures a clean history and efficient collaboration between human developers and AI agents.

## 1. Branch Naming Convention

All branches must follow the strict `type/scope-description` format.

**Format:** `type/scope-description`

*   **type**: A keyword indicating the nature of the change.
*   **scope**: (Optional but recommended) A 1-2 word identifier for the module or feature area.
*   **description**: A short, kebab-case summary of the work.

### Allowed Types

| Type | Description | Example |
| :--- | :--- | :--- |
| `feature` | New features or significant capabilities | `feature/map-district-lookup` |
| `fix` | Bug fixes for existing functionality | `fix/donation-form-validation` |
| `chore` | Maintenance, build scripts, or dependency updates | `chore/update-deps` |
| `refactor` | Code restructuring without behavior change | `refactor/auth-store` |
| `docs` | Documentation only changes | `docs/update-readme` |
| `perf` | Performance optimizations | `perf/landing-page-load` |
| `test` | Adding or correcting tests | `test/playwright-setup` |

### Examples

*   ✅ `feature/auth-login-page`
*   ✅ `fix/nav-mobile-menu`
*   ✅ `perf/map-rendering`
*   ❌ `my-new-feature` (Missing type)
*   ❌ `fix/bug` (Too vague)
*   ❌ `feature/add_login_page` (Use kebab-case, not snake_case)

## 2. Branch Lifecycle

1.  **Creation**: Always branch off the latest `main`.
    ```bash
    git checkout main
    git pull origin main
    git checkout -b feature/my-new-feature
    ```
2.  **Staleness**:
    *   Branches merged into `main` should be deleted immediately.
    *   Branches inactive for > 2 weeks are considered "stale" and subject to deletion during audits.
3.  **WIP Branches**:
    *   If you must stash work remotely, use the `wip/` prefix (e.g., `wip/experiment-map-layers`).
    *   `wip/` branches are considered temporary and may be deleted without warning if inactive for > 7 days.

## 3. Agentic Workflow (For AI Agents)

When an AI agent (like Jules) is tasked with work:

1.  **Analysis**: The agent must first analyze the codebase state.
2.  **Branching**: The agent MUST create a new branch following the naming convention above. Agents should **never** commit directly to `main`.
3.  **Context**: Agents should respect existing `.md` files in `.jules/` or root for architectural context.
4.  **Verification**: Before requesting a merge/review, the agent must run:
    *   `npm run check` (Type checking)
    *   `npm run build` (Build verification)
    *   Relevant tests (if available)

## 4. Maintenance

*   **Periodic Audit**: A monthly audit should be performed to clean up stale branches.
*   **Squashing**: When merging feature branches to `main`, "Squash and Merge" is preferred to keep the main history clean, unless the branch history is significant.
