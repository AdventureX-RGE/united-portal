FROM oven/bun:latest

WORKDIR /app

# Copy package files first
COPY apps/portal/package*.json ./
RUN bun install

# Copy source files
COPY apps/portal ./

# Build
RUN bun run build

EXPOSE 3000
CMD ["bun", "run", "start"]