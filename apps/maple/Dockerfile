FROM oven/bun:latest AS build

WORKDIR /app

# Copy workspace configuration
COPY package.json bun.lockb* ./

# Copy maple app package.json for workspace resolution
COPY apps/maple/package.json ./apps/maple/
COPY apps/maple/bun.lockb* ./apps/maple/

RUN bun install

# monorepo root
COPY . .

WORKDIR /app/apps/maple

ENV NODE_ENV=production

RUN bun build \
	--compile \
	--minify-whitespace \
	--minify-syntax \
	--target bun \
	--outfile server \
	./src/index.ts

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/apps/maple/server server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 3000
