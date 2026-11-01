# REST API Reference

All requests accept and return JSON. Scoped requests require header `X-Tenant-Id`.

## Endpoints
- `GET /api/health` -> System health and uptime.
- `GET /api/creator/profile` -> Active creator profile.
- `GET /api/creator/dna` -> Multi-layer channel DNA.
- `POST /api/creator/journal` -> Record creator observation into memory.
- `POST /api/ideas/generate` -> Generate high-opportunity ideas.
- `GET /api/projects` -> List creator content projects.
- `POST /api/projects` -> Create new project.
- `POST /api/projects/:id/run-all` -> Trigger 26-step automated pipeline.
- `POST /api/evolution/cycle` -> Trigger autonomous discovery and benchmarking.
- `GET /api/evolution/proposals` -> List architectural proposals.
- `POST /api/evolution/proposals/:id/approve` -> Human approve proposal.
- `GET /api/benchmarks` -> Run system benchmarks.
- `POST /api/owner/command` -> Execute natural language owner instruction.
- `GET /api/security/audit` -> Recent security audit logs.
- `POST /mcp/v1` -> Model Context Protocol JSON-RPC 2.0 gateway.
