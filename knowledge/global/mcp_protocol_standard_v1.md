# Model Context Protocol Standard Knowledge Reference

The Model Context Protocol (MCP) defines an open standard for AI assistants to safely query data and execute actions across external applications.

## Core Primitives
1. **Tools:** Executable routines returning structured content (Text, Images, Embedded Resources).
2. **Resources:** Read-only contextual URIs (`creator://`, `system://`) providing grounding data.
3. **Prompts:** Parameterized conversational workflows.

## JSON-RPC 2.0 Contract
All requests include `jsonrpc: "2.0"`, an integer or UUID `id`, a string `method`, and an optional `params` object.
