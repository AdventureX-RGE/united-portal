FROM oven/bun:latest AS build

WORKDIR /app

# Copy workspace configuration
COPY package.json bun.lockb* ./

# Copy keel app package.json for workspace resolution
COPY apps/keel/package.json ./apps/keel/
COPY apps/keel/bun.lockb* ./apps/keel/

RUN bun install

# monorepo root
COPY . .

WORKDIR /app/apps/keel

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

COPY --from=build /app/apps/keel/server server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 3000
