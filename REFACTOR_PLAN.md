# Refactoring Design Document & Execution Plan

## 1. Executive Summary & Analysis

**Current Status:**
The codebase is in a hybrid state, partially modernized to Svelte 5 but retaining significant legacy debt. While `JoinForm.svelte` and `georgia-battle` utilize Svelte 5 Runes (`$state`), critical infrastructure like `Map.svelte` and global stores (`stores.ts`) rely on legacy patterns (`writable`, `onMount` with loose typing).

**Key Findings:**
*   **Svelte 5 Compliance:** Mixed. `stores.ts` uses Svelte 4 `writable` stores. `Map.svelte` uses legacy `onMount` patterns and lacks reactivity for map updates.
*   **Tailwind Optimization:** `app.css` contains ~100 lines of unused "God Class" CSS (`.timeline` styles) while the actual timeline implementation uses utility classes. `Map.svelte` relies on a custom `.church-pin-icon` class defined in `app.css`.
*   **Type Safety:** Critical gaps found. `Map.svelte` uses `let L: any` and `@ts-ignore` for Leaflet imports, bypassing strict type checks. `utils.ts` and `JoinForm.svelte` have implicit or loose typings (`Record<string, string> | null`).
*   **Tooling:** No ESLint or Prettier configuration exists to enforce the `git_rules.md` standards programmatically.

---

## 2. Refactoring Roadmap (Phase 2)

This roadmap focuses on strict adherence to Enterprise SDLC standards.

### Step 1: SDLC & Tooling Foundations
**Goal:** Enforce code quality automatically.
1.  **Install & Configure ESLint/Prettier**:
    *   Install `eslint`, `prettier`, `eslint-plugin-svelte`, `eslint-config-prettier`.
    *   Configure `.prettierrc` (Tailwind sorting, single quotes, strict formatting).
    *   Configure `.eslintrc.cjs` to error on `any` usage and unused variables.
2.  **Husky Hooks** (Optional but recommended):
    *   Add `pre-commit` hook to run `npm run check`.

### Step 2: Architecture & Conventions
**Goal:** Standardize naming and structure.
1.  **Type Definitions**:
    *   Create `src/lib/types/` directory.
    *   Extract `TimelineEvent` from `georgia-battle`.
    *   Define `DistrictMap`, `Church`, `ContactForm` interfaces.
2.  **Shared State (Runes)**:
    *   Delete `src/lib/stores.ts`.
    *   Create `src/lib/state/app.svelte.ts`.
    *   Implement a global `AppState` class using Runes to replace `formStep`.

### Step 3: Component Modernization
**Goal:** 100% Svelte 5 & Strict TypeScript.

#### A. `Map.svelte` Refactor
*   **Strict Typing**: Install `@types/leaflet`. Remove `any` and `@ts-ignore`.
*   **Reactivity**: Use `$effect` to handle map updates instead of `onMount` if props change.
*   **CSS**: Move `.church-pin-icon` styles to a utility-first approach or a component-scoped snippet.

#### B. `JoinForm.svelte` Refinement
*   **Typing**: Import strict `DistrictMap` interface.
*   **Cleanup**: Verify `setInterval` cleanup (prevent memory leaks).

#### C. Layouts & Pages
*   **Cleanup**: Remove unused `.timeline` styles from `app.css`.
*   **Consistency**: Ensure all `onMount` calls are strictly necessary; prefer `$effect` or derived state where applicable.

### Step 4: Tailwind Standardization
**Goal:** Eliminate "Magic Values".
1.  **Audit**: Scan for `[123px]` arbitrary values and replace with theme extensions if repeated.
2.  **Theme**: Ensure `src/app.css` `@theme` block covers all used colors (Charcoal, Bone, Crimson).
3.  **Refactor**: Convert any remaining `<style>` blocks to Tailwind utilities.

---

## 3. Approval Request

**Immediate Next Action:**
Upon approval of this plan, I will begin with **Step 1: SDLC & Tooling Foundations** to ensure all subsequent code changes are automatically validated.
