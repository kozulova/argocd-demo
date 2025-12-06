# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Enable Yarn
RUN corepack enable && corepack prepare yarn@stable --activate

COPY package.json yarn.lock ./
RUN yarn install

COPY tsconfig*.json ./
COPY src ./src

RUN yarn build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn install --production

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/index.js"]
