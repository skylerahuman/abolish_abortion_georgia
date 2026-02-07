# Moving Changes Stashed - Status & Next Steps

## Branch Information

- **Branch:** Moving-Changes-Stashed
- **Last Commit:** 507e693 - "WIP: Moving changes to new branch"
- **Author:** skylerahuman
- **Date:** Thu Jan 15 17:54:29 2026 -0500

## What Was Being Worked On

### Overview

This branch contains work-in-progress changes for a new **Join/Signup flow** on the abolition_georgia website. The focus is on creating an interactive multi-step form that helps users find their Georgia House District and sign up to support the cause.

### Key Features Implemented

#### 1. **JoinForm Component** (`src/lib/components/JoinForm.svelte`)

A comprehensive 3-step form with:

- **Step 1: District Finder**
  - ZIP code lookup to identify Georgia House Districts
  - Uses `/data/zip_to_district.csv` for mapping
  - Animated "scramble" effect when finding district
  - District persistence via localStorage
  - "Not in Georgia" checkbox for out-of-state supporters
- **Step 2: Contact Information**
  - Fields: First Name, Last Name, Email, Phone (optional)
  - Form validation
- **Step 3: Interests & Church**
  - Home church input
  - Interest checkboxes:
    - Find an abolitionist church
    - Help pass an abolition bill
    - Evangelism involvement
    - Pastor/elder interest
    - Prayer support

#### 2. **Map Component** (`src/lib/components/Map.svelte`)

- Leaflet-based interactive map of Georgia
- Custom church pin icons (`/images/church-pin.svg`)
- Dark theme CartoDB basemap
- Displays 75 randomly generated church locations
- Zoom controls disabled for cleaner UX

#### 3. **PastorCTA Component** (`src/lib/components/PastorCTA.svelte`)

- Call-to-action card for pastors
- "Add Your Church" button
- Placeholder functionality to scroll to form and pre-select pastor interest

#### 4. **Supporting Files**

- `src/lib/stores.ts` - Form step management store
- `static/images/church-pin.svg` - Custom SVG icon for map markers
- `src/app.css` - Added `.church-pin-icon` CSS class

### Route Changes

- Created `/join` route structure
- Modified `src/routes/+layout.svelte` to incorporate JoinForm, Map, and PastorCTA in the join page layout
- **Removed** `src/routes/near-me/+page.svelte` (functionality consolidated into new join flow)
- Updated homepage link to point to `/join`

### Context from Previous Commit

The commit before this (ca62272) included "Minor tweaks to page layout, content and styling before moving to page-by-page updates across the whole site." This suggests the intention was to stabilize the current pages before implementing broader site-wide changes.

## Next Steps

### Immediate Tasks

1. **Data File Setup**
   - Ensure `/data/zip_to_district.csv` exists and is properly formatted
   - Verify ZIP code to district mappings are accurate

2. **Form Backend Integration**
   - Currently form submission is a console.log placeholder
   - Need to implement actual form submission endpoint
   - Consider email service (Mailchimp, SendGrid, etc.) or database integration

3. **Church Data**
   - Replace `generateRandomChurches(75)` with real church data
   - Create data source for actual abolitionist church locations
   - Add church details (name, address, contact info, etc.)

4. **Testing**
   - Test ZIP lookup functionality across all Georgia ZIP codes
   - Test form validation and error states
   - Test map rendering and performance
   - Mobile responsiveness testing

### Enhancements

5. **Pastor CTA Integration**
   - Wire up PastorCTA button to actually pre-select "pastor/elder" checkbox in form
   - Consider using a Svelte store or context for cross-component communication

6. **UI/UX Polish**
   - Review transitions and animations
   - Accessibility audit (ARIA labels, keyboard navigation)
   - Loading states for map initialization

7. **AGENTS.md Note**
   - The commit updated AGENTS.md to say "Do not run the development server"
   - May need to clarify or revert this depending on development workflow

### Before Merge

8. **Code Review**
   - Review removed `/near-me` page to ensure no lost functionality
   - Verify all internal links updated to point to `/join`
   - Check for any console.log statements or debug code

9. **Documentation**
   - Update README if needed with new /join route
   - Document form submission process once implemented
   - Add instructions for church data updates

## Files Changed Summary

- Modified: `AGENTS.md`, `src/app.css`, `src/routes/+layout.svelte`, `src/routes/+page.svelte`, `src/routes/join/+page.svelte`
- Added: `src/lib/components/JoinForm.svelte`, `src/lib/components/Map.svelte`, `src/lib/components/PastorCTA.svelte`, `src/lib/stores.ts`, `static/images/church-pin.svg`
- Deleted: `src/routes/near-me/+page.svelte`

**Total Changes:** 11 files changed, 543 insertions(+), 397 deletions(-)
