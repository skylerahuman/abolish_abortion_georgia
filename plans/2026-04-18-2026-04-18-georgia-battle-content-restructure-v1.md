# Content Restructuring: Georgia Battle and Burns Accountability

## Objective

Resolve content overlap, fix layout issues on the accountability page, and transform the Georgia Battle page into a highly fluid, animated scrollytelling experience that incorporates the bill analysis design.

## Implementation Plan

### Task 1: Fix Burns Accountability Layout

- [ ] Task 1.1. Open `src/routes/burns-accountability/+page.svelte`.
- [ ] Task 1.2. Locate the duplicated text and broken paragraph tag around lines 66-69.
- [ ] Task 1.3. Remove the duplicated sentence ("Speaker Jon Burns refused to let it reach the floor for a vote.") and properly close the `<p>` tag. Add appropriate reasoning text or remove the "His reasoning, reportedly:" lead-in if no reasoning is provided.

### Task 2: Remove Overlap on Georgia Battle Page

- [ ] Task 2.1. Open `src/routes/georgia-battle/+page.svelte`.
- [ ] Task 2.2. Delete the entire "Speaker Burns and HB 441" section (including action cards and call script) to remove content overlap.
- [ ] Task 2.3. Remove the `callScript` variable from the `<script>` block.
- [ ] Task 2.4. Search the file for any remaining mentions of "Burns" and rewrite them to maintain the "no mention" rule.
  - Line 47: Change "Speaker Burns killed it in committee in April 2026." to "The bill was killed in committee in April 2026."
  - Line 58: Change "Speaker Burns refused to allow a vote—April 2026." to "The bill was denied a floor vote—April 2026."

### Task 3: Add Teaser Redirect

- [ ] Task 3.1. In `src/routes/georgia-battle/+page.svelte`, create a new teaser section near the end of the page (before the final CTA).
- [ ] Task 3.2. Add the exact text: "Find out why this bill didn't get a vote in 2026."
- [ ] Task 3.3. Wrap this text (or a button below it) in a link pointing to `{base}/burns-accountability`.
- [ ] Task 3.4. Ensure the word "Burns" is strictly avoided in this new section.

### Task 4: Implement Scrollytelling Architecture

- [ ] Task 4.1. Restructure the `georgia-battle` page into four sequential phases: 1) Context (Georgia battle), 2) Bill Analysis Scrollytelling, 3) Comparison (Heartbeat vs Equal Protection), 4) Teaser & CTA.
- [ ] Task 4.2. Port the split-screen design from `bill-analysis/+page.svelte` into the second phase of `georgia-battle`.
- [ ] Task 4.3. Implement an `IntersectionObserver` action to track which bill section callout is currently in view on the right side.
- [ ] Task 4.4. Animate the left-side bill text to automatically scroll or highlight the relevant lines of the bill as the user scrolls through the callouts on the right.
- [ ] Task 4.5. Ensure smooth transitions between the standard vertical scroll sections (phases 1, 3, 4) and the split-screen scrollytelling section (phase 2).

## Verification Criteria

- [ ] `burns-accountability` page renders without HTML errors or duplicated text.
- [ ] `georgia-battle` page contains zero mentions of "Burns".
- [ ] `georgia-battle` page includes a clear link to the accountability page using the exact teaser text.
- [ ] `georgia-battle` page successfully implements a scrollytelling section that mimics the `bill-analysis` design.

## Potential Risks and Mitigations

1. **Scrollytelling Performance Issues**
   Mitigation: Use CSS transitions and `IntersectionObserver` instead of listening to scroll events directly on the main thread to ensure 60fps animations.
2. **Mobile Responsiveness**
   Mitigation: The split-screen scrollytelling design may not work well on mobile. Implement a fallback stacked design for smaller screens where the bill text is either hidden or appears inline with the callouts.

## Alternative Approaches

1. **Svelte-Scroller Library**: Instead of building a custom `IntersectionObserver` implementation, use a dedicated library like `@sveltejs/svelte-scroller` to handle the complex state of scrollytelling.
2. **Component Extraction**: Extract the split-screen bill analysis into a reusable `<BillScroller />` component to keep `georgia-battle/+page.svelte` clean and maintainable.
