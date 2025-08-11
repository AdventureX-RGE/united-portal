FROM oven/bun:latest
WORKDIR /app

# monorepo root
COPY . .

WORKDIR /app/apps/keel
RUN bun install --frozen-lockfile

EXPOSE 3001
CMD ["bun", "run", "start"]
