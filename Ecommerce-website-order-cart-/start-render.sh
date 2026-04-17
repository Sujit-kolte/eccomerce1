#!/bin/bash
set -e

# This script helps Render deploy from the root directory
# by explicitly navigating and installing dependencies

echo "🚀 Starting Render deployment from root..."

# Install dependencies at root level
npm install

# Print success
echo "✅ Deployment prep complete. Starting application..."
