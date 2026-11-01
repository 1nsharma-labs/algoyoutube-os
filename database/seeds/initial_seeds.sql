-- Initial Database Seeds
INSERT INTO tenants (id, name, plan)
VALUES ('tenant_1nsharma', '1nsharma AI Laboratory', 'open_source_free')
ON CONFLICT (id) DO NOTHING;

INSERT INTO creators (id, tenant_id, handle, name, email, bio, language, target_niche, channel_id, channel_title)
VALUES (
    'creator_1nsharma',
    'tenant_1nsharma',
    '@1nsharma',
    '1nsharma AI Lab',
    '1nsharma@algoyoutube.com',
    'Pioneering open-source AI engineering and autonomous creator operating systems.',
    'English',
    'Autonomous AI Engineering & Tech Architecture',
    'UC_1nsharma_official',
    '1nsharma Tech & AI Architecture'
)
ON CONFLICT (id) DO NOTHING;
