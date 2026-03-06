## 2024-05-22 - Accessibility Improvements for Join Form

**Learning:** Visual-only progress indicators and loading states exclude screen reader users from understanding form status.
**Action:** Always use `role="progressbar"` for multi-step forms and `aria-busy`/`aria-label` for loading buttons to ensure state changes are communicated.

## 2024-05-23 - Accessibility for Custom Controls

**Learning:** Custom toggle buttons (like donation amounts) need `aria-pressed` to communicate state to screen readers, and design-heavy inputs (like custom amounts with currency symbols) often lack visible labels, requiring `aria-label`.
**Action:** When implementing custom selection UIs or inputs without standard labels, always add `aria-pressed` or `aria-label` to ensure screen reader users aren't left guessing.

## 2026-03-06 - Svelte 5 Modal Accessibility
**Learning:** Using `role="document"` instead of `role="dialog"` for modals breaks screen reader accessibility and causes DOM-testing-library (e.g. `@testing-library/svelte`) queries like `getByRole('dialog')` to fail.
**Action:** Always use `role="dialog"` along with `aria-modal="true"` and `aria-labelledby` pointing to the modal title ID for accessible modal dialogs.
