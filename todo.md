# To-Do List: Navigation & Accountability Narrative Overhaul

This document outlines the comprehensive tasks required to implement a minimalist overlay navigation system and to rewrite the site's core narrative, reflecting that Speaker Jon Burns killed HB 441 to protect vulnerable Republicans.

---

## Phase 1: Navigation System Overhaul

- [ ] **Task 1. Audit and Categorize Routes**
  - **Description:** Create `src/lib/config/navigation.ts` to act as the single source of truth for all site links. Categorize the 23 routes into logical groupings (e.g., *Learn* [Basics, FAQs, Bill Analysis], *Take Action* [Join, Rep Calls, Support], *About* [The Standard, The Confession]). This abstracts the data out of the UI components.
  - **Details:** This file will also house constants for external links and pages that require special handling (e.g., pages where the navigation should be hidden).

- [ ] **Task 2. Resolve Route Duplication**
  - **Description:** Investigate the `/timeline` and `/georgia-battle` routes. Decide whether to merge them, redirect one to the other, or differentiate their content. Update `src/lib/config/navigation.ts` to reflect the final decision.
  - **Details:** Ensure all internal links across the site point to the correct, resolved route.

- [ ] **Task 3. Extract Layout Components**
  - **Description:** Create dedicated component files: `src/lib/components/layout/Header.svelte`, `src/lib/components/layout/Footer.svelte`, and `src/lib/components/layout/OverlayMenu.svelte`. Move the existing HTML from `src/routes/+layout.svelte` into these respective files to improve maintainability.
  - **Details:** These components will be imported and used in the root `+layout.svelte`.

- [ ] **Task 4. Implement Minimalist Header UI**
  - **Description:** Update `Header.svelte` to be a stripped-down, fixed-top bar containing only the brand logo, a "Join the Fight" primary CTA, and a "Menu" hamburger/text button. Ensure it respects the existing logic that hides the header on specific landing pages.
  - **Details:** The header should be responsive and accessible.

- [ ] **Task 5. Build the Overlay Menu**
  - **Description:** Implement `OverlayMenu.svelte` using Svelte 5 runes (`$state` for open/closed status). When triggered by the Header, this component should cover the screen and display the categorized routes from `navigation.ts` in a clean, multi-column layout. Include a prominent "Close" button.
  - **Details:** Implement proper accessibility features (focus trapping, keyboard navigation, ARIA attributes).

- [ ] **Task 6. Enhance the "Fat Footer"**
  - **Description:** Update `Footer.svelte` to include a comprehensive sitemap of all categorized routes.
  - **Details:** The footer will serve as a persistent directory for all site links, crucial for discoverability in a minimalist navigation design.

- [ ] **Task 7. Update the Root Layout**
  - **Description:** Refactor `src/routes/+layout.svelte` to import and utilize the new `<Header />`, `<OverlayMenu />`, and `<Footer />` components, passing down any necessary state (like the current route to highlight active links).
  - **Details:** Clean up the `+layout.svelte` file, making it primarily responsible for orchestrating the main layout components.

---

## Phase 2: Narrative Shift - Accountability for HB 441

- [ ] **Task 8. Overhaul `/burns-accountability`**
  - **Description:** Rewrite `src/routes/burns-accountability/+page.svelte` using content from `narrative_content.md`.
  - **Details:** Change the narrative from "the bill is stalled" to explicitly state that Speaker Jon Burns killed the bill in committee to protect vulnerable Republicans. Change the CTA from "demand a hearing" to "demand accountability."

- [ ] **Task 9. Update `/georgia-battle`**
  - **Description:** Update `src/routes/georgia-battle/+page.svelte` using content from `narrative_content.md`.
  - **Details:** Change the "Progress Tracker" status from "Currently in committee / Next step: Floor vote expected Q2 2026" to "Killed in Committee." Update the bottom copy to reflect that the path to justice was blocked by Republican leadership.

- [ ] **Task 10. Revise the `/timeline`**
  - **Description:** Modify the timeline data in `src/routes/timeline/+page.svelte` using content from `narrative_content.md`.
  - **Details:** Remove projected future events for March/April 2026. Add a definitive event marking the death of the bill at the hands of Speaker Burns.

- [ ] **Task 11. Update Forms and CTAs**
  - **Description:** Update `src/lib/components/JoinForm.svelte` and `src/routes/near-me/+page.svelte` using content from `narrative_content.md`.
  - **Details:** Change dropdown options and text from "I want to help pass an abolition bill" to "I want to hold my representatives accountable" or "I want to help the next phase of abolition."

- [ ] **Task 12. Update `/bill-analysis` and `/support`**
  - **Description:** Remove calls to "push this bill to the floor" in `src/routes/bill-analysis/+page.svelte`. Update prayer requests in `src/routes/support/+page.svelte` to focus on accountability and future efforts rather than the active passage of HB 441, using content from `narrative_content.md`.
  - **Details:** Ensure all messaging across these pages aligns with the new narrative.
