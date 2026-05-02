#!/bin/bash

TARGET=~/Documents/SRETENIYA
OUT=~/Documents/SRETENIYA/system_index/duplicates.txt

echo "Scanning duplicates..."

fd . "$TARGET" -t f -x basename {} | sort | uniq -d > "$OUT"

echo "Saved to $OUT"
