-- Neon Postgres migration script for volunteers table
-- Run this in your Neon console

DROP TABLE IF EXISTS volunteers;

CREATE TABLE IF NOT EXISTS volunteers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP DEFAULT NOW(),
    first_name TEXT NOT NULL,      -- base64 encoded
    last_name TEXT NOT NULL,       -- base64 encoded
    email TEXT NOT NULL,           -- base64 encoded
    phone TEXT,                     -- base64 encoded (optional)
    city TEXT NOT NULL,
    state TEXT NOT NULL DEFAULT 'GA',
    zip_code TEXT,
    district TEXT,
    home_church TEXT,               -- base64 encoded (optional)
    interests TEXT[],
    out_of_state BOOLEAN DEFAULT FALSE
);

-- Index for email lookups (decoded when needed)
CREATE INDEX IF NOT EXISTS idx_volunteers_email ON volunteers (email);

-- Index for district queries (future reporting)
CREATE INDEX IF NOT EXISTS idx_volunteers_district ON volunteers (district);

-- Index for date-based queries
CREATE INDEX IF NOT EXISTS idx_volunteers_created_at ON volunteers (created_at DESC);