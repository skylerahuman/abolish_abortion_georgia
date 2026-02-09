## 2024-05-22 - Wizard Form Focus & Validation
**Learning:** Multi-step forms (wizards) often fail to manage focus when transitioning steps, leaving screen reader users lost. Also, disabling "Next" buttons without feedback or validation allows users to click through required fields unnoticed.
**Action:** Always verify focus movement on step changes (using `tick()` in Svelte) and ensure required fields are validated before allowing step progression, providing clear error feedback.

## 2025-02-18 - Backward Navigation Focus
**Learning:** In multi-step forms, users expect focus to return to a logical place when navigating backward (e.g., the input they just came from or the main container), not just be lost. Svelte transitions can cause test flakiness if elements persist in the DOM.
**Action:** Implement `handlePrevStep` with `tick()` to manage backward focus. In tests, ensure the previous step is fully hidden (e.g., `not.toBeVisible()`) before interacting to avoid strict mode violations.
