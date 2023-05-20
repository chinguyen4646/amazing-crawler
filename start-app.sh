#!/bin/bash

# Image name
IMAGE_NAME="amazing-crawler-app"
CONTAINER_NAME="amazing-crawler-app-container"

# Build the Docker image
echo "Building Docker image..."
docker build -t ${IMAGE_NAME} .

# Check if a container with the same name is already running, and if so, stop it
if [ $(docker ps -q -f name=${IMAGE_NAME}) ]; then
    echo "Container with name ${IMAGE_NAME} is already running. Stopping and removing it..."
    docker stop ${IMAGE_NAME}
    docker rm ${IMAGE_NAME}
fi

# Run the Docker container
echo "Running Docker container..."
docker run --name ${CONTAINER_NAME} -p 8080:3000 ${IMAGE_NAME}

echo "Application is now running at http://localhost:8080"
