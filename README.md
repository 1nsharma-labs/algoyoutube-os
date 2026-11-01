# AlgoYouTube OS — Autonomous AI Engineering & Creator Intelligence Ecosystem

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Architecture: MCP-Native](https://img.shields.io/badge/MCP-Native-purple.svg)](ARCHITECTURE.md)
[![Open Source: Free by Design](https://img.shields.io/badge/Cost-Zero%20Mandatory%20Paid%20SaaS-green.svg)](LICENSE_POLICY.md)
[![Version: v1.0.0](https://img.shields.io/badge/Version-1.0.0--alpha-orange.svg)](ROADMAP.md)

**Domain:** [algoyoutube.com](https://algoyoutube.com) · **Alias:** [algyotube.com](https://algyotube.com)  
**GitHub Organization:** [1nsharma-labs](https://github.com/1nsharma-labs) · **Owner:** [1nsharma](https://github.com/1nsharma)  

AlgoYouTube OS is an open-source, MCP-native, self-evolving creator intelligence operating system. Built for creators, engineering teams, and autonomous AI systems, it automates end-to-end channel analysis, dynamic creator DNA modeling, topic opportunity scoring, and the complete 26-step Idea-to-Content-Kit production pipeline—all powered by an autonomous meta-engineering engine that continuously discovers, tests, and integrates open-source technologies.

---

## Key Pillars

1. **Open-Source First & Free by Design:**
   Zero mandatory paid subscriptions. Zero mandatory closed-source API keys. Native support for local open-weight models (Ollama, vLLM, llama.cpp) and free-tier cloud models (Google Gemini API).
2. **Universal Model Context Protocol (MCP):**
   Full dual implementation: Remote MCP Server over Streamable HTTP/SSE exposing creator and engineering tools to external assistants (Gemini, Claude, ChatGPT), plus an MCP Client & Connector Manager that registers external servers.
3. **Seven Production Creator Engines:**
   - **YouTube DNA Engine:** Multi-layer dynamic creator identity, audience telemetry, and content patterns.
   - **Idea Intelligence:** Predictive opportunity scoring balancing trend momentum, evergreen demand, and creator fit.
   - **ScriptForge:** 3-act structured scripts, curiosity loops, retention callouts, and timestamped narration.
   - **Visual Prompt Lab:** Storyboards, shot lists, thumbnail concepts, and AI image/video prompts.
   - **Outsource Connect:** Automated freelancer briefs, budget calculators, and quality checklists.
   - **AI Toolchain:** Workflows for voice synthesis, automated subtitling, and open-source media editing.
   - **Reach Amplifier:** Title variations, SEO descriptions, chapter markers, Shorts extraction, and checklists.
4. **Autonomous Meta-Engineering Core:**
   A self-evolving multi-agent system that daily audits open-source repositories, evaluates licenses, tests connectors, generates sandbox benchmarks, and files structured Pull Requests.
5. **Two-Way Co-Development:**
   Seamless synchronization between owner/community code pushes and autonomous AI evolution without overwriting human decisions.

---

## Monorepo Layout

```text
algoyoutube-os/
├── apps/
│   ├── web/                     # Full Responsive Next.js / React UI Dashboard
│   ├── api/                     # Modular Express / Hono REST & MCP Gateway
│   ├── admin/                   # Platform Administration
│   ├── community/               # Community Templates & Reviews
│   └── docs/                    # Interactive Documentation
├── engines/
│   ├── dna/                     # YouTube Channel & Audience DNA
│   ├── idea-intelligence/       # Opportunity Scoring & Discovery
│   ├── scriptforge/             # Long-form & Shorts Scriptwriting
│   ├── visual-lab/              # Storyboarding & Visual Prompts
│   ├── outsource/               # Freelancer Briefs & Tasking
│   ├── toolchain/               # FFmpeg, TTS, Subtitling Wrappers
│   ├── reach/                   # SEO, Chapters, Shorts & Amplification
│   ├── discovery/               # Autonomous Tech & Repo Discovery
│   ├── understanding/           # AST & Architecture Analysis
│   ├── technology-selection/    # Cost & License Evaluation
│   ├── evolution/               # Automated Improvement Proposals
│   ├── benchmark/               # Latency, Reliability & Quality Evaluator
│   ├── knowledge/               # Global, Creator & Engineering Memory
│   ├── connector-evolution/     # Dynamic Platform Connector Evaluator
│   └── engineering-orchestrator/# Full SDLC Multi-Agent Coordinator
├── packages/
│   ├── shared-types/            # Canonical TypeScript Interfaces
│   ├── schemas/                 # Zod Schemas for Validation
│   ├── mcp-server/              # Remote Streamable HTTP MCP Server
│   ├── mcp-client/              # Universal MCP Client & Connector Manager
│   ├── ai-providers/            # Gemini, Ollama & OpenAI Adapters
│   ├── connector-sdk/           # Base Connectors & OAuth 2.1 PKCE
│   ├── security/                # AES-256 Token Encryption & SSRF Filter
│   ├── database/                # Relational In-Memory & SQLite/PG Driver
│   └── workflow-sdk/            # 26-Step Pipeline State Machine
├── connectors/                  # YouTube, Google, GitHub, Research, Media
├── registry/                    # Platforms, Technologies, Models, Connectors
├── research/                    # Daily Tech Reports & Benchmarks
├── knowledge/                   # Persistent System & Creator Knowledge
├── sandbox/                     # Experiment Isolation & Validation
├── workflows/                   # Content Production & CI Workflows
└── tests/                       # Unit, Integration, MCP & Security Tests
```

---

## Quickstart

```bash
# 1. Install dependencies
npm install

# 2. Build shared packages and engines
npm run build

# 3. Run the automated test suite
npm test

# 4. Start the development server (Web Dashboard + API + MCP Server)
npm run dev
```

Visit `http://localhost:3000` for the Creator and Intelligence Dashboard, or connect your external AI assistant to `http://localhost:4000/mcp/v1`.
