#!/bin/bash

INDEX="$HOME/Documents/SRETENIYA/system_index/file_index.txt"
OUT="$HOME/Documents/SRETENIYA/system_index/files.json"

jq -n '[]' > "$OUT"

while read file
do
  size=$(stat -f%z "$file")
  date=$(stat -f%Sm "$file")
  type=$(file -b "$file")

  jq --arg f "$file" \
     --arg s "$size" \
     --arg d "$date" \
     --arg t "$type" \
     '. += [{path:$f,size:$s,date:$d,type:$t}]' \
     "$OUT" > tmp.json && mv tmp.json "$OUT"

done < "$INDEX"
