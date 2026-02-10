## 2024-05-22 - Wizard Form Focus & Validation
**Learning:** Multi-step forms (wizards) often fail to manage focus when transitioning steps, leaving screen reader users lost. Also, disabling "Next" buttons without feedback or validation allows users to click through required fields unnoticed.
**Action:** Always verify focus movement on step changes (using `tick()` in Svelte) and ensure required fields are validated before allowing step progression, providing clear error feedback.

## 2024-05-23 - Mobile Input Optimization
**Learning:** `inputmode="numeric"` combined with `pattern="[0-9]*"` is vastly superior to `type="number"` for ZIP codes on mobile, ensuring the correct numeric keypad appears without the up/down arrows or scientific notation issues.
**Action:** Default to `inputmode="numeric"` + `pattern="[0-9]*"` for all numeric-only string inputs (like ZIPs, phone extensions) instead of `type="number"`.
