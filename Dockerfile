# Simple Dockerfile for server only (Mongo is external)
FROM node:20-alpine AS base

WORKDIR /app

# Install server deps
COPY server/package.json server/package-lock.json* ./server/
RUN cd server && npm ci --omit=dev

# Copy source
COPY server ./server

WORKDIR /app/server

ENV NODE_ENV=production \
	PORT=3000

EXPOSE 3000

CMD ["node", "src/app.js"]
