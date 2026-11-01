# AlgoYouTube OS Containerfile
FROM node:24-alpine AS base
WORKDIR /app

# Copy root configurations
COPY package.json package-lock.json tsconfig.json ./
COPY packages/ ./packages/
COPY engines/ ./engines/
COPY connectors/ ./connectors/
COPY apps/ ./apps/

# Link workspaces
RUN npm install --omit=dev

EXPOSE 3000 4000

CMD ["sh", "-c", "node apps/api/src/index.mjs & node apps/web/server.mjs"]
