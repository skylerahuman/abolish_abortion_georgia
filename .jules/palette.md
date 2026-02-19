## 2024-05-22 - Accessibility Improvements for Join Form

**Learning:** Visual-only progress indicators and loading states exclude screen reader users from understanding form status.
**Action:** Always use `role="progressbar"` for multi-step forms and `aria-busy`/`aria-label` for loading buttons to ensure state changes are communicated.

## 2024-05-23 - Accessibility for Custom Controls

**Learning:** Custom toggle buttons (like donation amounts) need `aria-pressed` to communicate state to screen readers, and design-heavy inputs (like custom amounts with currency symbols) often lack visible labels, requiring `aria-label`.
**Action:** When implementing custom selection UIs or inputs without standard labels, always add `aria-pressed` or `aria-label` to ensure screen reader users aren't left guessing.

## 2026-02-19 - Auto-Submit Form Testing

**Learning:** Tests that explicitly click a submit button on an auto-submitting form (e.g., ZIP lookup on the 5th digit) create race conditions, as the button may disappear or become disabled before the click action completes.
**Action:** When testing auto-submitting forms, avoid explicit clicks; instead, wait for and assert the expected result (e.g., success message or next step visibility).
