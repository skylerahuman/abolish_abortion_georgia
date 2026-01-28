## 2024-05-22 - Wizard Form Focus & Validation
**Learning:** Multi-step forms (wizards) often fail to manage focus when transitioning steps, leaving screen reader users lost. Also, disabling "Next" buttons without feedback or validation allows users to click through required fields unnoticed.
**Action:** Always verify focus movement on step changes (using `tick()` in Svelte) and ensure required fields are validated before allowing step progression, providing clear error feedback.

## 2024-05-23 - Modal Accessibility Patterns
**Learning:** Modals must handle the Escape key and manage focus to be accessible. Svelte 5's `$effect` provides a clean way to restore focus on close by capturing `document.activeElement` when the modal opens.
**Action:** When implementing modals, always add a `window` event listener for `Escape` and use an effect to save/restore focus. Ensure `showModal` props are `$bindable()` to allow the component to close itself.
