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

## 2025-02-19 - Timeline Component Hydration Bug

**Learning:** Fetching data in `onMount` and immediately setting up `IntersectionObserver` caused a race condition where `document.querySelectorAll` ran before the DOM updated with the new data. This resulted in no elements being observed.
**Action:** By switching to static imports for `timeline.json`, the data is available immediately during the first render, ensuring elements exist when `onMount` runs.

## 2025-02-19 - Animation Delay UX

**Learning:** Using `index * 150ms` for animation delays on long lists means items deep in the list have massive delays (e.g., 5 seconds) even when scrolled into view much later.
**Action:** Removed index-based delays for scroll-triggered animations. Relied on `IntersectionObserver` triggering naturally as items enter the viewport, with a small constant delay (100ms) for smoothness.
