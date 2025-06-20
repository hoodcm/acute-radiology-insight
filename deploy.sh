#!/usr/bin/env bash
set -euo pipefail

# Path configuration
BUILD_DIR="dist"
PUBLISH_DIR="docs"
CUSTOM_DOMAIN="leveloneradiology.com"

echo "📦 Building project..."
npm run build

cp "$BUILD_DIR/index.html" "$BUILD_DIR/404.html"

if [ ! -d "$BUILD_DIR" ]; then
  echo "❌ Error: '$BUILD_DIR' folder not found. Aborting."
  exit 1
fi

echo "🧹 Cleaning '$PUBLISH_DIR' folder..."
rm -rf "$PUBLISH_DIR"
mkdir -p "$PUBLISH_DIR"

echo "📂 Copying build output to '$PUBLISH_DIR'..."
cp -r "$BUILD_DIR"/* "$PUBLISH_DIR"/

echo "🔒 Writing CNAME for custom domain..."
echo "$CUSTOM_DOMAIN" > "$PUBLISH_DIR"/CNAME

echo "🔄 Committing and pushing to GitHub..."
git add "$PUBLISH_DIR"
git commit -m "chore(deploy): $(date -u +'%Y-%m-%d %H:%M:%S UTC')"
git push

echo "✅ Deployment complete. Your site will update in ~1–2 minutes."
