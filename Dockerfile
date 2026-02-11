FROM node:24-slim AS builder
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:24-slim
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN npm ci --production
RUN npm cache clean --force
COPY --from=builder /usr/src/app/lib /usr/src/app/lib
ENV NODE_ENV="production"
CMD [ "npm", "start" ]
