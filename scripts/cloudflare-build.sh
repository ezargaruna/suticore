#!/bin/sh
set -eu

ROOT=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
cd "$ROOT"

# Public landing build only. Do not copy the repository wholesale:
# internal protocols and source documents stay outside the Pages artifact.
rm -rf dist
mkdir -p dist
cp index.html dist/index.html
cp -R en assets dist/

test -s dist/index.html
test -s dist/en/index.html
test -s dist/assets/styles.css
test -s dist/assets/site.js

printf '%s\n' 'SUTI.world static artifact ready: dist/'
