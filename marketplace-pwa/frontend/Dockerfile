# Notice: In Dockerfiles can't have inline comments, just above or below the code
# Use the official Node.js ver 18 with Alpine lightweight Linux
FROM node:18-alpine

# This is default ARG if it's not set in docker-compose.yml.
# If Dockerfile is run directly, it will use "customer" as default ARG
ARG APP_TYPE=customer

WORKDIR /marketplace-pwa/frontend/src/${APP_TYPE}
COPY package*.json ./
RUN npm install
COPY . ./

# Build only the selected frontend
RUN npm run build

# Only for documentation purposes, docker-compose.yml really will expose the port in the container
EXPOSE 3000
CMD ["npm", "start"]