# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.5.1
FROM node:${NODE_VERSION}-slim as base

# Node.js app lives here
WORKDIR /app

# Install node modules
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM alpine:edge
RUN apk upgrade --update-cache --available && \
    apk add openssl && \
    rm -rf /var/cache/apk/*


# Copy application code
COPY . .

# Set production environment
FROM base as production

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000

#Inicialize Prisma
RUN npx prisma generate

RUN npx tsc --build
CMD [ "node", "build/server.js" ]

