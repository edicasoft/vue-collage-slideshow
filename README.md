# vue-collage-slideshow
Responsive slideshow with animated collages for Vue.js.
After given images have loaded, component generates collages with different templates.
Every slide can contain up to 5 pictures.
Using transition animation, the component creates a different slide effects for every image in a collage (slide from the left/right/top/bottom).
Collages are made in a way that vertical and horizontal images fit to container as best as possible.
Slideshow takes up 100% of the container height.
## Installation:
Just use `npm install --save vue-collage-slideshow`
##Usage:
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
<slideshow :images="images" 
           :slidesInterval="4000"
            height="600px">
</slideshow>
```
#### Props:
```
`images`: Array of Objects with a structure: {image: "https://example.com/images/picture.jpg"}.
`height`: Type: String. Default is `600px`. Define the height of the slideshow container. Could be 100% etc.
`collageSizeMin`: Type: Number. Default is `2`. Minimum is `1`. Define the minimum collage size (number of images that can be in one collage).
`collageSizeMax`: Type: Number. Default is `5`. Maximum is `5`. Define the maximum number of images that can be in one collage.
`slidesInterval`: Type: Number. Default is `4000`. Minimum is `1000` for better experience. Define the time in miliseconds before the next slide will be played.
`showNoImagesMsg`: Type: Boolean. Default is true. Whetere display "no images" text or not.
`noImagesMsg`: Type: String. Default is `No Images`. Define the text of the message that shows up if there are no images.
`showLoadingMsg`: Type: Boolean. Default is true. Whetere display the loader for images preloading or not.
`loadingMsg`: Type: String. Default is `Loading...`. Define the text of the preloader message.
```