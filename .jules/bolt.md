# Bolt's Journal

## 2025-02-18 - Scroll Performance Optimization
**Learning:** Found a scroll handler in `src/routes/+page.svelte` that triggers reflows (reading `offsetHeight`) and runs synchronously on every scroll event without `passive: true`. This can cause significant jank, especially on mobile devices where the "hero" section is prominent.
**Action:** Decoupling scroll logic using `requestAnimationFrame`, caching layout values, and using passive listeners is a standard pattern that should be applied to all scroll-dependent effects.

## 2025-02-18 - Static Data Fetching vs Import
**Learning:** `timeline.json` was being fetched via `fetch()` in `onMount`, causing a network request and layout shift (LCP) for data that is static.
**Action:** Moved static JSON data to `src/lib/data` and imported it directly. This leverages Vite's bundling to make data available immediately, eliminating the fetch waterfall.

## 2025-02-18 - IntersectionObserver Batching & Mobile Backgrounds
**Learning:**
1. `IntersectionObserver` callbacks that update reactive state (like a Set) inside a loop (`entries.forEach`) trigger reactivity for *every* intersecting element. This causes layout thrashing.
**Action:** Always collect updates in a local variable (e.g., a new Set) and perform a single state assignment after the loop.

2. `background-attachment: fixed` causes constant repaints on mobile during scroll.
**Action:** Use a fixed-position pseudo-element (`position: fixed; z-index: -1`) with `will-change: transform` to achieve the same visual effect while keeping the layer on the compositor.

## 2025-02-19 - Animation Scalability & Observer Cleanup
**Learning:**
1. **Unobserve One-Offs:** Using `IntersectionObserver` for entrance animations without `unobserve()` causes unnecessary callbacks on every scroll event for elements that are already visible.
2. **Avoid Index-Based Delays:** Setting `animation-delay: {index * 150}ms` creates massive delays for items far down a list (e.g., item 50 waits 7.5s).
**Action:**
1. Always call `observer.unobserve(target)` after the element enters the view if the animation is a one-time event.
2. Use a "batch index" (resetting on each observer callback) and pass it via CSS variables (e.g., `--delay`) to stagger animations relative to the user's scroll action, not the list position.

## 2025-02-19 - CI/CD Package Manager Alignment
**Learning:** CI failures occurred because the repository mandates `pnpm` locally but the GitHub Actions workflow was configured for `npm`. The `actions/setup-node` step with `cache: npm` failed when no `package-lock.json` was found (since only `pnpm-lock.yaml` existed).
**Action:** Ensure CI workflows match the project's package manager. Specifically, use `pnpm/action-setup`, update `setup-node` to `cache: pnpm`, and align all install/test commands.
