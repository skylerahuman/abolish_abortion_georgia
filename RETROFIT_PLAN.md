# TDD Retrofit Plan

This document outlines the prioritized plan to retrofit the codebase with tests, following the `TESTING_STANDARDS.md`.

## Phase 1: Foundation (Unit Tests)
*Target: 100% coverage of pure logic and state.*

1.  **Utilities (`src/lib/utils.ts`)**
    *   Create `src/lib/utils.test.ts`.
    *   Test all helper functions (formatting, validation, etc.).
2.  **State/Stores (`src/lib/stores.ts`)**
    *   Create `src/lib/stores.test.ts`.
    *   Test store initial states and updates.

## Phase 2: Core Components (Component Tests)
*Target: Verify user interactions and rendering without full browser overhead.*

1.  **Join Form (`src/lib/components/JoinForm.svelte`)**
    *   Create `src/lib/components/JoinForm.test.ts`.
    *   Test form validation logic.
    *   Test step navigation (Next/Back).
    *   Mock form submission.
2.  **Map Component (`src/lib/components/Map.svelte`)**
    *   Create `src/lib/components/Map.test.ts`.
    *   Verify Leaflet initialization (mocked).
    *   Verify marker rendering logic.

## Phase 3: Critical Flows (E2E & Visual Regression)
*Target: Protect critical user journeys.*

1.  **Support/Donation Page**
    *   Create `tests/support-page.spec.ts`.
    *   Test "Prayer" submission flow.
    *   Visual snapshot of the Donation section.
2.  **Landing Page**
    *   Create `tests/landing-page.spec.ts`.
    *   Visual snapshot of the home page to catch layout regressions.

## Execution Strategy
For each item above:
1.  **Red:** Write the test file first.
2.  **Green:** Run the test (it might pass if code exists, or fail if bugs/logic missing). If it passes, verify assertions are strict enough.
3.  **Refactor:** Improve the code structure if needed.
