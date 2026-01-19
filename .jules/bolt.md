# Bolt's Journal

## 2025-02-18 - Scroll Performance Optimization
**Learning:** Found a scroll handler in `src/routes/+page.svelte` that triggers reflows (reading `offsetHeight`) and runs synchronously on every scroll event without `passive: true`. This can cause significant jank, especially on mobile devices where the "hero" section is prominent.
**Action:** Decoupling scroll logic using `requestAnimationFrame`, caching layout values, and using passive listeners is a standard pattern that should be applied to all scroll-dependent effects.

## 2025-02-18 - Svelte onMount Async Cleanup
**Learning:** Svelte's `onMount` does not support async callbacks that return a cleanup function, as the promise resolves after the mount phase. This causes the cleanup function to be ignored, leading to memory leaks (e.g., Leaflet maps not being destroyed).
**Action:** Use a synchronous `onMount` callback and invoke an async IIFE inside it for async initialization, ensuring the cleanup function is returned synchronously.
