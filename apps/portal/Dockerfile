FROM node:latest

WORKDIR /app

# Copy workspace configuration
COPY package.json bun.lockb* ./

# Copy portal app package.json for workspace resolution
COPY apps/portal/package.json ./apps/portal/
COPY apps/portal/bun.lockb* ./apps/portal/

# Copy local packages
COPY packages/internal-kit ./packages/internal-kit

# Install all dependencies (workspace + env)
RUN npm i -g bun && bun install --frozen-lockfile

# Copy the entire source code
COPY . .

# Change to portal directory for build
WORKDIR /app/apps/portal

# Build the portal app
RUN npx modern deploy

# Expose port
EXPOSE 8080

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["node", ".output/index"]