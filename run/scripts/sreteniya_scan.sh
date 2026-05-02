#!/bin/bash

HOME_DIR="$HOME"
INDEX_DIR="$HOME/Documents/SRETENIYA/system_index"

mkdir -p "$INDEX_DIR"

fd . "$HOME_DIR" \
--exclude Library \
--exclude node_modules \
--exclude .git \
--type f \
--max-depth 6 \
--threads 2 \
> "$INDEX_DIR/file_index.txt"
