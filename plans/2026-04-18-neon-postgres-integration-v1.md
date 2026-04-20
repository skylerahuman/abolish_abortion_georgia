# Neon Serverless Postgres Integration Plan

## Objective

Replace the `mailto:` form submission mechanism in the `/join` route with a secure serverless Postgres backend using Neon, enabling reliable storage and retrieval of volunteer registration data.

---

## Current State Analysis

**Source Files:**
- `src/lib/components/JoinForm.svelte:124-156` - Current mailto submission
- `src/lib/types.ts:49-59` - `ContactForm` interface
- `src/lib/state.svelte.ts:3-47` - `RegistrationState` class

**Current Flow:**
1. User completes 3-step wizard
2. On submit, creates `mailto:Wes@OperationGospel.life` link with form data
3. Opens user's email client
4. Clears localStorage and shows success state

**Limitations:**
- Relies on user's email client being configured
- No data persistence on server
- No confirmation of successful delivery
- No structured database for querying/filtering
- Privacy concern: email body contains all submitted data in plaintext

---

## Strategic Approach

### Technology Stack Addition

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Postgres Client | `postgres` (neon.tech driver) | Native TypeScript support, direct Neon compatibility |
| ORM | `drizzle-orm` | Type-safe, lightweight, works with any Postgres |
| Database Migration | `drizzle-kit` | Schema versioning and migrations |
| Environment Config | SvelteKit `.env` | Native support, no additional dependencies |

### Why This Stack?

1. **`postgres` driver** - Built by Neon team, handles connection pooling automatically, works with their serverless driver
2. **Drizzle ORM** - TypeScript-first, minimal overhead, no runtime reflection
3. **Direct connection** - Avoids Prisma's heavier bundle size, better for serverless

---

## Implementation Plan

### Phase 1: Database Setup (External)

- [ ] Create Neon project at `console.neon.tech`
- [ ] Create new database branch for development
- [ ] Note connection string (format: `postgresql://user:pass@host/db?sslmode=require`)

### Phase 2: Project Dependencies

- [ ] Install `postgres` client: `npm install postgres`
- [ ] Install Drizzle ORM: `npm install drizzle-orm`
- [ ] Install Drizzle Kit (dev): `npm install -D drizzle-kit`
- [ ] Install type definitions: `npm install -D @types/pg`

### Phase 3: Schema Definition

Create `src/lib/db/schema.ts`:

- [ ] Define `volunteers` table with columns:
  - `id` - Auto-incrementing UUID primary key
  - `first_name` - VARCHAR(100) NOT NULL
  - `last_name` - VARCHAR(100) NOT NULL
  - `email` - VARCHAR(255) NOT NULL, UNIQUE
  - `phone` - VARCHAR(20) NULLABLE
  - `address` - VARCHAR(255) NOT NULL
  - `city` - VARCHAR(100) NOT NULL
  - `district` - VARCHAR(3) NULLABLE (for GA residents)
  - `home_church` - VARCHAR(255) NULLABLE
  - `interests` - TEXT[] (Postgres array)
  - `is_georgia_resident` - BOOLEAN DEFAULT true
  - `created_at` - TIMESTAMP DEFAULT NOW()
  - `ip_address` - VARCHAR(45) NULLABLE (for security)
  - `user_agent` - TEXT NULLABLE

- [ ] Create type exports for use in API routes

### Phase 4: Database Connection

Create `src/lib/db/index.ts`:

- [ ] Initialize `postgres` client with Neon connection string
- [ ] Implement singleton pattern for connection reuse
- [ ] Add connection error handling with fallback messages
- [ ] Export typed query helpers

### Phase 5: API Endpoint

Create `src/routes/api/volunteers/+server.ts`:

- [ ] Implement `POST` handler for form submission
- [ ] Validate all required fields server-side
- [ ] Sanitize and normalize input data
- [ ] Check for duplicate email submissions (return existing instead of error)
- [ ] Insert into database with prepared statements
- [ ] Return appropriate HTTP status codes:
  - `201 Created` - Success
  - `400 Bad Request` - Validation failure
  - `409 Conflict` - Email already registered
  - `500 Internal Server Error` - Database failure

### Phase 6: Form Component Update

Update `src/lib/components/JoinForm.svelte`:

- [ ] Replace `mailto:` submission with `fetch()` to API endpoint
- [ ] Add loading state during submission
- [ ] Handle API errors gracefully with user-friendly messages
- [ ] Keep success state behavior (localStorage cleanup)
- [ ] Add retry mechanism for failed submissions

### Phase 7: Environment Configuration

Create `src/lib/config/database.ts`:

- [ ] Load `DATABASE_URL` from environment
- [ ] Validate presence of required env vars
- [ ] Export typed configuration

Create `.env.example`:

- [ ] Document required environment variables
- [ ] Include example connection string format

### Phase 8: Security Hardening

- [ ] Add rate limiting to API endpoint
- [ ] Implement basic honeypot field (hidden input, reject if filled)
- [ ] Add CSRF token validation
- [ ] Sanitize all text inputs to prevent injection
- [ ] Use parameterized queries only (Drizzle handles this)

### Phase 9: Error Handling & Logging

- [ ] Create centralized error response helper
- [ ] Add structured logging for failed submissions
- [ ] Implement retry logic with exponential backoff on client

---

## Verification Criteria

1. **Functional Test**: Submit form via `/join` route, verify data appears in Neon database
2. **Duplicate Handling**: Submit same email twice, verify graceful handling
3. **Validation**: Submit incomplete data, verify 400 response with field-specific errors
4. **Rate Limit**: Rapid-fire submissions, verify rate limiting kicks in
5. **Persistence**: Navigate away and return to `/join`, verify state is clean
6. **Error Recovery**: Simulate network failure, verify user can retry

---

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Connection string exposure | Critical | Low | Use environment variables, never commit to git |
| Database unavailability | High | Low | Neon has 99.9% uptime SLA, implement retry logic |
| Duplicate registrations | Medium | Medium | Implement upsert logic, clearly communicate existing registration |
| Form abandonment | Low | High | Already handled via localStorage persistence |

---

## Alternative Approaches Considered

1. **Supabase instead of Neon**
   - Pro: Built-in auth and real-time subscriptions
   - Con: Higher bundle size, more vendor lock-in

2. **PlanetScale (MySQL) instead of Neon**
   - Pro: Branching workflow, Vitess-based scaling
   - Con: MySQL vs Postgres, different SQL dialect

3. **Direct API submission to email service (Resend/SendGrid)**
   - Pro: Simpler, no database needed
   - Con: No structured data, limited querying

**Recommendation: Neon + Drizzle provides the best balance of simplicity, type-safety, and serverless optimization for this use case.**

---

## Migration Path

Since the current system is email-based:

1. **Phase 1-7** (Above) establishes the new database-backed flow
2. **Future Phase**: Add admin dashboard to view/filter submissions
3. **Future Phase**: Add email notification to administrator on new signup
4. **Future Phase**: Add confirmation email to volunteer

---

## Estimated Implementation Time

- Setup: 30 minutes
- Schema & Connection: 1 hour
- API Endpoint: 1.5 hours
- Form Integration: 1 hour
- Testing & Hardening: 1.5 hours

**Total: ~5.5 hours**

---

## Dependencies Summary

```bash
npm install postgres drizzle-orm
npm install -D drizzle-kit @types/pg
```

No changes to existing dependencies required.