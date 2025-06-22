FROM node:22.14.0 AS base

RUN npm i -g pnpm@10.1.0

FROM base AS builder

WORKDIR /app

COPY . .

ENV NODE_ENV=production

RUN pnpm install --ignore-scripts --frozen-lockfile --production=false

RUN pnpm build

FROM node:22.14.0-alpine AS prod

WORKDIR /app

ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.env* ./

USER nextjs

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
