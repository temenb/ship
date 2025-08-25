FROM node:22
ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY shared/logger/ ./shared/logger/
COPY turbo.json  ./
COPY package.json ./
COPY pnpm-workspace.yaml ./
COPY services/ship/package*.json ./services/ship/
COPY services/ship/jest.config.js ./services/ship/
COPY services/ship/tsconfig.json ./services/ship/
COPY services/ship/src ./services/ship/src/
COPY services/ship/prisma ./services/ship/prisma/
COPY services/ship/__tests__ ./services/ship/__tests__/

USER root

RUN corepack enable && pnpm install
RUN chown -R node:node /usr/src/app

USER node

RUN pnpm --filter @shared/logger build
RUN pnpm --filter ship build

EXPOSE 3000

CMD ["pnpm", "--filter", "ship", "start"]

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
