# Track Plan: Home Page Redesign & Content Integration

## Phase 1: Layout & Component Structure
- [x] Task: Create Layout Components (704ce3b)
    - [ ] Sub-task: Write Tests: Create tests to verify the existence and basic class structure of new components (TwoColumnLayout, DataCard).
    - [ ] Sub-task: Implement Feature: Create `TwoColumnLayout.svelte` (or inline grid) and `DataCard.svelte` components with Tailwind classes.
- [x] Task: Setup Home Page Structure (ec8282a)
    - [ ] Sub-task: Write Tests: Create a test for `+page.svelte` to ensure it renders the main container and the two distinct columns.
    - [ ] Sub-task: Implement Feature: Scaffold `src/routes/+page.svelte` with the new layout structure (Left Main, Right Sidebar).
- [ ] Task: Conductor - User Manual Verification 'Layout & Component Structure' (Protocol in workflow.md) [checkpoint: ab41ce6]

## Phase 2: Content Implementation (Left Column)
- [ ] Task: Implement Scripture Header
    - [ ] Sub-task: Write Tests: Verify the scripture section exists and has the correct styling classes (text-white, text-left).
    - [ ] Sub-task: Implement Feature: Add the Scripture section to the top of the left column.
- [ ] Task: Implement Executive Summary & Statistics
    - [ ] Sub-task: Write Tests: Verify the Executive Summary heading and key paragraphs are rendered.
    - [ ] Sub-task: Implement Feature: Add the Executive Summary and 2024 Statistics sections.
- [ ] Task: Implement Deep Dive Sections (Telehealth, Migration, Demographics)
    - [ ] Sub-task: Write Tests: Verify section headings for "Telehealth Workaround", "Out-of-State Migration", and "Demographic Disparities" exist.
    - [ ] Sub-task: Implement Feature: Add the remaining detailed sections to the left column with appropriate typography (Serif headings).
- [ ] Task: Conductor - User Manual Verification 'Content Implementation (Left Column)' (Protocol in workflow.md)

## Phase 3: Visuals & "Failure Cards" (Right Column)
- [ ] Task: Create Failure Card Data
    - [ ] Sub-task: Write Tests: Verify the data structure for the cards (title, value, description).
    - [ ] Sub-task: Implement Feature: Extract key stats from the provided text and structure them for the cards.
- [ ] Task: Implement Failure Cards
    - [ ] Sub-task: Write Tests: Verify cards render with correct content and "Abolitionist" styling (Red/Black/White).
    - [ ] Sub-task: Implement Feature: Populate the right column with `DataCard` components highlighting the key failures.
- [ ] Task: Mobile Responsiveness Check
    - [ ] Sub-task: Write Tests: (Optional/Hard to test purely unit) - Rely on manual verification or basic CSS class checks for `md:grid-cols-2`.
    - [ ] Sub-task: Implement Feature: Ensure the columns stack correctly on mobile screens.
- [ ] Task: Conductor - User Manual Verification 'Visuals & "Failure Cards" (Right Column)' (Protocol in workflow.md)

## Phase 4: Mobile Refinements
- [x] Task: Implement Mobile Carousel for Data Cards
    - [ ] Sub-task: Write Tests: Verify that the layout switches to a carousel structure on mobile screens.
    - [ ] Sub-task: Implement Feature: update `TwoColumnLayout` or create a wrapper to display cards as a horizontal scroll snap carousel on mobile.
- [x] Task: Center Mobile CTAs
    - [ ] Sub-task: Write Tests: Verify centered alignment classes for the CTA container on mobile.
    - [ ] Sub-task: Implement Feature: Update the CTA section in `+page.svelte` to use `flex-col items-center` on mobile and `flex-row` on desktop.
- [ ] Task: Conductor - User Manual Verification 'Mobile Refinements' (Protocol in workflow.md)
