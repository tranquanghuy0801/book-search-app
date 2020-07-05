# Use Node v8.9.0 LTS
FROM node:12.7-alpine

# Setup app working directory
WORKDIR /usr/src/server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy sourcecode
COPY . .

# Start app
CMD [ "node", "app.js" ]