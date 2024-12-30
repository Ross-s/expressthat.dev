FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
 
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
# Replace <your-major-version> with the major version installed in your repository. For example:
# RUN yarn global add turbo@^2
RUN pnpm i -g turbo@^2
COPY . .
 
# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "vue" is the name entered in the project's package.json: { name: "vue" }
RUN turbo prune vue --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN pnpm install
 
# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build
 
FROM base AS runner
WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 vue
USER vue
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/vue/advanced-features/output-file-tracing
COPY --from=installer --chown=vue:nodejs /app/apps/docs/vue/ ./
 
EXPOSE 3000

# Set NuxtJS system variables so the application can be reached on your network
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000


# The NuxtJS start-up command when the container is launched to serve the built application
#CMD ["sleep", "infinity"]
CMD [ "node", ".output/server/index.mjs" ]