#!/usr/bin/env bash
# scripts/deploy.sh
# Very small example — adapt to your cloud provider (Render, Railway, AWS, etc.)
set -e
echo "This script is a template for deploying Jobify AI."
echo "1) Ensure docker images are built."
echo "2) Push images to your container registry (Docker Hub / ECR)."
echo "3) Update your cloud service to pull new images."
echo ""
echo "Example (docker hub):"
echo "  docker compose build"
echo "  docker tag jobify-ai_backend:latest yourrepo/jobify-backend:latest"
echo "  docker push yourrepo/jobify-backend:latest"
