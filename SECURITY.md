# SECURITY POLICY — ALGOYOUTUBE OS

## 1. Security Philosophy
AlgoYouTube OS follows defense-in-depth principles:
- **Zero Trust MCP Tools:** All MCP tools are isolated by permission tiers (Read-Only vs Controlled Write vs Admin). No arbitrary shell execution is exposed via MCP.
- **Credential & Token Security:** OAuth refresh tokens and API secrets are stored locally with AES-256-GCM encryption. Never committed to version control.
- **SSRF & Network Boundary Protection:** Outbound requests are validated against private IP ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `127.0.0.1/8`, `169.254.169.254`).
- **Prompt Injection Defense:** Multi-layer input sanitization, structured JSON schema outputs, and validation against rogue system prompt hijacking.
- **Multi-Tenant Isolation:** Relational boundary checks ensure tenant IDs strictly scope all queries.

## 2. Reporting a Vulnerability
Security vulnerabilities should be reported responsibly to `security@algoyoutube.com` or via private GitHub Security Advisory in `1nsharma/algoyoutube-os`.
