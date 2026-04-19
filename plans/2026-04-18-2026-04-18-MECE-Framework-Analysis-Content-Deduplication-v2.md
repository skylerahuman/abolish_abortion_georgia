# MECE Content Restructuring: Georgia Battle and Burns Accountability

## Objective

Apply the McKinsey MECE (Mutually Exclusive, Collectively Exhaustive) framework to restructure the content strategy for Georgia's abolition battle.

1. **Mutually Exclusive**: Ensure no duplicated ideas between the `georgia-battle` and `burns-accountability` pages. The `georgia-battle` page will strictly cover the _What_ and _Why_ of the bill (omitting any mention of its failure or Speaker Burns), while the `burns-accountability` page will cover the _Who_, _How_, and _Political Reality_ of its defeat.
2. **Collectively Exhaustive**: Ensure the combined content covers everything a user needs to know, including the theological/legal foundation of the bill, the political mechanics of its defeat, and a comprehensive explanation of why a primary threat is the necessary response.

## MECE Content Architecture

### Bucket A: The Moral & Legal Case (`georgia-battle`)

- **Context**: Georgia's abortion history (Doe v. Bolton) and the inadequacy of the Heartbeat Law.
- **Theology**: Imago Dei, Duty of Government, Equal Weights & Measures.
- **Solution**: HB 441 scrollytelling analysis (Personhood, Homicide Law, Immunity Repeal, Interposition).
- **Comparison**: Heartbeat vs. Equal Protection.
- **Teaser**: "Find out why this bill didn't get a vote in 2026" (Redirect to Bucket B).

### Bucket B: The Political Reality & Retribution (`burns-accountability`)

- **The Autopsy**: HB 441 had 20+ sponsors but died in committee without a floor vote.
- **The Architect**: Speaker Jon Burns' unilateral power to block legislation.
- **The Motivation**: _[New Content]_ Why he killed it (Establishment pragmatism, protecting vulnerable members from recorded votes, defying the GOP platform).
- **The Retribution**: Direct pressure (calls) and _[Expanded Content]_ the mechanics and necessity of a Primary challenge to hold safe-seat leadership accountable.

## Implementation Plan

### Task 1: Overhaul `georgia-battle/+page.svelte` (Bucket A)

- [ ] Task 1.1. Delete the entire "Speaker Burns and HB 441" section, including the action cards and the `callScript` variable.
- [ ] Task 1.2. Scrub the remaining text for any mentions of "Burns" or the bill's failure. (e.g., Change "Speaker Burns killed it in committee" to "This legislation establishes the standard for equal protection.")
- [ ] Task 1.3. Restructure the page to incorporate the split-screen scrollytelling design currently found in `bill-analysis/+page.svelte`.
- [ ] Task 1.4. Implement an `IntersectionObserver` action to animate the left-side bill text automatically as the user scrolls through the theological/legal callouts on the right.
- [ ] Task 1.5. Add a "Teaser" section at the bottom of the page (before the final CTA) with the exact text: "Find out why this bill didn't get a vote in 2026." Wrap this in a prominent link redirecting to `/burns-accountability`.

### Task 2: Exhaustive Expansion of `burns-accountability/+page.svelte` (Bucket B)

- [ ] Task 2.1. Fix the layout bug around lines 66-69 by removing the duplicated text ("Speaker Jon Burns refused to let it reach the floor for a vote.") and properly closing the `<p>` tag.
- [ ] Task 2.2. Expand the "What Happened" / "The Short Version" section to explicitly detail the _political motivation_ behind killing the bill. Explain that leadership often kills abolition bills to protect members from taking "tough votes" in an election year, prioritizing establishment pragmatism over the party platform.
- [ ] Task 2.3. Expand the "Primary Burns" section. Explain _why_ a primary threat is the ultimate accountability mechanism for a Speaker in a safe Republican district who ignores the grassroots base. Detail what is required (recruiting a challenger, funding, grassroots mobilization).
- [ ] Task 2.4. Ensure the call script for Speaker Burns is prominently displayed and contextually tied to the political reality explained above.

### Task 3: Enforce Mutual Exclusivity in `rep-calls/+page.svelte`

- [ ] Task 3.1. Open `src/routes/rep-calls/+page.svelte`.
- [ ] Task 3.2. Remove the "Contact Speaker Burns" section and its associated call script.
- [ ] Task 3.3. Replace it with a brief redirect link: "Looking to contact Speaker Burns regarding HB 441? [Go to the Burns Accountability page]" to ensure the Burns call script and strategy live exclusively on the accountability page.

## Verification Criteria

- [ ] `georgia-battle` contains zero mentions of "Burns" or the bill's failure.
- [ ] `georgia-battle` successfully implements the scrollytelling bill analysis.
- [ ] `georgia-battle` includes the teaser redirecting to the accountability page.
- [ ] `burns-accountability` explains _why_ Burns killed the bill (political motivations).
- [ ] `burns-accountability` exhaustively explains the strategy and necessity of a primary challenge.
- [ ] `rep-calls` no longer contains the Burns call script, redirecting users to the accountability page instead.

## Potential Risks and Mitigations

1. **Scrollytelling Complexity**
   Mitigation: Porting the `bill-analysis` scrollytelling logic requires careful state management. Extract the scrollytelling logic into a reusable component if the `georgia-battle` file becomes too large.
2. **Content Tone**
   Mitigation: Ensure the expanded political reality and primary threat sections maintain a professional, objective, yet firm tone appropriate for a political advocacy organization.

## Alternative Approaches

1. **Complete Componentization**: Instead of porting the scrollytelling code directly into `georgia-battle`, convert the entirety of `bill-analysis/+page.svelte` into a `<BillScroller />` component that can be imported into `georgia-battle`, keeping the page file clean and strictly focused on layout composition.
