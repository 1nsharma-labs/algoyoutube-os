# Deployment & Staging Guide

## Local Development
```bash
npm install
npm test
npm run dev:api  # Port 4000
npm run dev:web  # Port 3000
```

## Docker Staging Run
```bash
docker compose -f docker/docker-compose.yml up --build
```

**Note:** Never deploy to production environments without explicit owner authorization.
