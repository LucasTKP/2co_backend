# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.5.1
FROM node:${NODE_VERSION}-slim as base

# Node.js app lives here
WORKDIR /app

# Install pnpm
ARG PNPM_VERSION=8.6.5
RUN npm install -g pnpm@$PNPM_VERSION

# Install node modules
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy application code
COPY . .

# Set production environment
FROM base as production

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000

RUN npx tsc --build
CMD [ "node", "build/server.js" ]
