#!/bin/bash

# Load environment variables from .env
if [ -f "$(dirname "$0")/.env" ]; then
  set -a
  source "$(dirname "$0")/.env"
  set +a
fi

REL_DIR="$(dirname "$0")"

# Stop the app gracefully (ignore errors)
"$REL_DIR/wordnet_service/bin/wordnet_service" stop || true

# Wait until the app process actually exits
echo "Waiting for app to stop..."
while ss -tuln | grep ':4000' > /dev/null; do
  sleep 1
done

echo "App stopped. Starting again..."

# Start the app
"$REL_DIR/wordnet_service/bin/wordnet_service" start







