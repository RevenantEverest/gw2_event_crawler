#!/bin/bash

cd "$(dirname "$0")/.." || exit

docker-compose exec crawler sh