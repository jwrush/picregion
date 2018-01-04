#!/bin/bash
#usage piccrop.sh Image Out

#convert between bounding box region output by picregion (X1 Y1 X2 Y2)
#to the dimensions + offset form used by im crop (WxH+X1+Y2)
crop_region=$(picregion $1 'Crop' | awk '{print $3 - $1 "x" $4 - $2 "+" $1 "+" $2}')

echo cropping to $crop_region

#call image magick
convert $1 -crop $crop_region +repage $2
