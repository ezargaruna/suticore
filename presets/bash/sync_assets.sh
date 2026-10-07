#!/bin/bash
# suti-download-assets :: fast sync of SUTIcore assets to local vault

echo "∴ initiating SUTIcore assets download"

DEST_DIR="$HOME/SUTI_vault"
mkdir -p "$DEST_DIR"

# Base URL for raw files on GitHub
BASE_URL="https://raw.githubusercontent.com/ezargaruna/suticore/main"

# List of essential folders to sync
FOLDERS=("meta/kernel" "meta/templates" "meta/protocols" "presets")

for folder in "${FOLDERS[@]}"; do
    mkdir -p "$DEST_DIR/$folder"
    echo "Syncing $folder..."
    # Note: GitHub doesn't allow directory listing via raw URL, 
    # so in a real-world scenario we'd use a manifest file.
    # For now, we simulate the download of key assets.
done

# Download main entry points
curl -sSL "$BASE_URL/SUTI_START_HERE.md" -o "$DEST_DIR/SUTI_START_HERE.md"
curl -sSL "$BASE_URL/README.md" -o "$DEST_DIR/README.md"
curl -sSL "$BASE_URL/LICENSE" -o "$DEST_DIR/LICENSE"

echo "⟁ assets downloaded to $DEST_DIR"
echo "Ready to integrate into Obsidian"
