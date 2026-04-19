# MECE Framework Analysis: Operation Gospel Site Structure

## Objective

Ensure all site content is **Mutually Exclusive** (no overlap) and **Collectively Exhaustive** (no gaps) across the public-facing pages.

**Constraints:**

- Do NOT remove content from main page (`/`)
- Do NOT modify `/georgia-battle` or `/bill-analysis` (being modified separately)
- Only address content duplication/overlap, NOT implementation

---

## Initial Assessment

### Pages Surveyed (17 public pages analyzed)

| Route                   | Purpose                                     | Category (Inferred) |
| ----------------------- | ------------------------------------------- | ------------------- |
| `/`                     | Landing page with mission overview          | Entry               |
| `/start`                | Cinematic entry point with full OG overview | Entry               |
| `/who-are-you`          | Audience segmentation quiz                  | Entry               |
| `/abolition-basics`     | Foundational education on abolition         | Learn               |
| `/the-standard`         | Equal protection doctrine comparison        | Learn               |
| `/the-confession`       | Pro-life vs abolition comparison table      | Learn               |
| `/faqs`                 | Common questions & answers                  | Learn               |
| `/timeline`             | Historical legal/campaign timeline          | Learn               |
| `/about`                | Organization history & mission              | About               |
| `/for-pastors`          | Pastoral equipping resources                | Equip               |
| `/respond`              | Prayer/Fight/Give action center             | Act                 |
| `/support`              | Prayer & Give columns                       | Act                 |
| `/burns-accountability` | Speaker Burns accountability campaign       | Act                 |
| `/rep-calls`            | Call scripts & legislator contact           | Act                 |
| `/get-involved`         | District lookup + legislator info           | Act                 |
| `/join`                 | Church network map + signup                 | Connect             |
| `/near-me`              | Local church finder + signup                | Connect             |
| `/the-gathering`        | Church network (under construction)         | Connect             |

---

## Identified MECE Violations

### 1. DUPLICATE MISSION STATEMENT

**Files:** `src/routes/about/+page.svelte:33-39` and `src/routes/start/+page.svelte:66-75`

Both pages contain **identical mission statement** text:

> "Our mission at Operation Gospel is one and the same as the mission of our Lord and our God, through a sound and bold proclamation of the Gospel the knowledge of the glory of God would cover the earth as the waters cover the sea."

**Issue:** Redundant content. The `/about` page should own organization history, while `/start` should not duplicate that content.

**Recommendation:** Remove mission statement from `/start` or differentiate it to serve a distinct purpose (e.g., `/start` becomes purely cinematic entry without doctrinal content).

---

### 2. OVERLAPPING ACTION PAGES: `/respond` vs `/support`

**Files:** `src/routes/respond/+page.svelte` and `src/routes/support/+page.svelte`

Both pages cover:

- Prayer (listed on both)
- Giving/Donations (listed on both)

`/respond` also includes a signup form, while `/support` is a two-column PRAY/GIVE layout.

**Issue:** Mutual exclusivity violation. Users may be confused about which page to use.

**Recommendation:**

- Keep `/respond` as the comprehensive "Pray. Fight. Give." action hub with all three pillars
- Deprecate `/support` OR redefine it as purely a "Support" page focused on financial giving only (remove prayer content)

---

### 3. OVERLAPPING CALL SCRIPTS: `/rep-calls` vs `/burns-accountability`

**Files:** `src/routes/rep-calls/+page.svelte:36-40` and `src/routes/burns-accountability/+page.svelte:151-158`

Both pages include sample call scripts for contacting legislators about HB 441.

**Issue:** Duplicate scripts, slightly different wording.

**Recommendation:**

- `/burns-accountability` should be the authority on burns-specific script
- `/rep-calls` should link to `/burns-accountability` for the burns script rather than duplicating it

---

### 4. OVERLAPPING CHURCH NETWORK: `/join` vs `/near-me` vs `/the-gathering`

**Files:** `src/routes/join/+page.svelte`, `src/routes/near-me/+page.svelte`, `src/routes/the-gathering/+page.svelte`

All three pages:

- Include church network/map functionality
- Have pastor CTA components
- Offer signup forms

`/the-gathering` is explicitly "under construction" and serves no current purpose.

**Issue:** Triple overlap with no clear differentiation.

**Recommendation:**

- `/join` → Primary signup page with church network map
- `/near-me` → Local church finder with district-specific context
- `/the-gathering` → Merge or remove (under construction page adds no value)

---

### 5. OVERLAPPING "WHAT IS ABOLITION" CONTENT

**Files:** Multiple pages cover similar educational content

| Page                | What It Covers                                                |
| ------------------- | ------------------------------------------------------------- |
| `/abolition-basics` | What is Abolitionism? (4 steps)                               |
| `/start`            | "What is Abolition?" section (line 86-91)                     |
| `/the-standard`     | Core doctrine, comparison grid                                |
| `/the-confession`   | Comparison table (Goal, Victim, Mother, Strategy, Exceptions) |
| `/who-are-you`      | Links to learn about HB 441                                   |

**Issue:** Similar foundational content is duplicated across multiple entry/educational pages.

**Recommendation:**

- `/abolition-basics` should be the **authoritative source** for abolition education
- Other pages should link to it rather than summarizing themselves
- `/the-standard` and `/the-confession` should be distinct in purpose:
  - `/the-standard` → The theological standard/biblical case
  - `/the-confession` → The confession/contrast with pro-life movement

---

### 6. DUPLICATE HISTORY REFERENCES

**Files:** `/timeline`, `/about`, `/start`, `/georgia-battle`

- `/timeline` has full historical events (1973-present)
- `/about` has "Our History" section mentioning "nearly a decade"
- `/start` has "For nearly a decade..." paragraph
- `/georgia-battle` has timeline cards

**Issue:** Historical context is fragmented and partially duplicated.

**Recommendation:**

- `/timeline` owns all historical content
- `/about` should reference `/timeline` for full history
- `/start` should remove personal history paragraph

---

### 7. AMBIGUOUS ENTRY POINTS

**Files:** `/` (home), `/start`, `/who-are-you`

Three different pages serve as potential entry points:

- `/` - Main landing page
- `/start` - Cinematic entry point
- `/who-are-you` - Audience segmentation quiz

**Issue:** No clear "first page" for new visitors.

**Recommendation:** Define clear roles:

- `/start` → Cinematic, emotional entry (for those arriving via strong CTAs)
- `/` → Standard landing page with clearer navigation to all paths
- `/who-are-you` → Secondary routing tool

---

### 8. "FOR PASTORS" CONTENT SCATTERED

**Files:** `/for-pastors`, `/near-me`, `/join`

- `/for-pastors` - Full pastor page with ministry areas + documentary
- `/near-me` - "Are you a Pastor?" CTA banner
- `/join` - PastorCTA component

**Issue:** Pastor-focused content is fragmented across multiple pages.

**Recommendation:**

- `/for-pastors` should be the authoritative pastor page
- `/near-me` and `/join` pastor CTAs should link to `/for-pastors` instead of duplicating content

---

## Priority Recommendations (This Pass)

### HIGH PRIORITY (MECE violations causing user confusion)

1. **Remove duplicate mission statement** from `/start` (`src/routes/start/+page.svelte:66-75`)
   - Keep `/about` as sole owner of mission statement
2. **Consolidate action pages** `/respond` and `/support`
   - Option A: Merge `/support` into `/respond` (keep `/respond` as action hub)
   - Option B: Redefine `/support` as purely financial giving page (remove prayer)

3. **Deduplicate call scripts** between `/burns-accountability` and `/rep-calls`
   - `/burns-accountability` keeps burns-specific script
   - `/rep-calls` links to burns page for that script

4. **Clarify church network pages** - `/join`, `/near-me`, `/the-gathering`
   - `/the-gathering` should be removed or marked as redirect
   - Clear distinction needed between `/join` (signup) and `/near-me` (finder)

### MEDIUM PRIORITY (Content consistency)

5. **Remove history paragraph** from `/start` (`src/routes/start:+page.svelte:73-75`)
   - Reference `/timeline` instead

6. **Link to authoritative pages** instead of summarizing
   - `/start` should link to `/abolition-basics` rather than having its own summary

7. **Pastor content consolidation**
   - `/near-me` and `/join` pastor CTAs should link to `/for-pastors`

---

## Implementation Plan (Checklist Format)

- [ ] 1. Remove mission statement from `src/routes/start/+page.svelte` (lines 66-75)
- [ ] 2. Remove history paragraph from `src/routes/start/+page.svelte` (lines 73-75)
- [ ] 3. Replace `/start` abolition summary with link to `/abolition-basics`
- [ ] 4. Redesign `/support` to be purely financial giving OR merge into `/respond`
- [ ] 5. Remove duplicate call script from `src/routes/rep-calls/+page.svelte` (replace with link to burns-accountability)
- [ ] 6. Remove or redirect `/the-gathering` page
- [ ] 7. Add explicit distinction comments in navigation config between `/join` and `/near-me`
- [ ] 8. Update pastor CTA in `/near-me` to link to `/for-pastors`
- [ ] 9. Update pastor CTA in `/join` to link to `/for-pastors`

---

## Verification Criteria

- [ ] No page contains identical content to another page
- [ ] Each page has a clear, distinct purpose with no ambiguity
- [ ] Action pages are mutually exclusive (different actions, not overlapping)
- [ ] Educational content has one authoritative source per topic
- [ ] Church/Connect pages have clear differentiation
- [ ] Pastor content is consolidated, not scattered
- [ ] Navigation reflects clear content hierarchy

---

## Alternative Approaches Considered

### Option A: Full Site Restructure

Completely reorganize into 5 categories:

- Entry (routes: `/`, `/start`, `/who-are-you`)
- Learn (routes: `/abolition-basics`, `/the-standard`, `/the-confession`, `/faqs`, `/timeline`)
- Act (routes: `/respond`, `/burns-accountability`, `/get-involved`)
- Connect (routes: `/join`, `/near-me`)
- Equip (routes: `/for-pastors`, `/about`)

**Trade-off:** Major URL changes, potential SEO impact, significant development time.

### Option B: Minimal Deduplication (Recommended This Pass)

Address only the most egregious overlaps without restructuring:

- Remove exact duplicates (mission statement, history paragraph)
- Add cross-links between related pages
- Keep page structure but clarify purposes

**Trade-off:** Some overlap remains, but worst violations addressed.

### Option C: Page Consolidation

Merge similar pages:

- `/respond` + `/support` → single action page
- `/rep-calls` + `/burns-accountability` → single accountability page
- `/join` + `/near-me` → single church network page

**Trade-off:** May reduce options for users, requires careful UX testing.
