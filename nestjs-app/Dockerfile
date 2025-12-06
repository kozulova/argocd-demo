# Stage 1: Build
FROM node:24-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare yarn@stable --activate

COPY package.json yarn.lock ./
RUN yarn install

COPY tsconfig*.json ./
COPY src ./src

RUN yarn build

EXPOSE 3003
CMD ["node", "dist/main.js"]
ß