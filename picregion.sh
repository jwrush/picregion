#!/bin/sh
#usage picregion.sh FILE PROMPT
#outputs X1 Y1 X2 Y2 to stdout

./node_modules/.bin/electron main.js $1 $2
