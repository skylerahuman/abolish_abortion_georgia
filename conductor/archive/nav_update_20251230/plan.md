# Track Plan: Navigation and Footer Update

## Phase 1: Header Navigation Update
- [x] Task: Update Header Navigation Labels and Links (cfabd26)
- [x] Task: Rename 'the-plea' Route to 'get-involved' (19c75af)
    - [ ] Sub-task: Implement Feature: Rename the directory `src/routes/the-plea` to `src/routes/get-involved`.
    - [ ] Sub-task: Implement Feature: Update `src/routes/+layout.svelte` and tests to point to `/get-involved`.
- [x] Task: Conductor - User Manual Verification 'Header Navigation Update' (Protocol in workflow.md) [checkpoint: 3718943]

## Phase 2: Footer Redesign
- [x] Task: Implement Minimalist Footer with Scripture (5dab115)
    - [ ] Sub-task: Write Tests: Verify the footer contains the Proverbs 31 scripture and the simplified links without headers.
    - [ ] Sub-task: Implement Feature: Redesign the footer in `+layout.svelte` to feature the scripture and a simple list of top-level links.
- [ ] Task: Conductor - User Manual Verification 'Footer Redesign' (Protocol in workflow.md)

## Phase 3: Site-Wide Link Audit and Cleanup
- [x] Task: Audit and Update Internal Links (b663728)
    - [ ] Sub-task: Write Tests: Verify key internal links (e.g., in `+page.svelte`, `the-standard/+page.svelte`) use consistent naming and point to active routes.
    - [ ] Sub-task: Implement Feature: Search and update all occurrences of internal links to match the new navigation structure.
- [ ] Task: Conductor - User Manual Verification 'Site-Wide Link Audit and Cleanup' (Protocol in workflow.md)
