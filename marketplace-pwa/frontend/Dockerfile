# Notice: In Dockerfiles can't have inline comments, just above or below the code
# Use the official Node.js ver 18 with Alpine lightweight Linux
FROM node:18-alpine

# This is default ARG if it's not set in docker-compose.yml.
# If Dockerfile is run directly, it will use "customer" as default ARG
ARG APP_TYPE=customer

WORKDIR /marketplace-pwa/frontend/${APP_TYPE}

# Copy only the relevant package.json and package-lock.json for the selected app
COPY ./${APP_TYPE}/package*.json ./

# Ensure a clean install for the next step
RUN rm -rf node_modules package-lock.json
# This will ensure that the container has a clean state before installing dependencies
RUN apk add --no-cache python3 make g++
# Install dependencies for the selected app inside the container taking as path WORKDIR
RUN npm install

# Copy the rest of the selected app's source code from docker-compose build context folder
# to defined WORKDIR inside the container as destination path uses relative path ("./")
COPY ./${APP_TYPE} ./
# Copy the shared folder for use by both frontends
COPY ./shared ./shared

# Build the selected frontend using as path WORKDIR
RUN npm run build

# Only for documentation purposes, docker-compose.yml really will expose the port in the container
EXPOSE 3000

# Start the selected frontend app using as path WORKDIR
CMD ["npm", "start"]