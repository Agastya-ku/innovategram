-- INNOVATEGRAM RELATIONAL DATABASE SCHEMA (PostgreSQL / Supabase)
-- AI-Powered Grassroots & Rural Innovation Discovery Platform

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. ENUMS
CREATE TYPE user_role AS ENUM ('innovator', 'stakeholder', 'evaluator', 'admin');
CREATE TYPE verification_status AS ENUM ('Pending Review', 'Under Review', 'Verified', 'Needs More Info', 'Rejected');
CREATE TYPE innovation_stage AS ENUM ('Idea', 'Prototype', 'Tested', 'Validated', 'Adopted', 'Scaled');
CREATE TYPE media_type AS ENUM ('photo', 'video', 'audio');
CREATE TYPE language_code AS ENUM ('en', 'hi', 'gu');
CREATE TYPE connection_status AS ENUM ('Pending Innovator Consent', 'Approved', 'Declined');

-- 3. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone VARCHAR(20) UNIQUE,
    email VARCHAR(255) UNIQUE,
    full_name VARCHAR(150),
    role user_role DEFAULT 'innovator',
    organization_name VARCHAR(255),
    designation VARCHAR(150),
    preferred_language language_code DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. SECTORS TABLE
CREATE TABLE IF NOT EXISTS sectors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_hi VARCHAR(100) NOT NULL,
    name_gu VARCHAR(100) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50)
);

-- 5. LOCATIONS TABLE
CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    village_or_town VARCHAR(150) NOT NULL,
    latitude NUMERIC(10, 6) NOT NULL,
    longitude NUMERIC(10, 6) NOT NULL,
    is_approximate BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. INNOVATIONS TABLE
CREATE TABLE IF NOT EXISTS innovations (
    id VARCHAR(50) PRIMARY KEY, -- e.g. IG-2026-001001
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    location_id UUID REFERENCES locations(id) ON DELETE RESTRICT,
    primary_sector_id UUID REFERENCES sectors(id) ON DELETE RESTRICT,
    original_language language_code NOT NULL DEFAULT 'hi',
    development_stage innovation_stage NOT NULL DEFAULT 'Prototype',
    status verification_status NOT NULL DEFAULT 'Pending Review',
    ai_confidence_score NUMERIC(5, 2) DEFAULT 90.00,
    keywords TEXT[] DEFAULT '{}',
    potential_applications TEXT[] DEFAULT '{}',
    is_sample_data BOOLEAN DEFAULT FALSE,
    verification_notes TEXT,
    reviewed_by VARCHAR(150),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. TRANSLATIONS TABLE (Multi-language Profile Text)
CREATE TABLE IF NOT EXISTS translations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    innovation_id VARCHAR(50) REFERENCES innovations(id) ON DELETE CASCADE,
    language language_code NOT NULL,
    title VARCHAR(300) NOT NULL,
    problem TEXT NOT NULL,
    solution TEXT NOT NULL,
    UNIQUE(innovation_id, language)
);

-- 8. TRANSCRIPTS TABLE (Preserves Raw Voice Submissions)
CREATE TABLE IF NOT EXISTS transcripts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    innovation_id VARCHAR(50) REFERENCES innovations(id) ON DELETE CASCADE,
    audio_storage_url TEXT,
    raw_transcript TEXT NOT NULL,
    duration_seconds INT,
    audio_format VARCHAR(30),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. INNOVATION MEDIA TABLE
CREATE TABLE IF NOT EXISTS innovation_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    innovation_id VARCHAR(50) REFERENCES innovations(id) ON DELETE CASCADE,
    media_type media_type NOT NULL,
    storage_url TEXT NOT NULL,
    caption TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. REVIEWS & VERIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    innovation_id VARCHAR(50) REFERENCES innovations(id) ON DELETE CASCADE,
    reviewer_user_id UUID REFERENCES users(id),
    outcome verification_status NOT NULL,
    comments TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. CONNECTION REQUESTS TABLE
CREATE TABLE IF NOT EXISTS connection_requests (
    id VARCHAR(50) PRIMARY KEY,
    innovation_id VARCHAR(50) REFERENCES innovations(id) ON DELETE CASCADE,
    stakeholder_user_id UUID REFERENCES users(id),
    stakeholder_name VARCHAR(150) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    stakeholder_email VARCHAR(255) NOT NULL,
    stakeholder_phone VARCHAR(50),
    purpose VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status connection_status DEFAULT 'Pending Innovator Consent',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. SAVED INNOVATIONS TABLE (Stakeholder Bookmarks)
CREATE TABLE IF NOT EXISTS saved_innovations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    innovation_id VARCHAR(50) REFERENCES innovations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, innovation_id)
);

-- 13. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action VARCHAR(100) NOT NULL,
    performed_by UUID REFERENCES users(id),
    target_entity VARCHAR(100),
    entity_id VARCHAR(100),
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE innovations ENABLE ROW LEVEL SECURITY;
ALTER TABLE connection_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Public can discover innovations with verified or pending status
CREATE POLICY "Public Read Innovations" ON innovations FOR SELECT USING (true);

-- Indexes for lightning fast multilingual search
CREATE INDEX idx_innovations_status ON innovations(status);
CREATE INDEX idx_innovations_stage ON innovations(development_stage);
CREATE INDEX idx_translations_text ON translations USING gin(to_tsvector('simple', title || ' ' || problem || ' ' || solution));

