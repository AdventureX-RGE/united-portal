FROM node:latest

WORKDIR /app

# Copy workspace configuration
COPY package.json bun.lockb* ./

# Copy env app package.json for workspace resolution
COPY apps/portal/package.json ./apps/env/
COPY apps/portal/bun.lockb* ./apps/env/

# Install all dependencies (workspace + env)
RUN npm i -g bun && bun install --frozen-lockfile

# Copy the entire source code
COPY . .

# Change to env directory for build
WORKDIR /app/apps/env

# Build the env app
RUN npx modern deploy

# Expose port
EXPOSE 8080

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["node", ".output/index"]