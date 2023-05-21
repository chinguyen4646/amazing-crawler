#!/bin/bash

# Image name
IMAGE_NAME="amazing-crawler-app"
CONTAINER_NAME="amazing-crawler-app-container"

# Build the Docker image
echo "Building Docker image..."
docker build -t ${IMAGE_NAME} .

# Check if a container with the same name is already running, and if so, stop it
if [ $(docker ps -a -q -f name=^/${CONTAINER_NAME}$) ]; then
    echo "Container with name ${CONTAINER_NAME} is already running or exists. Stopping and removing it..."
    docker stop ${CONTAINER_NAME}
    docker rm ${CONTAINER_NAME}
fi

# Run the Docker container
echo "Running Docker container..."
docker run --name ${CONTAINER_NAME} -p 8080:3000 ${IMAGE_NAME}

echo "Application is now running at http://localhost:8080"
