#!/bin/bash
DOCKER_IMAGE_ADDRESS=740499407256.dkr.ecr.ap-northeast-2.amazonaws.com/storywindow-fe:latest
REPO_NAME=storywindow-fe

#ecr login
LOGIN_INFO=$(aws ecr get-login --no-include-email --region ap-northeast-2)

#docker login
eval ${LOGIN_INFO}

#docker pull
docker pull ${DOCKER_IMAGE_ADDRESS}

#docker rm
docker rm -f $(docker ps -qa -f "name=frontend")

#docker run
docker run -d --name frontend -p 3000:3000 ${DOCKER_IMAGE_ADDRESS}

#docker rmi
docker rmi $(docker images -f "dangling=true" -q)

#aws ecr remove
IMAGES=$(aws ecr list-images --region ap-northeast-2 --repository-name ${REPO_NAME} --filter "tagStatus=UNTAGGED" --query 'imageIds[*]' --output json)

aws ecr batch-delete-image --region ap-northeast-2 --repository-name ${REPO_NAME} --image-ids "$IMAGES" || true