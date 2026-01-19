## 2024-05-22 - Accessibility Improvements for Join Form
**Learning:** Visual-only progress indicators and loading states exclude screen reader users from understanding form status.
**Action:** Always use `role="progressbar"` for multi-step forms and `aria-busy`/`aria-label` for loading buttons to ensure state changes are communicated.

## 2025-02-18 - Donation Button Accessibility
**Learning:** Toggle buttons relying solely on color change (CSS classes) provide no feedback to screen readers about their selected state.
**Action:** Always add `aria-pressed="true/false"` to toggle buttons and group related options with `role="group"` and an accessible label.
