# Project Overhaul Plan: Abolition & Equal Protection Advocacy Platform

## Phase 1: Data Architecture & Modeling (The Foundation)

- [ ] **Define Types:** Create robust TypeScript interfaces for `Legislator`, `Committee`, `LeadershipRole`, and `Stance`.
- [ ] **Seed Data:** Create structured JSON/TS data files containing the specific names, committees, and roles provided in the brief (e.g., Judiciary Non-Civil members, Leadership, HB441 Sponsors).
- [ ] **Stance Logic:** Implement logic to determine a legislator's status (Sponsor, Opposed, Target) based on static data maps.

## Phase 2: Content & Education Modules

- [ ] **"What is HB441?":** Create a dedicated explainer page (Abolition vs Regulation, Equal Protection doctrine).
- [ ] **"Pro-life vs Abolition":** Create a comparison page/module.
- [ ] **FAQ Expansion:** Update FAQs with new specific questions (IVF, Miscarriage, Prosecution).
- [ ] **Resources:** Create sections for Pastors, Activists, and Post-abortive care.

## Phase 3: Enhanced Action Center (The "Map")

- [ ] **Refactor Lookup Engine:** Update logic to return not just the local rep, but a "Pressure Package" (Local Rep + Leadership + Committee targets).
- [ ] **UI Overhaul:** Update the results view to show "Badges" (Sponsor, Target, Committee Member) and specific Call-to-Actions (CTAs) for each.
- [ ] **Action Flows:** Create distinct scripts/templates for "Speaker", "Committee Member", and "Local Rep".

## Phase 4: Timeline & 2026 Session Tracking

- [ ] **Timeline Update:** Refactor the timeline page to focus on the 2026 legislative calendar and milestones.
- [ ] **Milestone Tracking:** Add visual indicators for current status (e.g., "Pre-Session", "In Committee").

## Phase 5: Navigation & Polish

- [ ] **Site Structure:** Reorganize navigation to prioritize "Bill Info", "Find Legislator", "Resources", "Timeline".
- [ ] **Visual Identity:** Ensure strictly "Abolitionist" branding (Red/Black/White/Cream), removing generic "pro-life" aesthetics if any.
- [ ] **Deployment:** Verify build and deployment settings.
