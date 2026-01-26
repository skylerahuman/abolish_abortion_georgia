## 2024-05-22 - Wizard Form Focus & Validation
**Learning:** Multi-step forms (wizards) often fail to manage focus when transitioning steps, leaving screen reader users lost. Also, disabling "Next" buttons without feedback or validation allows users to click through required fields unnoticed.
**Action:** Always verify focus movement on step changes (using `tick()` in Svelte) and ensure required fields are validated before allowing step progression, providing clear error feedback.

## 2024-05-24 - Skip Link Focus Management
**Learning:** Simply adding a skip link isn't enough; the target container (e.g., `<main>`) must have `tabindex="-1"` to ensure the browser actually moves keyboard focus to the content, not just the scroll position.
**Action:** Audit all internal anchor links to ensure targets are focusable.
