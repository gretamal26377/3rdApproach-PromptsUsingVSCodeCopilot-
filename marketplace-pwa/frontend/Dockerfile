FROM node:18-alpine # Use the official Node.js ver 18 with Alpine lightweight Linux

WORKDIR /marketplace-pwa/frontend
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

EXPOSE 3000 # Only for documentation purposes, docker-compose.yml really will expose the port in the container
CMD ["npm", "start"]