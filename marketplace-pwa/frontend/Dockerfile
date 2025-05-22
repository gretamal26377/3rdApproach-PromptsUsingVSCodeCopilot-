# Use the official Node.js ver 18 with Alpine lightweight Linux
FROM node:18-alpine

WORKDIR /marketplace-pwa/frontend
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Only for documentation purposes, docker-compose.yml really will expose the port in the container
EXPOSE 3000
CMD ["npm", "start"]