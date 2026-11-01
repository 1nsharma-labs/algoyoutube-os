# Universal Model Context Protocol (MCP) Specification

AlgoYouTube OS implements the official Model Context Protocol (JSON-RPC 2.0 over Streamable HTTP and SSE).

## Endpoint
`POST http://localhost:4000/mcp/v1`

## Supported Methods
- `initialize`: Protocol capability negotiation.
- `tools/list`: Enumerate registered creator and engineering tools.
- `tools/call`: Invoke tools with typed argument schemas.
- `resources/list`: Discover available resources (`creator://`, `system://`).
- `resources/read`: Retrieve structured resource contents.
- `prompts/list`: Discover reusable conversational prompts.
