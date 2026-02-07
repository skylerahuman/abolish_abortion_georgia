# Bolt's Journal

## 2025-02-18 - Scroll Performance Optimization

**Learning:** Found a scroll handler in `src/routes/+page.svelte` that triggers reflows (reading `offsetHeight`) and runs synchronously on every scroll event without `passive: true`. This can cause significant jank, especially on mobile devices where the "hero" section is prominent.
**Action:** Decoupling scroll logic using `requestAnimationFrame`, caching layout values, and using passive listeners is a standard pattern that should be applied to all scroll-dependent effects.

## 2025-02-18 - Static Data Fetching vs Import

**Learning:** `timeline.json` was being fetched via `fetch()` in `onMount`, causing a network request and layout shift (LCP) for data that is static.
**Action:** Moved static JSON data to `src/lib/data` and imported it directly. This leverages Vite's bundling to make data available immediately, eliminating the fetch waterfall.

## 2025-02-18 - IntersectionObserver Batching & Mobile Backgrounds

**Learning:**

1. `IntersectionObserver` callbacks that update reactive state (like a Set) inside a loop (`entries.forEach`) trigger reactivity for _every_ intersecting element. This causes layout thrashing.
   **Action:** Always collect updates in a local variable (e.g., a new Set) and perform a single state assignment after the loop.

2. `background-attachment: fixed` causes constant repaints on mobile during scroll.
   **Action:** Use a fixed-position pseudo-element (`position: fixed; z-index: -1`) with `will-change: transform` to achieve the same visual effect while keeping the layer on the compositor.
