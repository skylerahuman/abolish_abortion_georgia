# Georgia Battle Page Improvement Plan

## Objective

Transform the Georgia Battle page from verbose, emoji-laden marketing copy into authentic, concise content that communicates with clarity and urgency. Remove all visual noise (emojis, excessive whitespace, filler language) and replace it with direct, human writing.

---

## Implementation Plan

### Phase 1: Header Section Cleanup

- [ ] **Simplify the page title** - Remove "The Current Battleground" dramatic header. Replace with direct messaging: "The Georgia Battle" or remove entirely if redundant with navigation. The h1 at lines 101-103 adds drama without substance.
- [ ] **Condense the header paragraph** - Lines 107-112 contain two paragraphs that say essentially the same thing. Merge into one tight statement about HB 441 and its purpose.
- [ ] **Remove decorative share button text** - The share button text "Share →" and "Copied! ✓" is fine functionally, but the "✓" is an emoji. Replace with "Copied" or styled checkmark.

### Phase 2: Progress Tracker Simplification

- [ ] **Reduce padding and whitespace** - Lines 128-133: The `p-6` padding and `mb-16` margin can be reduced. Change to `p-4` and `mb-12` for tighter layout.
- [ ] **Streamline status copy** - "Killed in Committee" is good. The subtext "Speaker Jon Burns refused to allow a vote. April 2026." could be tighter: "Speaker Burns refused to allow a vote—April 2026."

### Phase 3: Timeline Content Tightening

- [ ] **Edit timeline.json descriptions** - Several timeline entries could be tightened:
  - Line 13: "While a step forward, it still allows abortion before 6 weeks and contains exceptions." → "It still allows abortion before 6 weeks. Exceptions remain."
  - Line 20: "The authority to protect life is returned to the states. The excuse of 'federal tyranny' is removed." → "The authority to protect life returns to the states."
  - Line 27: "It provides equal protection for the preborn from the moment of fertilization." → "Equal protection from fertilization."
- [ ] **Remove emoji from timeline type label** - Line 150: "⭐ Gospel Hope" → "Gospel Hope" or "Victory"
- [ ] **Remove timeline section margin** - Line 136: `mb-16` → `mb-12`

### Phase 4: Comparison Table Rewrite

- [ ] **Remove emojis from check/X marks** - Lines 187, 194, 201, 217, 224, 231: Replace `❌` and `✅` with styled SVG icons or CSS-based indicators (colored dots, bordered shapes).
- [ ] **Simplify table headers** - Line 213: "The New Way: HB 441 ⭐ The Standard" → "The New Way: Equal Protection"
- [ ] **Tighten item descriptions** - Several items are verbose:
  - Line 190: "Protects life only after heartbeat, 15 weeks, or viability" → "Protects only after heartbeat, 15 weeks, or viability"
  - Line 204: "Bows to federal court opinions" → "Subordinate to federal courts"
  - Line 220: "Defines life from fertilization. No arbitrary limits." → "Life from fertilization. No exceptions."
  - Line 227: "Same laws protecting born people apply to pre-born" → "Same laws protect the pre-born"
  - Line 234: "Asserts state sovereignty to protect life" → "Asserts state sovereignty"

### Phase 5: Bottom Section Condensation

- [ ] **Replace bottom copy** - Lines 242-246: The current copy ("HB 441 was killed in committee. Speaker Burns chose political calculation over the lives of the preborn. The fight for accountability continues.") is repetitive ("killed," "fight") and uses "preborn" inconsistently. Replace with: "Speaker Burns killed HB 441 in committee. We remember. We hold him accountable."
- [ ] **Reduce bottom section margin** - Line 242: `mb-12` → `mb-8`

### Phase 6: Global Whitespace Reduction

- [ ] **Audit and reduce vertical spacing** - Review all section margins (`mb-*`) and reduce by one step (e.g., `mb-16` → `mb-12`, `mb-12` → `mb-8`).
- [ ] **Tighten padding in cards/panels** - Reduce `p-6` to `p-4` or `p-5` in non-critical containers.
- [ ] **Reduce card internal spacing** - Timeline card `py-4` can stay but `space-y-8` (line 136) can become `space-y-6`.

---

## Verification Criteria

1. **Zero emojis** - A search for emoji characters (⭐, ❌, ✅) returns no results in the compiled page.
2. **Reduced whitespace** - Total vertical spacing should be reduced by approximately 20-30% compared to current state.
3. **Content clarity** - All descriptions read as direct statements, not marketing copy.
4. **Consistent terminology** - Use "pre-born" or "unborn" consistently throughout.
5. **Readable at a glance** - Key information (bill status, what HB 441 does) should be scannable in under 5 seconds.

---

## Potential Risks and Mitigations

1. **Over-condensation risk** - Removing too much context could make the page harder to understand for newcomers.
   - _Mitigation_: Keep the timeline descriptions substantive enough to explain the legal history. Focus trimming on adjectives and marketing language.

2. **Test breakage** - The Playwright test (line 42 in `tests/georgia-battle.spec.ts`) expects "Copied! ✓".
   - _Mitigation_: Update the test to expect "Copied" without the checkmark.

3. **Accessibility concerns** - Replacing emojis with CSS shapes requires ensuring visual distinction for color-blind users.
   - _Mitigation_: Use both color and shape (e.g., red X with text, green check with text) rather than color alone.

---

## Alternative Approaches

1. **Icon library approach** - Replace emojis with SVG icons from a library like Heroicons or Lucide. This is cleaner but requires adding a dependency or including icon markup inline.
   - _Trade-off_: More markup but better accessibility and visual consistency.

2. **Minimalist rewrite** - Go further and consider removing the comparison table entirely, replacing it with inline bullet points or a single paragraph comparison.
   - _Trade-off_: Could reduce cognitive load but may lose the clear contrast between "old" and "new" approaches.

3. **Progressive disclosure** - Collapse the timeline into an accordion or "show more" pattern, keeping the initial view extremely tight.
   - _Trade-off_: Better for mobile but may reduce engagement with historical content.

---

## Clarity Assessment and Assumptions

- **Assumption**: The audience is already familiar with basic abortion politics and doesn't need "heartbeat bill" explained.
- **Assumption**: "Pre-born" is the preferred term on this site (used in line 227, 244), but "unborn" appears in abolition-basics. Recommend standardizing on "pre-born" throughout.
- **Assumption**: The page should remain a single-scroll experience without tabs or accordions.
- **Assumption**: The "Progress Tracker" box should remain visible rather than linking elsewhere.
