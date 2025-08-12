#!/bin/bash

# Create the destination directory if it doesn't exist
mkdir -p /Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/

# Copy selected images from Desktop to website folder
# Using cp to copy (not move) the originals

echo "Copying daycare images..."

# Copy the IMG files (these seem to be the main daycare photos)
cp "/Users/jaytarzwell/Desktop/British Nanny Daycare/IMG_0862.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/gallery-1.jpg"
cp "/Users/jaytarzwell/Desktop/British Nanny Daycare/IMG_0867.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/gallery-2.jpg"
cp "/Users/jaytarzwell/Desktop/British Nanny Daycare/IMG_0955.jpeg" "/Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/gallery-3.jpg"

# Copy some of the numbered files (selecting a variety)
cp "/Users/jaytarzwell/Desktop/British Nanny Daycare/475006199_595149023376381_1656517952441535421_n.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/gallery-4.jpg"
cp "/Users/jaytarzwell/Desktop/British Nanny Daycare/494203159_2920785351438281_8556104263048415554_n.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/gallery-5.jpg"
cp "/Users/jaytarzwell/Desktop/British Nanny Daycare/497790100_2935661979950618_7087538883165088061_n.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/gallery-6.jpg"
cp "/Users/jaytarzwell/Desktop/British Nanny Daycare/500702765_2946564022193747_5226186028840678202_n.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/gallery-7.jpg"
cp "/Users/jaytarzwell/Desktop/British Nanny Daycare/503878380_2953390271511122_2253759606852267529_n.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/gallery-8.jpg"

echo "Images copied successfully!"
echo "Gallery images are now in: /Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/"

# List the copied files
ls -la /Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/
