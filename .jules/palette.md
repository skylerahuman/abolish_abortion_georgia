## 2024-05-22 - Accessibility Improvements for Join Form

**Learning:** Visual-only progress indicators and loading states exclude screen reader users from understanding form status.
**Action:** Always use `role="progressbar"` for multi-step forms and `aria-busy`/`aria-label` for loading buttons to ensure state changes are communicated.

## 2024-05-23 - Accessibility for Custom Controls

**Learning:** Custom toggle buttons (like donation amounts) need `aria-pressed` to communicate state to screen readers, and design-heavy inputs (like custom amounts with currency symbols) often lack visible labels, requiring `aria-label`.
**Action:** When implementing custom selection UIs or inputs without standard labels, always add `aria-pressed` or `aria-label` to ensure screen reader users aren't left guessing.

## 2024-06-03 - Skip Link Implementation

**Learning:** Adding a "Skip to Main Content" link is a critical accessibility feature that is easily overlooked. It requires both CSS for visual management (hidden unless focused) and HTML structure (`id="main-content"` + `tabindex="-1"`) to function correctly.
**Action:** Always check for the presence of a skip link in the main layout and ensure the target element can receive focus.
