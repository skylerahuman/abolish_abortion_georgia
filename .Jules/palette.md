## 2024-05-22 - Wizard Form Focus & Validation
**Learning:** Multi-step forms (wizards) often fail to manage focus when transitioning steps, leaving screen reader users lost. Also, disabling "Next" buttons without feedback or validation allows users to click through required fields unnoticed.
**Action:** Always verify focus movement on step changes (using `tick()` in Svelte) and ensure required fields are validated before allowing step progression, providing clear error feedback.

## 2025-05-23 - Clipboard UX & Testing
**Learning:** Replacing blocking `alert()` with inline feedback for copy-to-clipboard actions significantly improves flow. However, verifying this in headless Playwright requires mocking `navigator.clipboard` as permissions are restricted.
**Action:** Use `page.addInitScript` to mock `navigator.clipboard.writeText` in E2E tests for reliable verification of success states in headless environments.
