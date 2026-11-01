# AlgoYouTube OS Container Deployment

Run the complete AlgoYouTube OS stack locally with zero configuration:

```bash
docker compose -f docker/docker-compose.yml up --build
```

Access the services:
- **Web Dashboard:** `http://localhost:3000`
- **Modular API & MCP Server:** `http://localhost:4000/mcp/v1`
