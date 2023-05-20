# Use an official Node runtime as the base image
FROM node:18.15.0

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Set the application's default port
EXPOSE 3000

# Run next.js application
CMD [ "npm", "start" ]
