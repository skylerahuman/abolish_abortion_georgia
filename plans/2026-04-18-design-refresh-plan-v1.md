# Design Refresh Plan: Abolition Georgia

## Objective

Transform Operation Gospel's digital presence into a design that embodies **reverent urgency** - a site that feels like walking into a sanctuary where serious work is happening. The aesthetic will blend **Reformed/Traditional warmth** (classical typography, rich liturgical colors, reverent atmosphere) with **Brutalist clarity** (stark contrasts, unapologetic typography, confrontational truth-telling).

---

## Strategic Analysis

### Current State Assessment

| Area | Current State | Assessment |
|------|--------------|------------|
| **Typography** | Libre Baskerville + Inter | Serviceable but generic serif/sans pairing |
| **Color** | Obsidian + Crimson + Gold | Good foundation, lacks warmth and depth |
| **Layout** | Standard grids, centered content | Functional but forgettable |
| **Motion** | Basic fade-ins only | Minimal, no scroll triggers |
| **Visuals** | Single backdrop image | Underdeveloped atmosphere |
| **Components** | Standard cards, forms | Workmanlike, no distinctive character |

### Design Direction: "The Sanctuary & The Court"

**Concept**: The site should feel like a space where Scripture is taught and judgment is pronounced. Think:
- Old church architecture meets modern editorial design
- Deep, rich colors like aged wood and stained glass
- Typography that commands attention like a sermon
- Sharp, purposeful interactions that cut through noise

**Mood Keywords**: Reverent, Urgent, Authoritative, Warm, Unapologetic

---

## New Design System

### Color Palette: "Liturgical Warmth"

| Token | Color | Hex | Usage |
|-------|-------|-----|-------|
| `--color-void` | Deep Black | `#0A0908` | Primary background |
| `--color-parchment` | Warm Cream | `#F5F1E6` | Light text/accents |
| `--color-parchment-muted` | Aged Paper | `#D4CFC3` | Secondary text |
| `--color-burgundy` | Deep Wine | `#722F37` | Primary accent |
| `--color-burgundy-dark` | Dried Blood | `#4A1C21` | Hover states |
| `--color-gold` | Antique Gold | `#B8860B` | Subtle accents |
| `--color-gold-muted` | Tarnished Gold | `#8B7355` | Borders/dividers |
| `--color-charcoal` | Warm Gray | `#2C2926` | Card backgrounds |
| `--color-rust` | Deep Rust | `#8B3A3A` | Urgent CTAs |

### Typography System

**Display/Headlines** (Brutalist Edge):
- **Primary**: Cormorant Garamond (700, 600) - dramatic, editorial serif with classical roots
- **Fallback**: Georgia, Times New Roman, serif

**Body Text** (Traditional Readability):
- **Primary**: Source Serif 4 (400, 600) - refined serif for long-form reading
- **Fallback**: Libre Baskerville, Georgia, serif

**UI/Labels** (Sharp Minimal):
- **Primary**: Outfit (400, 600, 700) - clean sans for buttons, labels, navigation
- **Fallback**: system-ui, sans-serif

**Monospace** (For technical/form elements):
- **Primary**: JetBrains Mono - district numbers, codes
- **Fallback**: monospace

### Spatial System

- **Base unit**: 4px
- **Section padding**: 80px-120px vertical
- **Content max-width**: 1200px (content), 800px (reading)
- **Card padding**: 32px-48px
- **Generous negative space** around headlines for gravitas

### Motion Philosophy: "The Gavel"

**Principle**: Motion should feel like decisive action - no bounce, no playfulness. Think:
- Sharp easing (cubic-bezier(0.16, 1, 0.3, 1) - quick start, controlled landing)
- Subtle reveals that feel like curtains parting
- Hover states that feel like something is being *affirmed*
- No floating, bouncing, or "delightful" animations

**Animations**:
| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| Reveal | 600-800ms | cubic-bezier(0.16, 1, 0.3, 1) | Scroll-in content |
| Hover Affirm | 200ms | ease-out | Button/state changes |
| Fade In | 400ms | ease-out | Opacity transitions |
| Slide Underline | 300ms | ease-in-out | Link hovers |

---

## Implementation Plan

### Phase 1: Foundation (Design System)

- [ ] **Task 1.1**: Update `app.css` with new color palette CSS variables
- [ ] **Task 1.2**: Configure Google Fonts (Cormorant Garamond, Source Serif 4, Outfit, JetBrains Mono)
- [ ] **Task 1.3**: Update typography scale and base styles
- [ ] **Task 1.4**: Create animation keyframes for reveal and hover effects
- [ ] **Task 1.5**: Update scrollbar styling to match warm palette
- [ ] **Task 1.6**: Define selection color and focus states

### Phase 2: Global Components

- [ ] **Task 2.1**: Redesign Header - tighter typography, subtle gold underline on hover
- [ ] **Task 2.2**: Redesign OverlayMenu - warmer background, serif headings for categories
- [ ] **Task 2.3**: Redesign Footer - richer styling, better hierarchy
- [ ] **Task 2.4**: Create reusable `Button` component variants (primary, secondary, ghost)
- [ ] **Task 2.5**: Create `Card` component with warm borders and hover states
- [ ] **Task 2.6**: Create `Section` wrapper with scroll-reveal animations

### Phase 3: Homepage Redesign

- [ ] **Task 3.1**: Replace hero backdrop with atmospheric Unsplash image (church architecture or Georgia skyline at dusk)
- [ ] **Task 3.2**: Enhance hero typography with Cormorant Garamond display sizing
- [ ] **Task 3.3**: Add scroll-triggered reveal animations to focus cards
- [ ] **Task 3.4**: Redesign "Our Focus" section with warmer cards and gold accents
- [ ] **Task 3.5**: Add decorative dividers with gold/brass styling

### Phase 4: Content Pages

- [ ] **Task 4.1**: Redesign Abolition Basics - editorial reading experience
- [ ] **Task 4.2**: Enhance Georgia Battle page with imagery and better hierarchy
- [ ] **Task 4.3**: Update Bill Analysis with document-style presentation
- [ ] **Task 4.4**: Add relevant stock images to educational content

### Phase 5: Action Pages

- [ ] **Task 5.1**: Redesign Respond page - warmer cards, better CTAs
- [ ] **Task 5.2**: Enhance Near Me page with atmospheric styling
- [ ] **Task 5.3**: Update Join/Support pages with conversion-optimized design
- [ ] **Task 5.4**: Add scroll-reveal to form sections

### Phase 6: Polish & Atmosphere

- [ ] **Task 6.1**: Add subtle grain texture overlay to backgrounds
- [ ] **Task 6.2**: Implement scroll-triggered section reveals
- [ ] **Task 6.3**: Add hover micro-interactions to all interactive elements
- [ ] **Task 6.4**: Create decorative ornamental dividers between sections
- [ ] **Task 6.5**: Optimize for mobile with maintained atmosphere

---

## Visual Asset Strategy

### Free Image Sources (Unsplash)
- Church architecture/steeples
- Georgia state capitol
- Congressional chambers
- Open Bibles/Scripture
- Hands praying
- Family imagery
- Constitutional documents

### Icon Strategy
- Custom SVG icons styled to match (gold stroke, burgundy fill)
- Minimal icon usage - text-forward design
- Subtle decorative elements (crosses, scales of justice)

---

## Verification Criteria

1. **Atmosphere Test**: Does the site feel reverent and urgent simultaneously?
2. **Typography Test**: Are headlines commanding? Is body text readable?
3. **Color Test**: Do the warm burgundy/gold tones evoke tradition without feeling dated?
4. **Motion Test**: Do animations feel decisive, not bouncy?
5. **Responsive Test**: Does mobile maintain the gravitas?
6. **Performance Test**: Font loading doesn't cause layout shift
7. **Accessibility Test**: Contrast ratios maintained with warm palette

---

## Potential Risks and Mitigations

1. **Risk**: Warm colors may reduce contrast
   **Mitigation**: Use parchment text on void backgrounds; avoid burgundy-on-burgundy

2. **Risk**: Serif-heavy design may feel slow on mobile
   **Mitigation**: Test reading experience; ensure tap targets are large

3. **Risk**: Brutalist typography may feel harsh
   **Mitigation**: Balance with warm spacing; use serif softening

4. **Risk**: Stock images may feel generic
   **Mitigation**: Curate intentionally; use atmospheric, not literal, imagery

---

## Alternative Approaches Considered

1. **Pure Brutalist**: Too harsh for reverent tone; would alienate church audience
2. **Pure Traditional**: Too soft/corporate; lacks urgency for activist message
3. **Modern Minimal**: Generic; doesn't differentiate from other ministries
4. **Chosen Direction**: Hybrid that respects the subject matter while commanding attention

---

## Assumptions

1. User is comfortable with CSS variable updates
2. Google Fonts CDN access is acceptable
3. Unsplash attribution will be included
4. Mobile-first responsive design is expected
5. Current SvelteKit routing structure will be maintained
