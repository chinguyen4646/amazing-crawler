#!/bin/bash

# Container name
CONTAINER_NAME="amazing-crawler-app-container"

# If the container is not running, start it
if ! docker ps | grep -q ${CONTAINER_NAME}; then
    docker start ${CONTAINER_NAME}
fi

# If a command line argument is supplied, use it as the test file path
if [ "$#" -gt 0 ]; then
    docker exec ${CONTAINER_NAME} npm test -- $1
else
    docker exec ${CONTAINER_NAME} npm run test
fi
