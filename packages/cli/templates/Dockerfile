# Use latest Bun version which has better Next.js compatibility
FROM oven/bun:latest

# Set working directory inside the container
WORKDIR /

# Copy all files (adjust if needed for mono-repo)
COPY . .

# Move into the Next.js app directory
WORKDIR /apps/portal

# Install dependencies
RUN bun install

# Build the Next.js app with Node.js compatibility mode
RUN bun --bun run build

# Expose the port
EXPOSE 3000

# Run Next.js in production mode
CMD ["bun", "--bun", "run", "start"]