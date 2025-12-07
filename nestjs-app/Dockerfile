# Stage 1: Build
FROM node:24-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare yarn@stable --activate

COPY package.json yarn.lock ./
RUN yarn install

COPY tsconfig*.json ./
COPY src ./src
COPY job.yaml ./

RUN yarn build

EXPOSE 3000
CMD ["node", "dist/main.js"]
