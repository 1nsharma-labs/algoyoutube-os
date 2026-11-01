# ALGOYOUTUBE OS ARCHITECTURE

```text
                                  +---------------------------------------+
                                  |     EXTERNAL AI & MCP CLIENTS        |
                                  |  (Gemini, Claude, ChatGPT, Local LLM) |
                                  +-------------------+-------------------+
                                                      |
                                    MCP Protocol (HTTP / SSE / JSON-RPC)
                                                      |
                                                      v
+---------------------------------------------------------------------------------------------------+
|                                      ALGOYOUTUBE OS GATEWAY                                        |
|                                                                                                   |
|  +------------------------------+  +------------------------------+  +-------------------------+  |
|  |     APPS / WEB (Frontend)    |  |       APPS / API (Backend)   |  |   MCP SERVER & CLIENT   |  |
|  |  - Creator Intelligence Dash |  |  - Fast REST / SSE Endpoints |  |  - Tools / Resources    |  |
|  |  - 26-Step Content Studio    |  |  - Multi-Tenant Engine       |  |  - Permission Firewall  |  |
|  |  - Admin & Community Hub     |  |  - Auth Gateway (OAuth 2.1)  |  |  - Client Connector Mgr|  |
|  +--------------+---------------+  +--------------+---------------+  +------------+------------+  |
|                 |                                 |                               |               |
|                 +---------------------------------+-------------------------------+               |
|                                                   |                                               |
|                                                   v                                               |
|  +---------------------------------------------------------------------------------------------+  |
|  |                                  SEVEN PRODUCTION ENGINES                                   |  |
|  |  [1. YouTube DNA] [2. Idea Intelligence] [3. ScriptForge] [4. Visual Lab]                   |  |
|  |  [5. Outsource Connect] [6. AI Toolchain] [7. Reach Amplifier]                              |  |
|  +------------------------------------------------+--------------------------------------------+  |
|                                                   |                                               |
|                                                   v                                               |
|  +---------------------------------------------------------------------------------------------+  |
|  |                             EIGHT SELF-EVOLVING META ENGINES                                |  |
|  |  [Discovery] [Understanding] [Tech-Selection] [Evolution] [Benchmark]                       |  |
|  |  [Knowledge & Memory] [Connector-Evolution] [Engineering-Orchestrator]                     |  |
|  +------------------------------------------------+--------------------------------------------+  |
|                                                   |                                               |
|                                                   v                                               |
|  +---------------------------------------------------------------------------------------------+  |
|  |                              CONNECTORS & PERSISTENCE LAYER                                 |  |
|  |  - YouTube Data API v3     - Google Cloud / Drive      - GitHub API / Git                   |  |
|  |  - OpenAlex / arXiv        - Hugging Face / Models     - SQLite / PostgreSQL + pgvector     |  |
|  +---------------------------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------------------------+
```
