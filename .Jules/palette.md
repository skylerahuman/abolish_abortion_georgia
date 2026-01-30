## 2024-05-22 - Wizard Form Focus & Validation
**Learning:** Multi-step forms (wizards) often fail to manage focus when transitioning steps, leaving screen reader users lost. Also, disabling "Next" buttons without feedback or validation allows users to click through required fields unnoticed.
**Action:** Always verify focus movement on step changes (using `tick()` in Svelte) and ensure required fields are validated before allowing step progression, providing clear error feedback.

## 2025-05-22 - Share Button Feedback
**Learning:** Using `alert()` for user feedback (like copy-to-clipboard) disrupts the flow and feels unpolished. Inline feedback (temporary button state change) is smoother and keeps the user in context.
**Action:** Replace blocking alerts with non-blocking UI updates (toast or temporary element state change) for success confirmations.
