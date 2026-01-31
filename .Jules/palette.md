## 2024-05-22 - Wizard Form Focus & Validation
**Learning:** Multi-step forms (wizards) often fail to manage focus when transitioning steps, leaving screen reader users lost. Also, disabling "Next" buttons without feedback or validation allows users to click through required fields unnoticed.
**Action:** Always verify focus movement on step changes (using `tick()` in Svelte) and ensure required fields are validated before allowing step progression, providing clear error feedback.

## 2026-01-31 - Skip to Main Content
**Learning:** Even if a memory or documentation claims a feature exists (like skip links), always verify the code. The absence of a skip link is a critical a11y failure that forces keyboard users to tab through navigation on every page.
**Action:** Implementing a skip link is a 5-minute task with high impact. Always check for `#main-content` and skip links in layout files early in the audit.
