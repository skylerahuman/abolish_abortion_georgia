<<<<<<< HEAD
<<<<<<< HEAD
# AGENTS.md - AI Agent Master Instructions

This is the **primary context file** for AI agents working on the Abolition Georgia project. Read this file first, then consult specialized instruction files as needed.

## Quick Reference: Which File to Read

**Start here (AGENTS.md)** for project overview, tech stack, and architecture.

**Then consult these specialized files based on your task:**

- **testing.md** - Before writing ANY code (TDD workflow, testing requirements)
- **git_standards.md** - Before creating branches or committing (branching conventions, workflow)
- **.jules/bolt.md** - Performance patterns and lessons learned
- **.jules/palette.md** - Accessibility patterns and lessons learned

---

## 1. Project Identity & Mission

**Name:** Operation Gospel
**Type:** Political Advocacy & Mobilization Platform  
**Core Philosophy:** Gospel First Abolitionism (vs. Pro-Life Incrementalism)

### The Abolitionist Standard

All code, content, and features must align with these core tenets:

1. **Equal Protection** - The law must treat the pre-born exactly as it treats the born. No special "abortion" laws; simply the application of existing homicide statutes.
2. **No Exceptions** - We reject any legislation that permits the murder of a child based on age, method of conception (rape/incest), or health capabilities.
3. **Immediacy** - We demand justice _now_. We reject "incrementalism" (e.g., heartbeat bills, 15-week bans) that regulates _when_ or _how_ a child may be killed.
4. **Interposition** - We call on lesser magistrates (state legislators, governors) to defy unjust federal rulings and establish justice within their jurisdiction.

### Website Goals

- **Mobilization** - The primary metric is _action_. Users should be driven to call, email, or visit their representatives.
- **Education** - Clarify the distinction between "Pro-Life" (regulating abortion) and "Abolition" (ending it).
- **Transparency** - Expose where legislators truly stand on Equal Protection principles.

---

## 2. Technical Architecture

### Stack

- **Framework:** SvelteKit 2 (AUto Adapter for Vercel)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS 4
- **State Management:** Svelte 5 Runes (`$state`, `$derived`, `$effect`)
- **Maps:** Leaflet.js with OpenStreetMap tiles
- **Geospatial:** Turf.js for district/boundary calculations
- **Testing:** Vitest (unit/component) + Playwright (E2E)
- **Data:** Local JSON/CSV files (stateless architecture)

### Project Structure

```
abolition_georgia/
├── src/
│   ├── lib/
│   │   ├── components/        # Reusable Svelte components
│   │   │   ├── JoinForm.svelte
│   │   │   ├── Map.svelte
│   │   │   └── PastorCTA.svelte
│   │   ├── types/             # TypeScript type definitions
│   │   │   └── index.ts       # TimelineEvent, ContactForm, DistrictMap, Church
│   │   ├── state.svelte.ts    # Global state management (RegistrationState)
│   │   └── utils.ts           # Utility functions
│   └── routes/                # SvelteKit file-based routing
│       ├── +page.svelte       # Homepage
│       ├── join/              # Join/registration flow
│       ├── abolition-basics/  # Educational content
│       ├── faqs/              # Frequently asked questions
│       ├── for-pastors/       # Pastor-specific resources
│       ├── who-are-you/       # Identity/stance selector
│       ├── support/           # Donation/support page
│       └── about/             # About the movement
├── static/
│   └── data/                  # Static data files
│       └── zip_to_district.csv # ZIP → State House District mapping
├── tests/                     # Playwright E2E tests
├── .jules/                    # Agent learning journals
│   ├── bolt.md                # Performance optimization lessons
│   └── palette.md             # Accessibility lessons
└── TESTING_STANDARDS.md       # TDD workflow & testing requirements
```

### Key Data Models

Defined in `src/lib/types/index.ts`:

- **ContactForm** - Registration form data (name, email, phone, district, interests)
- **DistrictMap** - ZIP code to district mapping
- **Church** - Church location data (name, lat, lng)

### State Management

Global state is managed in `src/lib/state.svelte.ts`:

- **RegistrationState** - Multi-step form state with step tracking, form data, and submission status
- Uses Svelte 5 `$state` runes for reactivity

---

## 3. Development Workflow

### CRITICAL: Always Follow TDD

**Before writing ANY feature code, read TESTING_STANDARDS.md.**

The TDD loop is mandatory:

1. 🔴 **RED** - Write a failing test
2. 🟢 **GREEN** - Write minimal code to pass
3. 🔵 **REFACTOR** - Clean up while keeping tests green

### Commands

```bash
# Type checking & linting (run before committing)
npm run check

# Production build
npm run build

# Tests
npm run test:unit    # Vitest (unit/component tests)
npm run test         # Playwright (E2E tests)
npm run test:ui      # Playwright UI mode

# Code formatting
npm run lint         # Check formatting
npm run format       # Auto-format code
```

**DO NOT run `npm run dev` under any circumstances.** This is explicitly prohibited to prevent breaking an agent loop.

### Git Workflow

**Before creating branches or committing, read git_rules.md.**

Branch naming format: `type/scope-description`

Allowed types:

- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code restructuring
- `test/` - Test additions
- `docs/` - Documentation
- `chore/` - Maintenance
- `perf/` - Performance optimizations

**Never commit directly to `main`.** Always create a feature branch.

Before requesting review:

1. Run `npm run check`
2. Run `npm run build`
3. Run relevant tests

---

## 4. Development Conventions

### Code Style

- **Functional over Class-based** - Prefer composition and functional patterns (except for state classes)
- **Strict Typing** - No `any`. Define interfaces in `src/lib/types/index.ts`
- **Tailwind CSS** - Use utility classes directly in markup. Only use `@apply` for highly reusable patterns
- **Mobile-First** - 70%+ of traffic is mobile. Design for touch targets and small screens first
- **Accessibility** - Consult `.jules/palette.md` for accessibility patterns (ARIA labels, roles, etc.)
- **Performance** - Consult `.jules/bolt.md` for performance patterns (passive listeners, RAF, etc.)

### Visual Identity (The "Abolitionist Aesthetic")

**Palette:**

- Primary: Black (`#000`), White (`#fff`)
- Accent: Bold Red (`#ef4444` or darker blood red)
- Softener: Cream/Off-white (for readability on long text)

**Tone:** Serious, urgent, historical, authoritative. Avoid "cutesy" or "corporate generic" designs.

**Typography:** Strong serifs for headings (evoking legal/historical documents), clean sans-serifs for body text.

### Component Testing

Components live in `src/lib/components/`. Each component should have a co-located test file:

- `JoinForm.svelte` → `JoinForm.test.ts`
- Use `@testing-library/svelte` for component tests
- Test user-facing behavior, not implementation details

---

## 5. AI Agent Instructions

### Terminology

**NEVER use "Pro-Life" as a synonym for our goals.** Use "Abolitionist". If a user asks for "Pro-Life" features, clarify the distinction or implement through the lens of exposing the contrast.

### Assumptions

- **Assume legislative hostility** - Default stance for any legislator is "Target", not "Friend", until proven otherwise
- **Edge cases matter**
- **Performance constraints** - Site is static. Avoid heavy client-side computations. Use clustering for large point sets on maps

### Data Integrity

**Current Sources of Truth:**

- Type definitions: `src/lib/types/index.ts`
- State management: `src/lib/state.svelte.ts`

Do not "overhaul" the basic structure unless explicitly instructed. Focus on _execution_ within this framework.

### Agent-Specific Guidance

**For code generation agents:**

1. Read TESTING_STANDARDS.md first
2. Write the test before the code
3. Check `.jules/bolt.md` for performance patterns
4. Check `.Jules/palette.md` for accessibility patterns

**For git/workflow agents:**

1. Read git_standards.md for branching conventions
2. Never commit to `main`
3. Run verification commands before requesting review

**For design/UI agents:**

1. Follow the Abolitionist Aesthetic (black/white/red/gold, serious tone)
2. Mobile-first approach
3. Consult `.jules/palette.md` for accessibility requirements

---

## 6. Feature Overview

### Join Flow (`/join`)

- Multi-step registration form (3 steps)
- State managed by `registrationState` in `src/lib/state.svelte.ts`
- Uses `JoinForm` component from `src/lib/components/JoinForm.svelte`
- Includes district lookup via ZIP code mapping

### Interactive Map

- Uses `Map.svelte` component from `src/lib/components/`
- Leaflet.js for map rendering
- Turf.js for geospatial calculations
- ZIP → District lookup via `static/data/zip_to_district.csv`

### Educational Pages

- `/abolition-basics` - Core abolitionist principles
- `/faqs` - Common questions
- `/for-pastors` - Pastor-specific resources with PastorCTA component

---

## 7. Common Tasks & How to Approach Them

### Adding a New Page

1. Create `src/routes/page-name/+page.svelte`
2. Add types to `src/lib/types/index.ts` if needed
3. Write component tests (co-located `.test.ts` files)
4. Write E2E test in `tests/`
5. Update this file (AGENTS.md) if it changes architecture

### Adding a New Component

1. Create `src/lib/components/ComponentName.svelte`
2. Write test first: `src/lib/components/ComponentName.test.ts`
3. Follow TDD workflow (RED → GREEN → REFACTOR)
4. Ensure accessibility (ARIA labels, keyboard navigation)

### Modifying Data

1. Check if data is in `static/data/` (zip_to_district.csv) or `src/lib/data/` (timeline.json)
2. Ensure types in `src/lib/types/index.ts` match data structure
3. Update tests to reflect new data structure

### Performance Optimization

1. Read `.jules/bolt.md` for existing patterns
2. Focus on scroll handlers, map rendering, and mobile performance
3. Use `requestAnimationFrame`, passive listeners, and layout caching

### Accessibility Improvements

1. Read `.Jules/palette.md` for existing patterns
2. Use `role`, `aria-label`, `aria-busy` appropriately
3. Test with screen readers and keyboard navigation

---

## 8. What NOT to Do

- ❌ **Do NOT run `npm run dev`** - Explicitly prohibited
- ❌ **Do NOT commit directly to `main`** - Always use feature branches
- ❌ **Do NOT write code before tests** - Follow TDD workflow
- ❌ **Do NOT use `any` type** - Use strict TypeScript types
- ❌ **Do NOT use "Pro-Life" terminology** - Use "Abolitionist"
- ❌ **Do NOT overhaul architecture** - Work within existing framework
- ❌ **Do NOT skip accessibility** - ARIA labels and roles are required
- ❌ **Do NOT ignore mobile** - Mobile-first design is mandatory

---

## Summary

This file provides the complete context needed to work on Abolition Georgia. For specialized tasks, consult:

- **TESTING_STANDARDS.md** - TDD workflow
- **git_rules.md** - Git/branching conventions
- **.jules/bolt.md** - Performance patterns
- **.Jules/palette.md** - Accessibility patterns

The project structure is settled. Focus on _execution_ of features within this framework, following TDD, accessibility best practices, and the Abolitionist mission.
=======
=======
>>>>>>> Home-Page-Revisions
# Project: Abolish Abortion Georgia

## Project Overview

This is a SvelteKit web application for "Abolish Abortion Georgia," a movement dedicated to the complete abolition of abortion in Georgia. The application serves as an informational and mobilization hub for activists.

The main technologies used are:
- **Framework**: SvelteKit
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Mapping**: Leaflet.js with OpenStreetMap tiles
- **Geospatial Analysis**: Turf.js

The project's architecture is a standard SvelteKit application with routes for different pages. The most complex feature is the "Who Do I Call" page (route: /form), which uses Leaflet.js and Turf.js to create an interactive map that allows users to find their elected representatives based on their ZIP code.

## Building and Running

### Development

To run the development server:

```sh
npm install
npm run dev
```

### Building

To create a production build:

```sh
npm run build
```

This will create a static site in the `docs` directory, configured for deployment to GitHub Pages.

### Checking

To run the type checker and linter:

```sh
npm run check
```

## Development Conventions

- **Styling**: The project uses Tailwind CSS for styling. Utility classes are used directly in the Svelte components.
- **Data**: The application relies on several JSON files located in the `static/data` directory. These files contain information about elected representatives, points of contact, and GeoJSON data for electoral districts.
- **Mapping**: The interactive map is built using Leaflet.js. The `form` page contains the logic for geocoding, district lookup, and map rendering.
- **State Management**: The project uses Svelte's built-in state management capabilities (`$state`).
<<<<<<< HEAD
>>>>>>> Content-Changes-By-Skyler
=======
>>>>>>> Home-Page-Revisions
