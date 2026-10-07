#!/bin/bash

rm -rf apps/suti-world/public/specificationes
rm -rf apps/suti-world/public/normae
rm -rf apps/suti-world/public/protocolla

cp -R specificationes apps/suti-world/public/
cp -R normae apps/suti-world/public/
cp -R protocolla apps/suti-world/public/

cp README.md apps/suti-world/public/
cp SYSTEM_MAP.md apps/suti-world/public/

echo "Synced."
