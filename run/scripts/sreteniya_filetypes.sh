#!/bin/bash

BASE=~/Documents/SRETENIYA
OUT=$BASE/system_index/filetypes_report.txt

echo "Scanning file types..."

fd . $BASE -t f -x file -b {} \
| cut -d',' -f1 \
| sort | uniq -c | sort -nr > $OUT

echo "Saved to $OUT"
