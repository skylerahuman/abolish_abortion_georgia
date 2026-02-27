# Palette's Journal

## 2024-05-22 - Initial Setup
**Learning:** Journal file was missing.
**Action:** Created journal file to track critical UX learnings.

## 2024-05-22 - Skip to Main Content Link
**Learning:** Navigation-heavy sites without a "Skip to Content" link force keyboard users to tab through every menu item on every page load, causing significant fatigue and barrier to entry.
**Action:** Added a visually hidden, focusable skip link to `src/routes/+layout.svelte` that becomes visible on focus, significantly improving keyboard navigation efficiency.
