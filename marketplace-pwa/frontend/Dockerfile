# Use the official Node.js ver 18 with Alpine lightweight Linux
FROM node:18-alpine

# Issue?
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