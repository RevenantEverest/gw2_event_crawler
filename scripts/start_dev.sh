#!/bin/bash

cd "$(dirname "$0")/.." || exit

docker-compose stop

docker-compose --env-file .env -f docker-compose.yml -f override.dev.yml build crawler && docker-compose -f docker-compose.yml -f override.dev.yml up crawler