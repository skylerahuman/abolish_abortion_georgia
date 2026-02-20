## 2024-05-22 - Accessibility Improvements for Join Form

**Learning:** Visual-only progress indicators and loading states exclude screen reader users from understanding form status.
**Action:** Always use `role="progressbar"` for multi-step forms and `aria-busy`/`aria-label` for loading buttons to ensure state changes are communicated.

## 2024-05-23 - Accessibility for Custom Controls

**Learning:** Custom toggle buttons (like donation amounts) need `aria-pressed` to communicate state to screen readers, and design-heavy inputs (like custom amounts with currency symbols) often lack visible labels, requiring `aria-label`.
**Action:** When implementing custom selection UIs or inputs without standard labels, always add `aria-pressed` or `aria-label` to ensure screen reader users aren't left guessing.
\n## 2026-02-20 - Autocomplete for Forms\n**Learning:** Missing 'autocomplete' attributes force users to manually type common data (name, email, address), which is tedious on mobile and hinders accessibility tools.\n**Action:** Always audit form inputs for standard data types and add appropriate 'autocomplete' attributes (e.g., 'given-name', 'email', 'postal-code') to enable browser autofill.
