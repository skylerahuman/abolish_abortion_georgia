## 2024-05-22 - Wizard Form Focus & Validation
**Learning:** Multi-step forms (wizards) often fail to manage focus when transitioning steps, leaving screen reader users lost. Also, disabling "Next" buttons without feedback or validation allows users to click through required fields unnoticed.
**Action:** Always verify focus movement on step changes (using `tick()` in Svelte) and ensure required fields are validated before allowing step progression, providing clear error feedback.

## 2026-02-06 - Interactive Cues & Semantics
**Learning:** Visual cues like `cursor-pointer` on non-interactive elements (like divs) mislead users and fail accessibility checks. Screen readers ignore them, and keyboard users can't access them.
**Action:** Always back visual interactivity cues with semantic elements (`<button>`, `<a>`) and proper ARIA labels, ensuring the "click" expectation is met with actual functionality.
