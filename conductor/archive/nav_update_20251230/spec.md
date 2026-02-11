# Track Spec: Navigation Update and Footer Simplification

## Overview
Redesign the global navigation and footer to streamline the user experience and reinforce the site's primary message. This involves updating labels, auditing all internal links, and creating a minimalist footer centered on the Proverbs 31 scripture.

## Functional Requirements

### 1. Header Navigation Update
*   **Labels:** Update the primary navigation items to:
    *   **Home** (linking to `/`)
    *   **Timeline** (linking to `/timeline`)
    *   **Get Involved** (linking to `/get-involved`)
    *   **FAQs** (linking to `/faqs`)
*   **Audit:** Ensure these updates are reflected in the mobile navigation menu as well.

### 2. Footer Redesign
*   **Scripture Focus:** Replace the current footer grid with the Proverbs 31:8-9 translation used in the home page hero section. This should be the primary visual element.
*   **Minimalist Links:** 
    *   Remove column headers (Mobilize, Educate, Connect).
    *   Remove redundant branding/logos.
    *   Display only top-level navigation links (Home, Timeline, Get Involved, FAQs) in a simple horizontal or vertical list.
*   **Aesthetic:** Use the established high-contrast palette (Black background, White text) with serif fonts for the scripture.

### 3. Site-Wide Link Audit
*   Audit and update all internal links (e.g., buttons on sub-pages, "The Standard" link, etc.) to ensure consistent naming and routing.

## Non-Functional Requirements
*   **Responsiveness:** Footer must remain clean and readable on mobile devices.
*   **Consistency:** The Scripture translation in the footer must exactly match the text used in the hero section.

## Acceptance Criteria
*   [ ] Header navigation displays labels: Home, Timeline, Get Involved, FAQs.
*   [ ] Footer features the Proverbs 31 scripture prominently as the main content.
*   [ ] Footer navigation links are simplified and lack headers.
*   [ ] All internal site links are verified to point to the new top-level structure.
*   [ ] The "Abolitionist Aesthetic" is maintained across all UI changes.

## Out of Scope
*   Significant content changes to the Timeline, Standard, or FAQ pages.
*   Changes to the "Who Do I Call" mapping logic.
