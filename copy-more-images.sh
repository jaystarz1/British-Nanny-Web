#!/bin/bash

# Script to copy additional images to the gallery
# This adds gallery-9.jpg through gallery-15.jpg (and more if needed)

echo "Copying additional daycare images..."

# Copy more images from the Desktop folder
cp "/Users/jaytarzwell/Desktop/British Nanny Daycare/486199491_637306982493918_5461021652175827156_n.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/gallery-9.jpg"
cp "/Users/jaytarzwell/Desktop/British Nanny Daycare/494116639_2920797968103686_8185086505694320786_n.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/gallery-10.jpg"
cp "/Users/jaytarzwell/Desktop/British Nanny Daycare/494203606_2921363754713774_4177086991297970557_n.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/gallery-11.jpg"
cp "/Users/jaytarzwell/Desktop/British Nanny Daycare/494419552_2920935938089889_3496477714512122310_n.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/gallery-12.jpg"
cp "/Users/jaytarzwell/Desktop/British Nanny Daycare/494424156_2920798084770341_3987322833247716049_n.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/gallery-13.jpg"
cp "/Users/jaytarzwell/Desktop/British Nanny Daycare/494426958_2920785298104953_1239159816090179018_n.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/gallery-14.jpg"
cp "/Users/jaytarzwell/Desktop/British Nanny Daycare/494542311_2920785114771638_7990997220795407707_n.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/gallery-15.jpg"

# Optional: Add even more images if you want
# cp "/Users/jaytarzwell/Desktop/British Nanny Daycare/494564837_2920785404771609_3081260732787283650_n.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/gallery-16.jpg"
# cp "/Users/jaytarzwell/Desktop/British Nanny Daycare/494720405_2922459347937548_7060402653052196165_n.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/gallery-17.jpg"
# cp "/Users/jaytarzwell/Desktop/British Nanny Daycare/494768156_2922459351270881_1745904107875251775_n.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/gallery-18.jpg"
# cp "/Users/jaytarzwell/Desktop/British Nanny Daycare/494970132_2920787348104748_9021173423079169981_n.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/gallery-19.jpg"
# cp "/Users/jaytarzwell/Desktop/British Nanny Daycare/496941530_2937866119730204_2228244570383154131_n.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/gallery-20.jpg"

echo "Additional images copied successfully!"
echo "Total images in gallery: $(ls -1 /Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/*.jpg | wc -l)"

# List all gallery images
ls -la /Users/jaytarzwell/british-nanny-website/assets/images/daycare-gallery/
