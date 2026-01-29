## 2024-05-22 - Wizard Form Focus & Validation
**Learning:** Multi-step forms (wizards) often fail to manage focus when transitioning steps, leaving screen reader users lost. Also, disabling "Next" buttons without feedback or validation allows users to click through required fields unnoticed.
**Action:** Always verify focus movement on step changes (using `tick()` in Svelte) and ensure required fields are validated before allowing step progression, providing clear error feedback.

## 2024-05-23 - Skip-to-Content Pattern
**Learning:** Single Page Applications (SPAs) with persistent navigation bars force keyboard users to tab through the menu on every page load, which is exhausting.
**Action:** Always include a "Skip to content" link as the first focusable element in the DOM, targeting a wrapper with `id="main-content"` and `tabindex="-1"` to ensure focus lands correctly even in non-native-interactive containers.
