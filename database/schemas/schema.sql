-- AlgoYouTube OS Relational Database Schema (PostgreSQL & SQLite Compatible)
-- Multi-Tenant Creator Intelligence & Operating System Schema

-- 1. Tenants & Multi-Tenancy Firewall
CREATE TABLE IF NOT EXISTS tenants (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    plan VARCHAR(64) DEFAULT 'open_source_free',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Creators Profile
CREATE TABLE IF NOT EXISTS creators (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    handle VARCHAR(128) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    bio TEXT,
    language VARCHAR(64) DEFAULT 'English',
    target_niche VARCHAR(255) NOT NULL,
    channel_id VARCHAR(128),
    channel_title VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Dynamic Channel DNA
CREATE TABLE IF NOT EXISTS channel_dna (
    id VARCHAR(64) PRIMARY KEY,
    creator_id VARCHAR(64) NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    channel_id VARCHAR(128) NOT NULL,
    channel_title VARCHAR(255) NOT NULL,
    niche VARCHAR(255) NOT NULL,
    audience_persona JSONB NOT NULL,
    brand_voice JSONB NOT NULL,
    visual_style JSONB NOT NULL,
    historical_metrics JSONB NOT NULL,
    opportunity_clusters JSONB NOT NULL,
    confidence_score NUMERIC(5, 4) DEFAULT 0.90,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Content Projects & Ideas
CREATE TABLE IF NOT EXISTS content_projects (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    creator_id VARCHAR(64) NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    title VARCHAR(512) NOT NULL,
    niche VARCHAR(255) NOT NULL,
    status VARCHAR(64) DEFAULT 'ideation',
    current_step INT DEFAULT 1,
    total_steps INT DEFAULT 26,
    idea_data JSONB,
    script_data JSONB,
    visuals_data JSONB,
    reach_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Content Project Artifacts (26 Canonical Steps)
CREATE TABLE IF NOT EXISTS content_artifacts (
    id VARCHAR(64) PRIMARY KEY,
    project_id VARCHAR(64) NOT NULL REFERENCES content_projects(id) ON DELETE CASCADE,
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    step_number INT NOT NULL,
    step_id VARCHAR(128) NOT NULL,
    step_name VARCHAR(255) NOT NULL,
    payload JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Platform & Connector Registry
CREATE TABLE IF NOT EXISTS platform_registry (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(128) NOT NULL,
    official_url VARCHAR(512),
    documentation_url VARCHAR(512),
    api_available BOOLEAN DEFAULT TRUE,
    mcp_available BOOLEAN DEFAULT FALSE,
    auth_type VARCHAR(64) NOT NULL,
    free_tier_status VARCHAR(255),
    rate_limits VARCHAR(255),
    license VARCHAR(128),
    security_status VARCHAR(64) DEFAULT 'VERIFIED_SAFE',
    supported_operations JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Autonomous Improvement Proposals
CREATE TABLE IF NOT EXISTS improvement_proposals (
    id VARCHAR(64) PRIMARY KEY,
    engine_target VARCHAR(128) NOT NULL,
    title VARCHAR(512) NOT NULL,
    description TEXT NOT NULL,
    risk_level VARCHAR(32) DEFAULT 'LOW',
    status VARCHAR(64) DEFAULT 'PENDING_HUMAN_APPROVAL',
    benchmark_delta VARCHAR(128),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Security Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) DEFAULT 'global',
    actor VARCHAR(128) NOT NULL,
    action VARCHAR(255) NOT NULL,
    status VARCHAR(64) NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Fast Scoped Queries
CREATE INDEX IF NOT EXISTS idx_creators_tenant ON creators(tenant_id);
CREATE INDEX IF NOT EXISTS idx_dna_creator ON channel_dna(creator_id);
CREATE INDEX IF NOT EXISTS idx_projects_tenant ON content_projects(tenant_id);
CREATE INDEX IF NOT EXISTS idx_artifacts_project ON content_artifacts(project_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at);
