#!/bin/bash

BASE=~/Documents/SRETENIYA
DUP=~/Documents/SRETENIYA/archive_duplicates

mkdir -p $DUP

fd "_1\." $BASE -t f -x mv {} $DUP
fd "_2\." $BASE -t f -x mv {} $DUP
fd "_all\." $BASE -t f -x mv {} $DUP
