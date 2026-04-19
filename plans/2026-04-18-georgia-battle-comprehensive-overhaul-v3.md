# Georgia Battle Page - Comprehensive Overhaul Plan

## Objective

Transform the Georgia Battle page into the definitive resource for understanding HB 441 and the abolitionist cause in Georgia. This requires:

1. **Consolidate the Bill Analysis page** (`/bill-analysis`) into this page
2. **Dramatically increase content density** - every section should carry substantive weight
3. **Authentic abolitionist tone** - no marketing fluff, no emojis, no filler
4. **Tighten formatting** - reduce whitespace by ~30%, eliminate decorative elements
5. **Strengthen theological and legal foundation** - ensure every claim is grounded

---

## Target Audience Profile

**Primary:** Christians in Georgia who believe abortion is murder and want to see it abolished—not regulated.

**Psychographic drivers:**

- Frustration with 50 years of "incrementalism" that accomplished nothing
- Hunger for bold, consistent, biblical faithfulness
- Desire to see the Church fulfill its prophetic role
- Willingness to engage politically but not reduction to mere politics
- Understanding that this is a spiritual battle requiring Gospel witness

**What they respond to:**

- Scripture grounding every claim
- Moral clarity without compromise
- Direct address (second person)
- Convicting language that challenges comfortable Christianity
- Concrete action steps, not vague "get involved"
- Honest acknowledgment of setbacks and failures

**What they reject:**

- Evangelical jargon ("life," "choice," "woman's body")
- Soft language that minimizes the atrocity
- Political calculus that sacrifices principle for pragmatism
- Content that reads like it was focus-grouped

---

## Assumptions

- Audience has basic familiarity with abortion politics but may not understand abolitionist distinctives
- The target reader should finish the page understanding what HB 441 does, why it matters, what happened, and what they must do
- Content should be scannable but reward deeper reading
- "Pre-born" is the preferred term (standardize throughout)
- Page remains single-scroll; no tabs or accordions for core content
- This is evangelism through information—a tool for Gospel-centered political engagement

---

## Implementation Plan

### Phase 1: Page Structure Redesign

- [ ] **Consolidate layout** - Merge the bill analysis content (split view, exegesis sections) into a single integrated narrative flow
- [ ] **Create section hierarchy** - Restructure into logical sections: The Reality, HB 441 Explained, What It Does, Why It Must Pass, What Happened, What Now
- [ ] **Reduce decorative elements** - Remove animations, gradient backgrounds, decorative icons. Let the content hit hard on its own.
- [ ] **Establish visual hierarchy** - Clear section breaks using typography and spacing, not icons or graphics

### Phase 2: Opening Section (The Conviction)

- [ ] **Lead with the moral reality** - Open by stating the horror, not the policy. Before HB 441, before politics: the pre-born are being killed. Make it undeniable.
- [ ] **Direct headline** - Replace "The Current Battleground" with something that names the evil: "The Children Are Dying" or "50 Years of Blood on Georgia's Hands"
- [ ] **Add Scripture anchor** - Proverbs 31:8-9 as the thematic foundation: "Open thy mouth for the dumb in the cause of all such as are appointed to destruction."
- [ ] **Establish the failure** - Name the 50-year compromise of the "pro-life movement" directly. Don't soften it. This audience needs conviction, not comfort.

### Phase 3: Introduction Section

- [ ] **Replace dramatic header** - Remove "The Current Battleground" and "Georgia HB 441: Equal Protection" dual headlines. Use single direct headline: "HB 441: The Equal Protection Act"
- [ ] **Condense intro copy** - Lines 107-112 merge into one tight paragraph stating: HB 441 was the most comprehensive equal protection bill for pre-born children in Georgia history. Speaker Burns killed it in committee.
- [ ] **Streamline status box** - Keep "Killed in Committee" but tighten language: "Speaker Burns refused to allow a vote—April 2026"
- [ ] **Add bill sponsors context** - Note Emory Dunahoo as author, 20+ co-sponsors, overwhelming constituent support

### Phase 4: Timeline Section (Condensed)

- [ ] **Edit timeline.json** - Tighten all descriptions with convicting language:
  - "While a step forward..." → "Still allows abortion before 6 weeks. Exceptions remain."
  - "Roe v. Wade is overturned. The authority to protect life is returned to the states. The excuse of 'federal tyranny' is removed." → "Roe v. Wade overturned. Authority to protect life returns to the states."
  - "The Georgia Equal Protection Act is introduced. It provides equal protection for the preborn from the moment of fertilization." → "Equal Protection Act introduced. Life from fertilization. No exceptions."
- [ ] **Remove timeline type emoji** - "⭐ Gospel Hope" → "Victory"
- [ ] **Integrate timeline from `/timeline` page** - Pull in key events from the comprehensive timeline (Doe v. Bolton, Casey, Dobbs) to create a condensed legal history
- [ ] **Add Doe v. Bolton reference** - This Georgia case defined "health of mother" so broadly that abortion was allowed on demand through all nine months. Name this explicitly—it's personal to Georgians.

### Phase 5: Bill Analysis Section (Integrated)

- [ ] **Create key provisions breakdown** - Based on hb441.txt, present the four core sections with convicting commentary:
  1. **Findings** (Sections 1, 6) - Constitutional basis: Georgia Constitution Art. I §I ¶I (due process), Art. I §I ¶II (equal protection), 14th Amendment. This is not novel legal theory—it's enforcing what the Constitution already demands.
  2. **Definition of Person** (Section 3) - "Human being" includes pre-born at every stage from fertilization until birth. Finally, the law recognizes what science and Scripture have always known.
  3. **Equal Application** (Section 3) - Same presumptions, defenses, immunities as born persons. No special exceptions. No half-measures.
  4. **Repeal of Exceptions** - Removes provisions enabling prenatal homicide. No more legal immunity for those who pay for murder.
- [ ] **Add coercion defense explanation** - HB 441 includes a coercion defense for mothers (they can still claim duress) but NOT immunity. Address the objection: this bill does not abandon mothers—it protects them from those who would pressure them while still holding aborters accountable.
- [ ] **Remove split-view architecture** - Integrate bill text references inline rather than in separate terminal-style panel
- [ ] **Include bill text excerpts** - Quote the actual language where it matters. Let the Word and the law speak together.

### Phase 6: Theological & Legal Foundation (The Why)

- [ ] **Establish the imago Dei argument** - Human life begins at fertilization (scientific fact). Pre-born children bear the image of God (Jeremiah 1:5, Psalm 139:13-16). Therefore, they deserve equal legal protection. This is not sentiment—it is the doctrine of the image of God applied.
- [ ] **Add interposition theology** - HB 441 asserts state sovereignty against unjust federal court rulings. This is not optional—it is the duty of state legislators (Romans 13, Proverbs 31:8-9). God has established government for the punishment of evil (Romans 13:4). There is no neutrality.
- [ ] **Address the "Second Victim" narrative** - Opposition from "pro-life" groups stems from their commitment to never prosecuting mothers. HB 441 does not criminalize women for coerced abortions (coercion defense exists) but does hold accountable those who willingly procure or perform abortions. Name this clearly: you do not absolve a mother by convicting the hitman. You do both.
- [ ] **No exceptions is the standard** - You do not kill a child for the crime of the father. Rape and incest exceptions are a compromise with murder. Every child made in God's image deserves protection—no matter the circumstances of conception.

### Phase 7: Comparison Section (Reform)

- [ ] **Remove emojis** - Replace ❌ and ✅ with styled text indicators (X, ✓) or CSS shapes
- [ ] **Simplify comparison** - Rename "Old Way: Regulation" → "Half-Measures" and "New Way: HB 441" → "Equal Protection"
- [ ] **Tighten descriptions** - All items should be scannable in under 5 seconds
- [ ] **Add convicting commentary** - Don't just compare policies—name the moral failure. "Arbitrary lines" isn't just legally imprecise, it leaves children to die.

### Phase 8: Accountability Section (The Betrayal)

- [ ] **Lead with the betrayal** - Speaker Burns didn't just "kill a bill." He betrayed the pre-born, the voters, and his oath of office. Name it plainly.
- [ ] **Expand Burns accountability content** - Move content from `/burns-accountability` inline:
  - What Speaker Burns did: refused to let HB 441 reach the floor
  - Why: protecting vulnerable Republican seats
  - The implications: without removing or pressuring Burns, no equal protection bill will pass Georgia
- [ ] **Add action options** - Condensed from burns-accountability: Contact Burns, pressure other Republicans, primary challenge, support the movement
- [ ] **Include call script** - One sample script for contacting Burns directly

### Phase 9: Bottom Section (The Response)

- [ ] **Replace bottom copy** - Current "HB 441 was killed... The fight for accountability continues" is weak. Replace with: "Speaker Burns killed HB 441. We remember. We hold him accountable."
- [ ] **Consolidate CTAs** - Reduce to two: "Join the Fight" and "Support the Cause"
- [ ] **Reduce vertical spacing** - Reduce all `mb-*` margins by one step throughout

### Phase 10: Navigation Updates

- [ ] **Update navigation.ts** - Either redirect `/bill-analysis` to `/georgia-battle` or hide it from navigation
- [ ] **Update tests** - Update `tests/georgia-battle.spec.ts` for any UI changes
- [ ] **Update all internal links** - Ensure references to bill-analysis across the site point to georgia-battle

### Phase 11: Content Quality Audit

- [ ] **Remove all emojis** - No ⭐, ❌, ✅ anywhere on the page
- [ ] **Audit for filler language** - Search for "step forward," "meaningful," "crucial," "important" and replace with direct statements
- [ ] **Verify terminology consistency** - All references to pre-born children should use "pre-born" (not "unborn" or "preborn")
- [ ] **Check link text** - All link text should be action-oriented, not decorative

---

## Verification Criteria

| Criterion            | Description                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Content Density      | Page contains substantive content equivalent to current georgia-battle + bill-analysis + burns-accountability combined |
| Zero Emojis          | Search for emoji characters returns no matches                                                                         |
| Authenticity         | Content reads as genuine abolitionist advocacy, not marketing copy                                                     |
| Tight Formatting     | Vertical spacing reduced by ~30% compared to current state                                                             |
| Terminology          | "Pre-born" used consistently throughout                                                                                |
| Scannability         | Key information (bill status, core provisions, action steps) scannable in under 10 seconds                             |
| Navigation Integrity | All internal links resolve correctly after consolidation                                                               |

---

## Potential Risks and Mitigations

1. **Overwhelm risk** - Consolidating three pages into one could overwhelm readers
   - _Mitigation_: Use clear visual hierarchy with distinct section headers. Prioritize scannability. Move detailed exegesis to expandable sections or footnotes.

2. **Test breakage** - Multiple tests may fail after navigation changes
   - _Mitigation_: Update tests for bill-analysis route (redirect to georgia-battle). Update georgia-battle spec for new UI elements.

3. **Accessibility concerns** - Removing emojis requires ensuring visual indicators are distinguishable
   - _Mitigation_: Use both color and text-based indicators (e.g., "[X]" and "[✓]" with color coding)

4. **Redirect SEO impact** - Redirecting bill-analysis could affect search rankings
   - _Mitigation_: Use 301 redirects and update sitemap

---

## Alternative Approaches

1. **Progressive disclosure** - Keep some content in expandable sections to reduce initial overwhelm while maintaining depth
   - _Trade-off_: Better mobile experience but reduces initial content density

2. **Multi-page consolidation** - Instead of one mega-page, create a "/georgia-battle" hub that links to sub-pages for bill text, exegesis, and accountability
   - _Trade-off_: Better organized but less "single source of truth"

3. **Content-first with separate bill-analysis** - Keep bill-analysis as a technical reference but link heavily from georgia-battle
   - _Trade-off_: Maintains split-view for power users but creates two-page experience

---

## Key Content Sources (for reference)

| Source                                         | Content to Integrate                                       |
| ---------------------------------------------- | ---------------------------------------------------------- |
| `src/routes/georgia-battle/+page.svelte`       | Timeline, comparison, current status                       |
| `src/routes/bill-analysis/+page.svelte`        | Bill provisions, exegesis framework                        |
| `static/hb441.txt`                             | Actual bill text with section references                   |
| `src/routes/burns-accountability/+page.svelte` | Burns accountability narrative, action options             |
| `src/routes/the-standard/+page.svelte`         | Core doctrine, comparison grid                             |
| `src/routes/the-confession/+page.svelte`       | Abolition vs. pro-life distinction, theological foundation |
| `src/routes/faqs/+page.svelte`                 | Common objections and responses                            |
