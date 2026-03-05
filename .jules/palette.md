## 2024-05-22 - Accessibility Improvements for Join Form

**Learning:** Visual-only progress indicators and loading states exclude screen reader users from understanding form status.
**Action:** Always use `role="progressbar"` for multi-step forms and `aria-busy`/`aria-label` for loading buttons to ensure state changes are communicated.

## 2024-05-23 - Accessibility for Custom Controls

**Learning:** Custom toggle buttons (like donation amounts) need `aria-pressed` to communicate state to screen readers, and design-heavy inputs (like custom amounts with currency symbols) often lack visible labels, requiring `aria-label`.
**Action:** When implementing custom selection UIs or inputs without standard labels, always add `aria-pressed` or `aria-label` to ensure screen reader users aren't left guessing.

## 2024-05-18 - Added ARIA expanded and controls to Mobile Navigation and FAQ Accordions
**Learning:** Found multiple instances where accordion-style disclosure elements (mobile menu, FAQs) lacked ARIA attributes. It's a common pattern to use Svelte conditional rendering without considering screen reader state announcements.
**Action:** When implementing collapsible UI (like FAQs or mobile menus), always pair `aria-expanded` on the trigger with `aria-controls` pointing to the matching `id` of the content container to ensure correct screen reader announcements.
