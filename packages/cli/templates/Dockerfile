# Base image with Bun preinstalled
FROM oven/bun:1.0

# Set working directory inside the container
WORKDIR /

# Copy all files (adjust if needed for mono-repo)
COPY . .

# Move into the Next.js app directory
WORKDIR /apps/portal

# Install dependencies
RUN bun install

# Build the Next.js app
RUN bunx next build

# Expose the port
EXPOSE 3000

# Run Next.js in production mode
CMD ["bunx", "next", "start", "-p", "3000", "-H", "0.0.0.0"]
