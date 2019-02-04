# vue-collage-slideshow
Responsive slideshow with animated collages for Vue.js.
After given images are preloaded, component generates collages with different templates.
Every slide can contain up to 5 pictures.
Using transition animation, the component creates a different slide effects for every image in a collage (slide from the left/right/top/bottom).
Collages are made in a way that vertical and horizontal images fit to container as best as possible.
Slideshow takes up 100% of the container height.
## Demo:
[Check out the demo on jsFiddle](https://jsfiddle.net/dmykhailova/xwgasdt7/show/)
## Installation:
Just use `npm install --save vue-collage-slideshow`
## Set up:
```
import Slideshow from 'vue-collage-slideshow';

export default {
  ...
  components: {
    Slideshow
  }
  ...
};
```

## Usage:
```
<slideshow :images="images" 
           :slidesInterval="4000"
            height="600px">
</slideshow>
```
#### Props:

| Props               | Type      | Default                                         | Description  |
| --------------------|:----------| ------------------------------------------------|--------------|
| images              | Array     | []                                              | Array of Objects with a structure: {image: "https://example.com/images/picture.jpg"} |
| height              | String    | '600px'                                         | Define the height of the slideshow container. Could be 100% etc  |
| collageSizeMin      | Number    |  2                                              | Define the minimum collage size (number of images that can be in one collage) |
| collageSizeMax      | Number    |  5                                              | Define the maximum number of images that can be in one collage |
| slidesInterval      | Number    | 4000                                            | Minimum is `1000` for better experience. Define the time in miliseconds before the next slide will be played |
| showNoImagesMsg     | Boolean   | true                                            | Whetere display "no images" text or not |
| noImagesMsg         | String    | 'No Images'                                     | Define the text of the message that shows up if there are no images |
| showLoadingMsg      | Boolean   | true                                            | Whetere display the loader for images preloading or not |
| loadingMsg          | String    | 'Loading...'                                    | Define the text of the preloader message |

## Contribution
Feel free to contribute on [GitHub](https://github.com/edicasoft/vue-collage-slideshow)
