# vue-collage-slideshow
Responsive slideshow with animated collages for Vue.js that takes up 100% of the window height.
Generates collages with different templates from an array of given images with up to 5 images in every slide.
Using transition animation, creates a different slide effects for every image in a collage (slide from the left/right/top/bottom).
Collages are made in a way that vertical and horizontal images fit to container as best as possible.
## Installation:
Just use `npm install --save vue-collage-slideshow`
##Usage:
Set the parent container height to 100% or any other fixed value (for example - 500px)
###Global:
```
import Vue from 'vue';
import Slideshow from 'vue-collage-slideshow';

Vue.use(Slideshow);
```
###Local:
```
import Slideshow from 'vue-carousel';

export default {
  ...
  components: {
    Slideshow
  }
  ...
};
```
## Demo
Check out the demo here:

##Usage:
```
<slideshow :images="images" :collageSizeMin="2" :collageSizeMax="5" :slidesInterval="4000"></slideshow>
```
#### Props:
`images`: Array of Objects with a structure: {image: "https://example.com/images/picture.jpg"},
`collageSizeMin`: Default is `2`. Minimum is `1`. Define the minimum collage size (number of images that can be in one collage),
`collageSizeMax`: Default is `5`. Maximum is `5`. Define the maximum number of images that can be in one collage,
`slidesInterval`: Default is `4000`. Minimum is `1000`. Define the time before the next slide will be played.

### Gotchas:
Give the parent container required height!