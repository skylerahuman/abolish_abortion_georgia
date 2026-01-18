# GEMINI.md - Context & Instructions

This file serves as the primary context and instruction set for AI agents working on the **Abolition Georgia** project.

## 1. Project Identity & Mission

**Name:** Abolition Georgia
**Type:** Political Advocacy & Mobilization Platform
**Core Philosophy:** Abolitionism (vs. Pro-Life Regulation)

### The Abolitionist Standard
All code, content, and features must align with these core tenets:
1.  **Equal Protection:** The law must treat the pre-born exactly as it treats the born. No special "abortion" laws; simply the application of existing homicide statutes.
2.  **No Exceptions:** We reject any legislation that permits the murder of a child based on age, method of conception (rape/incest), or health capabilities.
3.  **Immediacy:** We demand justice *now*. We reject "incrementalism" (e.g., heartbeat bills, 15-week bans) that regulates *when* or *how* a child may be killed.
4.  **Interposition:** We call on lesser magistrates (state legislators, governors) to defy unjust federal rulings (Roe, Casey, etc.) and establish justice within their jurisdiction.

### Website Goals
*   **Mobilization:** The primary metric is *action*. Users should be driven to call, email, or visit their representatives.
*   **Education:** Clarify the distinction between "Pro-Life" (regulating abortion) and "Abolition" (ending it).
*   **Transparency:** Expose where legislators truly stand. A "Pro-Life" rating from an incrementalist group means nothing here; we grade on adherence to Equal Protection.

## 2. Technical Architecture

**Stack:**
*   **Framework:** SvelteKit 2 (Static Adapter)
*   **Language:** TypeScript (Strict Mode)
*   **Styling:** Tailwind CSS 4
*   **Maps:** Leaflet.js with OpenStreetMap & Turf.js
*   **Data Source:** Local JSON/GeoJSON (Stateless architecture preferred for GitHub Pages deployment)

**Key Directories:**
*   `src/routes/`: Application pages.
    *   `who-do-i-call/`: The core representative lookup tool.
    *   `the-standard/`: Educational content on abolitionism.
*   `src/lib/`: Shared logic.
    *   `types.ts`: Core domain models (`Legislator`, `Stance`, `Role`).
    *   `data/`: Static data files (`legislator_data.ts` serves as the source of truth for stances).
*   `static/data/`: Heavy geospatial files (`ga-congress.json`, etc.).

## 3. Development Conventions

### Coding Style
*   **Functional over Class-based:** Prefer composition and functional patterns.
*   **Strict Typing:** No `any`. Define interfaces in `src/lib/types.ts`.
*   **Tailwind:** Use utility classes directly in markup. Abstract into `@apply` only for highly reusable components (e.g., buttons, cards).
*   **Mobile-First:** 70% of traffic is expected from mobile devices (social media links). Design for touch targets and small screens first.

### Visual Identity (The "Abolitionist Aesthetic")
*   **Palette:** High contrast.
    *   Primary: Black (`#000`), White (`#fff`)
    *   Accent: Bold Red (e.g., `#ef4444` or darker blood red)
    *   Softener: Cream/Off-white (for readability on long text)
*   **Tone:** Serious, urgent, historical, authoritative. Avoid "cutesy" or "corporate generic" designs.
*   **Typography:** Strong serifs for headings (evoking legal/historical documents), clean sans-serifs for body text.

### Branching & Commits
*   **Branch Naming:**
    *   `feat/feature-name` (New functionality)
    *   `fix/bug-description` (Corrections)
    *   `content/page-update` (Text/Content changes only)
    *   `refactor/component-name` (Code restructuring)
*   **Commit Messages:** Conventional Commits (e.g., `feat: add legislator stance logic`, `fix: correct padding on mobile map`).

## 4. AI Agent Instructions

When acting as an AI developer on this project:

1.  **Terminology Check:** NEVER use the term "Pro-Life" as a synonym for our goals. Use "Abolitionist". If a user asks for "Pro-Life" features, clarify the distinction or implement them through the lens of exposing the contrast.
2.  **Assumption of Conflict:** Assume legislators (even Republicans) are *hostile* or *apathetic* until proven otherwise. The default UI state for a rep is "Target", not "Friend".
3.  **Data Integrity:** When modifying legislator data, ensure you are not overwriting manual overrides (like specific Committee Leadership roles). Check `src/lib/data/legislator_data.ts` first.
4.  **No "Happy Path" Only:** When testing the "Who Do I Call" feature, assume the user lives on a district boundary line. Ensure geospatial logic (Turf.js) handles edge cases robustly.
5.  **Performance:** The site is static. Avoid heavy client-side computations on the main thread if possible. For map operations, keep point counts reasonable or use clustering.

## 5. Current "Source of Truth"
*   **Stance Logic:** Defined in `src/lib/data/legislator_data.ts`.
*   **District Maps:** `static/data/*.json`.
*   **Copy/Content:** The Markdown files in `docs/` or `src/routes/` are the final word on messaging.

This context is settled. Do not request to "overhaul" the basic structure unless explicitly instructed. Focus on *execution* of the features within this framework.
