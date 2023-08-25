# FROM node:lts-alpine
# WORKDIR /usr/src/app
# COPY . .
# RUN npm install --production
# RUN npm run build
# CMD ["npm", "start"]


# Use the official Node.js image as the base image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./
COPY . .
RUN npm install --production
RUN npm run build

CMD ["npm", "start"]
