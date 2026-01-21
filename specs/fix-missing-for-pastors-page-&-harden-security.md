# [PRD] Fix Missing /for-pastors Page & Harden Security

> **Status:** APPROVED | **Priority:** HIGH
> **Context:** The `/for-pastors` route is missing (404 error). This PRD defines the content for the new `/for-pastors` route with a static design, mitigates PII vulnerabilities across the whole project, improves performance, and hardens security with Vercel Edge Functions.

## 1. Technical Specifications (The Architect)
- **Hosting:** Vercel
- **Deployment:** Edge Functions
- **Adapter:** SvelteKit
- **Strict Mode:** True

### Data Model
`	ypescript
N/A (No data models)
`

## 2. Sentiment & Mission
> "As a visitor, I want to access resources specifically for pastors, but the page is currently missing. Further, I expect the platform to protect my privacy and data from potential attacks."
- **Success Metric:** `/for-pastors` page available and loading quickly (under 3 seconds on 1 bar of 4G), Lighthouse score above 90. No PII data leaks detected by security audit. No high or critical vulnerabilities.

## 3. UX Blueprints
- The page is static and does not accept any user input. Only hyperlinks to external resources are allowed.
- No client-side JavaScript is used beyond what SvelteKit requires for routing (if any).

## 4. Copy Dictionary
| Forbidden | Required |
|-----------|----------|
| consumerism | Section 1: A Blistering Indictment of Clergy Consumerism. A clear and direct rebuke of pastors who prioritize personal gain, platform building, and worldly validation over prophetic ministry. This section will include specific scriptural references (e.g., 1 Timothy 3:3, Titus 1:7) and historical examples of clergy corruption.
Section 2: A Call to Radical Repentance.  A direct and challenging invitation for pastors to repent of all forms of worldliness, compromise, and self-promotion. This section must not be diluted with soft language or accommodating gestures. It must be a sharp sword.
Section 3: Resources for Biblical Discipleship.  Providing resources, rooted in Romans 1, that emphasize a separation from the world, a commitment to truth, and a willingness to embrace cultural rejection. This should *not* offer tools for 'effective ministry' in the conventional sense, but rather resources for living a counter-cultural life of uncompromising faith. |
| self-discovery | Truth is revealed through repentance, not self-discovery. |

## 5. Implementation Plan
- [ ] Delete `/who-are-you` route
- [ ] Implement Option A for `/for-pastors`: Create page with static HTML, and the required content.
- [ ] Implement mutual TLS (mTLS) for /for-pastors (if retained) and `/who-are-you` (if retained).
- [ ] Apply all hardening measures on Vercel Edge Functions (as detailed in updated PRD).
- [ ] Implement all performance optimizations (as detailed in updated PRD).
- [ ] Execute a comprehensive security audit, penetration test, and performance testing (including 'Parking Lot Rule').
- [ ] Deploy all changes to production
