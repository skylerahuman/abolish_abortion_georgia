# Bolt's Journal

## 2025-02-18 - Scroll Performance Optimization
**Learning:** Found a scroll handler in `src/routes/+page.svelte` that triggers reflows (reading `offsetHeight`) and runs synchronously on every scroll event without `passive: true`. This can cause significant jank, especially on mobile devices where the "hero" section is prominent.
**Action:** Decoupling scroll logic using `requestAnimationFrame`, caching layout values, and using passive listeners is a standard pattern that should be applied to all scroll-dependent effects.

## 2025-02-18 - Static Data Fetching vs Import
**Learning:** `timeline.json` was being fetched via `fetch()` in `onMount`, causing a network request and layout shift (LCP) for data that is static.
**Action:** Moved static JSON data to `src/lib/data` and imported it directly. This leverages Vite's bundling to make data available immediately, eliminating the fetch waterfall.
