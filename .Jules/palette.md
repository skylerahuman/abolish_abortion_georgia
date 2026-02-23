# Palette's Journal

## 2025-05-21 - Skip Link Focus Management
**Learning:** Implementing "Skip to Main Content" requires not just the link, but ensuring the target container (e.g., `<main>`) has `tabindex="-1"` and a matching ID to successfully receive programmatic focus.
**Action:** When adding skip links, always verify focus shifts to the target container using `document.activeElement` in tests.
