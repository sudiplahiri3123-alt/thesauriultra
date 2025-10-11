#!/bin/bash

# Get the directory of the script
BASE_DIR="$(cd "$(dirname "$0")" && pwd)"

# Load environment variables from .env if present
if [ -f "$BASE_DIR/.env" ]; then
  set -a
  source "$BASE_DIR/.env"
  set +a
fi

# Define the path to the release binary
REL_BIN="$BASE_DIR/wordnet_service/bin/wordnet_service"

# Make sure the binary is executable
chmod +x "$REL_BIN"

# Start the server
exec "$REL_BIN" start



