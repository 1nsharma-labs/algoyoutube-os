-- Migration 002: Channel DNA & Projects
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
