## 2024-05-22 - Wizard Form Focus & Validation

**Learning:** Multi-step forms (wizards) often fail to manage focus when transitioning steps, leaving screen reader users lost. Also, disabling "Next" buttons without feedback or validation allows users to click through required fields unnoticed.
**Action:** Always verify focus movement on step changes (using `tick()` in Svelte) and ensure required fields are validated before allowing step progression, providing clear error feedback.

## 2026-02-01 - Skip Links in Simple Layouts
**Learning:** Even simple, single-column layouts need "Skip to Main Content" links. Keyboard users shouldn't have to tab through navigation (even if short) to reach the primary content.
**Action:** Ensure every layout has a robust skip link, correctly targeting a focused/tabindex="-1" main container.
