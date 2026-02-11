# Track Spec: Home Page Redesign & Content Integration

## Goal
To redesign the home page into a high-impact, 2-column layout that effectively communicates the failure of incrementalism using 2024-2025 data, aligning with the project's serious and authoritative tone.

## Context
The current home page does not sufficiently highlight the urgency and failure of current "pro-life" regulations. We need to present the "State of Abortion in Georgia: 2024–2025" report prominently to educate visitors immediately upon arrival.

## Requirements

### Layout
*   **Desktop:** 2-column layout.
    *   **Left Column (~65-70%):** Primary text content (Scripture + Executive Summary + Data Analysis).
    *   **Right Column (~30-35%):** "Failure Cards" summarizing key statistics.
*   **Mobile:** Stacked layout (Left column content first, or interleaved with cards for flow).

### Content - Left Column
1.  **Scripture Header:**
    *   Left-justified.
    *   Bright white text color for high contrast.
    *   Selected Scripture (to be determined or generic placeholder if not specified, likely Proverbs 24:11 or similar standard abolitionist text).
2.  **Executive Summary:**
    *   Title: "State of Abortion in Georgia: 2024–2025 and the Inadequacy of Regulatory Restriction".
    *   Text: The full executive summary provided in the prompt.
3.  **Detailed Sections:**
    *   Georgia's 2024 Abortion Statistics.
    *   Medication Abortion Prevalence.
    *   Gestational Age Distribution.
    *   Demographic Disparities.
    *   Informed Consent Gap.
    *   The Telehealth Workaround.
    *   Out-of-State Migration.
    *   Neighboring States context.
    *   Failure of the Heartbeat Bill analysis.
    *   Regional Context (Florida).
    *   Medication Abortion Problem.
    *   Summary of Evidence.
    *   Conclusion.

### Content - Right Column (Failure Cards)
*   Visually distinct cards that highlight key failure metrics.
*   **Card Ideas:**
    *   "Total Abortions: 35,860 (Estimated)" vs "Reported: 26,034"
    *   "Telehealth Gap: ~10,000 Unreported"
    *   "98% Compliance = 9% Reduction" (The Heartbeat Bill Failure)
    *   "10,750 Georgians traveled out-of-state"
    *   "Racial Disparity: Black women 6x rate of White women"

### Styling
*   **Typography:**
    *   Headings: Strong Serif (e.g., Merriweather, Playfair Display, or similar if already in project).
    *   Body: Clean Sans-Serif.
*   **Colors:**
    *   Background: Black.
    *   Text: White/Off-White (Cream for long text).
    *   Accents: Bold Red for critical data points or emphasis.

## Acceptance Criteria
*   [ ] Home page (`src/routes/+page.svelte`) implements the 2-column layout.
*   [ ] All provided text content is present and formatted correctly.
*   [ ] At least 4 "Failure Cards" are created and displayed in the right column.
*   [ ] Mobile view is responsive and readable.
*   [ ] Scripture is left-justified and bright white.
*   [ ] Project builds without errors.
