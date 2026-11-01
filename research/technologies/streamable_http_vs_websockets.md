# Technical Analysis: Streamable HTTP vs WebSockets for MCP

## Architectural Comparison
- **Streamable HTTP:** Uses standard chunked HTTP responses or Server-Sent Events (SSE). Seamlessly works behind standard reverse proxies (Nginx, Caddy), requires no stateful socket upgrades, and supports per-request authorization.
- **WebSockets:** Stateful, duplex connection. Requires persistent TCP socket maintenance, complex reconnection logic, and specialized gateway load balancing.

## Selected Protocol Architecture
Streamable HTTP JSON-RPC 2.0 at `/mcp/v1` for standard tool calls and SSE `/mcp/v1/sse` for long-running streaming completions.
