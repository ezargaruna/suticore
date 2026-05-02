#!/bin/bash

BASE=~/Documents/SRETENIYA
OUT=$BASE/system_index/similar_names.txt

fd . $BASE -t f \
| sed 's/_[0-9]\+\././g' \
| sort | uniq -d > $OUT

echo "Similar names saved to $OUT"
