#!/bin/bash

# Load environment variables from .env
if [ -f "$(dirname "$0")/.env" ]; then
  set -a
  source "$(dirname "$0")/.env"
  set +a
fi

REL_DIR="$(dirname "$0")"

"$REL_DIR/wordnet_service/bin/wordnet_service" stop


