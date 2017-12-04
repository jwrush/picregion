#!/bin/sh
#usage picregion.sh FILE PROMPT
#outputs X1 Y1 X2 Y2 to stdout

~/Dev/picregion/node_modules/.bin/electron ~/Dev/picregion/main.js $1 $2
