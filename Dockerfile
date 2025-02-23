FROM node:20-slim AS builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-slim
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci --production
RUN npm cache clean --force
COPY --from=builder /usr/src/app/lib /usr/src/app/lib
ENV NODE_ENV="production"
CMD [ "npm", "start" ]
