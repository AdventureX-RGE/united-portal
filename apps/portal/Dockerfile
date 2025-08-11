FROM oven/bun:latest AS base
WORKDIR /app

# monorepo root
COPY . .

# install only the main app deps
WORKDIR /app/apps/portal
RUN bun install --frozen-lockfile

# build (Modern.js usually: `modern build` or your script)
RUN bun run build

# run
EXPOSE 3000
CMD ["bun", "run", "start"]
