#!/usr/bin/env bash
# scripts/build.sh
set -e
echo "Building docker images for frontend/backend/ai-service..."
docker compose build
echo "Build finished."
