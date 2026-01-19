# Testing Standards & TDD Workflow

## Philosophy
**Code without tests is technical debt.**
No feature is "done" until it is covered by a failing test that subsequently passes. We shift the culture from "code then verify" to "**verify then code**."

## The TDD Loop
All development must follow this strict cycle:

1.  🔴 **RED (Write the Test)**
    *   Before writing any feature code, write a test case that describes the expected behavior.
    *   Run the test and verify that it **fails** (and fails for the right reason).
2.  🟢 **GREEN (Make it Pass)**
    *   Write the *minimum* amount of code required to make the test pass.
    *   Do not over-engineer. Focus solely on satisfying the test assertion.
3.  🔵 **REFACTOR (Clean up)**
    *   Clean up the code (deduplicate, rename, structure) while ensuring tests remain green.

## Testing Levels & Tools

### 1. Unit Tests
*   **Scope:** Pure TypeScript logic, Utility functions, Svelte Stores (state logic).
*   **Tool:** `vitest`
*   **Location:** Co-located with source files (e.g., `src/lib/utils.ts` -> `src/lib/utils.test.ts`).
*   **Mocking:** Use `vi.mock()` for external dependencies.

### 2. Component Tests
*   **Scope:** Component rendering, User interactions, Props, Runes/State reactivity.
*   **Tool:** `vitest` + `jsdom` + `@testing-library/svelte`.
*   **Location:** Co-located with components (e.g., `Button.svelte` -> `Button.test.ts`).
*   **Strategy:**
    *   Render the component.
    *   Simulate user events (click, type).
    *   Assert DOM state (`toBeInTheDocument`, `toHaveClass`).
    *   **Avoid** testing implementation details (internal variables); test the *user-facing* behavior.

### 3. End-to-End (E2E) Tests
*   **Scope:** Full user flows, Page navigation, Critical paths, Map interactions.
*   **Tool:** `playwright`
*   **Location:** `tests/` directory.
*   **Visual Regression:** Critical UI components and pages must use visual snapshots.
    ```typescript
    await expect(page).toHaveScreenshot();
    ```

## Mocking Strategy
We use **Native Mocks** to keep the stack lean.

*   **Unit/Component:** Use `vi.mock()` and dependency injection.
*   **E2E:** Use `page.route()` to intercept and mock network requests.
    *   *Do not* rely on live 3rd party APIs in tests.
    *   *Do not* introduce MSW (Mock Service Worker) at this stage.

## Visual Regression
*   **Tool:** Playwright (`expect(page).toHaveScreenshot()`)
*   **Policy:**
    *   Snapshots are the source of truth.
    *   Changes to UI require updating snapshots (`npx playwright test --update-snapshots`).
    *   Review snapshot diffs carefully in PRs.
    *   Initial threshold: `maxDiffPixels: 100` (configured in `playwright.config.ts`) to account for minor rendering variances.

## CI/CD Enforcement
*   **Pre-commit:** Tests must pass locally before committing.
*   **CI:** All tests (Unit + E2E) must pass on the `main` branch.
