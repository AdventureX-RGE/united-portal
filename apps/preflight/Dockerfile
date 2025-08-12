FROM oven/bun:latest

WORKDIR /app

# Copy workspace configuration
COPY package.json bun.lockb* ./

# Copy preflight app package.json for workspace resolution
COPY apps/preflight/package.json ./apps/preflight/
COPY apps/preflight/bun.lockb* ./apps/preflight/

RUN bun install

# monorepo root
COPY . .

WORKDIR /app/apps/preflight

CMD ["bun", "run", "start"]