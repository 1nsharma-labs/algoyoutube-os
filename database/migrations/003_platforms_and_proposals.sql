-- Migration 003: Platforms, Connectors, Proposals & Audit Logs
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

CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) DEFAULT 'global',
    actor VARCHAR(128) NOT NULL,
    action VARCHAR(255) NOT NULL,
    status VARCHAR(64) NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
