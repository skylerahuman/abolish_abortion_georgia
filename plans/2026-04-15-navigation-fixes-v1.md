# Fix Navigation Links & Testing Strategy

## Objective:

Fix inconsistent navigation links across the site by ensuring all navigation uses the centralized `Routes` configuration from `src/lib/config/navigation.ts`. The site must work correctly in both development and production (subdirectory deployment).

---

## Implementation Plan:

- [x] **Task 1. Audit all hardcoded navigation links in routes**
  - Search `src/routes/**/*.svelte` for all `href="/..."` patterns (not using `{base}` or `Routes`)
  - Document each file, line number, and the hardcoded path
  - **Rationale**: The grep results already show multiple files using hardcoded paths. This baseline ensures we don't miss any cases.

- [x] **Task 2. Update `NavCategories` in navigation config to include all critical routes**
  - Review the 24 defined routes in `Routes` object (src/lib/config/navigation.ts:5-25)
  - Add missing routes to appropriate categories (e.g., "Georgia Battle" to Learn, "Near Me" to Take Action)
  - Ensure sidebar navigation items match configuration (line 19 in burns-accountability uses `'Accountability Overview'` which differs from nav label `'Burns Accountability'`)
  - **Rationale**: Centralizing all nav links ensures consistency and easier maintenance.

- [x] **Task 3. Replace hardcoded `/path` hrefs with `Routes.XXX` or `{base}/path` patterns**
  - In each route file identified in Task 1, replace hardcoded paths with:
    - `Routes.CONSTANT` for internal links (preferred)
    - `{base}/path` as fallback if dynamic import is complex
  - Key files identified: burns-accountability, rep-calls
  - **Rationale**: Hardcoded paths break when deployed to subdirectories.

- [x] **Task 4. Verify OverlayMenu and Footer use centralized navigation**
  - Confirm OverlayMenu (src/lib/components/layout/OverlayMenu.svelte:82-99) uses NavCategories
  - Confirm Footer uses NavCategories
  - Add any missing navigation categories if needed
  - **Rationale**: These are the primary navigation surfaces for mobile and desktop.

- [x] **Task 5. Fix SidebarNav active state detection**
  - Review SidebarNav.isActive() logic (src/lib/components/SidebarNav.svelte:17-19)
  - Consider adding trailing slash handling to match OverlayMenu behavior
  - **Rationale**: Different active state detection could cause visual inconsistency.

---

## Testing Strategy:

### Unit Tests (Vitest):

- [x] **Test 1. Navigation config validation**
  - Create `src/lib/config/navigation.test.ts`
  - Verify all routes in `Routes` are valid paths (start with `/`)
  - Verify `NavCategories` links reference valid route constants
  - **Success Criterion**: Config validation passes without errors.

- [x] **Test 2. Route consistency check**
  - Verify all 24 routes in `Routes` object are unique
  - Verify no orphan links (routes referenced in pages but not in navigation config)
  - **Success Criterion**: No duplicate or missing route definitions.

### End-to-End Tests (Playwright):

- [x] **Test 3. Overlay menu navigation links**
  - Open mobile viewport (375px width)
  - Trigger overlay menu via hamburger button
  - Click each link in all three categories (Learn, Take Action, About)
  - Verify each link navigates to correct page and closes menu
  - **Success Criterion**: All 9 navigation links work and menu closes.

- [x] **Test 4. Desktop header links**
  - Open desktop viewport (1280px width)
  - Click "Join the Fight" button in header
  - Verify navigation to `/join`
  - **Success Criterion**: Header CTA navigates correctly.

- [x] **Test 5. Sidebar navigation on burns-accountability page**
  - Navigate to `/burns-accountability`
  - Verify sidebar shows 4 items: Burns Accountability, View Bill Analysis, Call Your Representative, Join the Movement
  - Click "Call Your Representative" link
  - Verify active state changes correctly
  - **Success Criterion**: Sidebar highlights active route and navigates.

- [x] **Test 6. Footer sitemap links**
  - Scroll to footer on homepage
  - Click each footer navigation link
  - Verify navigation works and links are valid
  - **Success Criterion**: All footer links navigate correctly.

- [x] **Test 7. Deep-link navigation works**
  - Start at `/faqs`
  - Use overlay menu to navigate to `/join`
  - Use overlay menu to navigate to `/about`
  - Verify no 404 errors or broken links
  - **Success Criterion**: No navigation failures across all pages.

### Visual Regression Tests (Optional):

- [x] **Test 8. Active link highlighting**
  - Navigate to `/bill-analysis`
  - Verify "HB 441 Analysis" in overlay menu has red active styling
  - Navigate to `/timeline`
  - Verify "Timeline" in footer has active styling
  - **Success Criterion**: Active page links display consistent visual indicator.

---

## Verification Criteria:

| #   | Criterion                                                    | Test Method                                    |
| --- | ------------------------------------------------------------ | ---------------------------------------------- |
| 1   | All internal links use `{base}` or `Routes` constants        | Grep search for `href="/` without base pattern |
| 2   | NavCategories contains all critical navigation routes        | Config validation test                         |
| 3   | Overlay menu displays 9 navigation links across 3 categories | Visual/manual verification                     |
| 4   | Footer sitemap contains all navigation categories            | Visual/manual verification                     |
| 5   | Sidebar navigation works on sub-pages                        | Playwright test on burns-accountability         |
| 6   | Active route highlighting works consistently                 | Playwright active state test                   |
| 7   | No console errors during navigation                          | Browser console monitoring                     |

---

## Potential Risks and Mitigations:

| Risk                                           | Mitigation                                          |
| ---------------------------------------------- | --------------------------------------------------- |
| Missing links in nav config cause 404s         | Add comprehensive audit step before changes          |
| Changing links affects existing E2E tests       | Update test assertions to match new links           |
| Production deployment uses different base path | `base` from `$app/paths` handles this automatically |

---

## Alternative Approaches:

1. **Use dynamic route generation**: Create a helper function that generates all navigation from a single config file, reducing duplication.

2. **Add TypeScript type validation**: Ensure `NavCategories` only references valid routes via TypeScript, preventing runtime errors.

3. **Sitemap generation**: Auto-generate sitemap.xml from navigation config for SEO benefits.
