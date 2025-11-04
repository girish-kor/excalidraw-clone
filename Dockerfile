# Dockerfile for a production-ready Next.js application

# ---- Base Stage ----
# Use a specific Node.js version for reproducibility
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install pnpm for efficient dependency management
RUN npm install -g pnpm

# ---- Dependencies Stage ----
FROM base AS deps

# Copy package manager files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile --prod=false

# ---- Builder Stage ----
FROM base AS builder

# Copy dependencies from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application source code
COPY . .

# Set build-time environment variables
# These should be passed in during the build process, e.g., via docker build --build-arg
ARG NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}

# Build the Next.js application
RUN pnpm build

# ---- Runner Stage ----
FROM base AS runner

# Set environment to production
ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy built assets from the 'builder' stage
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public

# Expose the port the app runs on
EXPOSE 3000

# Set the default command to start the application
CMD ["pnpm", "start"]
