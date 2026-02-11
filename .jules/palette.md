# Design Palette

## 2024-05-22 - Wizard Form Focus & Validation

**Learning:** Multi-step forms (wizards) often fail to manage focus when transitioning steps, leaving screen reader users lost. Also, disabling "Next" buttons without feedback or validation allows users to click through required fields unnoticed.
**Action:** Always verify focus movement on step changes (using `tick()` in Svelte) and ensure required fields are validated before allowing step progression, providing clear error feedback.

## 2024-05-22 - Accessibility Improvements for Join Form

**Learning:** Visual-only progress indicators and loading states exclude screen reader users from understanding form status.
**Action:** Always use `role="progressbar"` for multi-step forms and `aria-busy`/`aria-label` for loading buttons to ensure state changes are communicated.

## 2024-05-23 - Accessibility for Custom Controls

**Learning:** Custom toggle buttons (like donation amounts) need `aria-pressed` to communicate state to screen readers, and design-heavy inputs (like custom amounts with currency symbols) often lack visible labels, requiring `aria-label`.
**Action:** When implementing custom selection UIs or inputs without standard labels, always add `aria-pressed` or `aria-label` to ensure screen reader users aren't left guessing.
