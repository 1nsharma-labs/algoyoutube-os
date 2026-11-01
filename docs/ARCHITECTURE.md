# AlgoYouTube OS Architecture Reference

## Overview
AlgoYouTube OS is organized as a modular, open-source-first monorepo:
- `apps/`: Frontend Web Dashboard (`apps/web`) and Modular API Gateway (`apps/api`).
- `packages/`: Reusable primitives for Security, Database, Shared Types, Schemas, MCP Server/Client, AI Providers, and Workflow SDK.
- `engines/`: Seven YouTube Production Engines and Eight Meta-Engineering Evolution Engines.
- `connectors/`: Multi-platform connectors for YouTube, Google, GitHub, Research, Media, and Social.
- `database/`: SQL schemas, migrations, and seeds.
- `registry/`: Persistent catalogs for Platforms, Technologies, Models, Connectors, and Licenses.
- `knowledge/`: Persistent multi-tier memory (Global, Engineering, Creator, Community).
- `workflows/`: Declarative JSON workflow pipelines.
