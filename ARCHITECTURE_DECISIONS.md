# ARCHITECTURE DECISION RECORDS (ADR / TDR)

## TDR-001: Monorepo Workspace Strategy
- **Decision:** Use native NPM Workspaces (`workspaces: ["apps/*", "engines/*", "packages/*", "connectors/*"]`) with TypeScript 5.x project references.
- **Context:** Requires zero proprietary monorepo cloud dependencies (no mandatory Turbo repo cloud, Nx cloud, or non-standard tools).
- **Consequences:** Highly portable, operates natively on Windows, Linux, and macOS without extra binary prerequisites.

---

## TDR-002: Backend Runtime & Data Layer
- **Decision:** Node.js 24 with native ES Modules, dual storage architecture:
  - Local/Dev mode: Embedded SQLite / In-Memory with full relational schemas and JSON query support.
  - Production mode: PostgreSQL with `pgvector` adapter.
- **Context:** Allows zero-cost, instant out-of-the-box local execution without requiring a running Docker daemon or cloud database.
- **Consequences:** Instant developer onboarding, complete isolation, offline operation.

---

## TDR-003: Model Context Protocol (MCP) Standard Implementation
- **Decision:** Build AlgoYouTube OS as both:
  1. **MCP Remote Server:** Implements standard JSON-RPC 2.0 protocol over Streamable HTTP and Server-Sent Events (SSE) `/mcp/v1`. Exposes Creator Tools, Engineering Tools, Resources (`creator://`, `system://`), and Reusable Prompts.
  2. **MCP Client & Connector Manager:** Discovers, registers, audits schemas, controls permissions, and interacts with third-party MCP servers.
- **Context:** External AI assistants (Gemini, Claude, ChatGPT, open-source agents) can directly pair with AlgoYouTube OS.
- **Consequences:** Open protocol adherence without vendor lock-in.

---

## TDR-004: Multi-AI Collaboration & Zero-Cost Policy
- **Decision:** Provide unified adapter layer (`@algoyoutube/ai-providers`) supporting:
  - **Google Gemini API** (Free tier via Google GenAI SDK).
  - **Local Models** via Ollama / llama.cpp / vLLM HTTP endpoints.
  - **OpenAI-Compatible** HTTP endpoints (vLLM, LocalAI, LM Studio).
  - **Function Calling Fallback:** For models without native MCP stream support.
- **Context:** Mandate of 0 required paid subscriptions.

---

## TDR-005: Seven YouTube Production Engines Architecture
- **Decision:** Isolate the seven production engines (`dna`, `idea-intelligence`, `scriptforge`, `visual-lab`, `outsource`, `toolchain`, `reach`) into modular packages with clean typed interfaces and pipeline integration.
- **Consequences:** Any engine can run independently, be benchmarked, or be swapped/upgraded autonomously by the evolution engine.

---

## TDR-006: Idea-to-Content-Kit 26-Step Workflow Engine
- **Decision:** Implement a deterministic, checkpointed workflow state machine that progresses through 26 distinct creative & engineering stages.
- **Consequences:** Full resumability, visual step inspection, asset versioning, and zero data loss on failure.
