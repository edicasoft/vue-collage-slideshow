<template>
    <div id="app">
        <transition name="fade">
            <h1 v-if="noImages  && !isLoading">No Images</h1>
        </transition>
        <!--<loading-spinner :delay="1500" :loader="isLoading" class="center" text="Loading Images"></loading-spinner>-->
        <!--<transition name="fade">-->
        <!--<carousel v-if="!noImages && !isLoading" :per-page="1" :paginationEnabled="false" :autoplay="true"-->
        <!--:autoplayTimeout="3000"-->
        <!--:autoplayHoverPause="false">-->
        <!--<slide v-for="(slide, idx) in slides" :key="idx">-->
        <component :is="slideTemplate(slide.length)"
                   v-for="(slide, idx) in slides"
                   :autoplayTimeout="autoplayTimeout"
                   :animationDuration="animationDuration"
                   :key="idx"
                   v-if="activeSlide == idx"
                   :isActive="activeSlide == idx"
                   :class="slideClass(slide)"
                   :images="slide"/>
        <!--</slide>-->
        <!--</carousel>-->
        <!--</transition>-->
    </div>
</template>

<script>
    import SimpleSlide from '@/components/slides/SimpleSlide';
    import TripleSlide from '@/components/slides/TripleSlide';
    import LoadingSpinner from '@/components/LoadingSpinner';
    export default {
        name: 'app',
        components: {
            SimpleSlide, TripleSlide, LoadingSpinner
        },
//        props:['images'],
        data(){
            return {
                slides: [],
                isLoading: false,
                isPlaying: false,
                slidesInterval: false,
                activeSlide: 0,
                animationDuration: 500,
                autoplayTimeout: 4000,
                images: [

                    {image: "https://www.rd.com/wp-content/uploads/2016/04/01-cat-wants-to-tell-you-laptop.jpg"},

                    {image: "https://www.rd.com/wp-content/uploads/2016/04/01-cat-wants-to-tell-you-laptop.jpg"},
                    {image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Eiffel_Tower_Vertical.JPG/802px-Eiffel_Tower_Vertical.JPG"},
                    {image: "http://www.baltana.com/files/wallpapers-1/Lotus-HD-Wallpapers-02797.jpg"},

//                    {image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Eiffel_Tower_Verticalsad.JPG/802px-Eiffel_Tower_Vertical.JPG"},

                    {image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Eiffel_Tower_Vertical.JPG/802px-Eiffel_Tower_Vertical.JPG"},
                    {image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Eiffel_Tower_Vertical.JPG/802px-Eiffel_Tower_Vertical.JPG"},

                    {image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Eiffel_Tower_Vertical.JPG/802px-Eiffel_Tower_Vertical.JPG"},
                    {image: "https://www.rd.com/wp-content/uploads/2016/04/01-cat-wants-to-tell-you-laptop.jpg"},
                    {image: "https://www.rd.com/wp-content/uploads/2016/04/01-cat-wants-to-tell-you-laptop-1024x683.jpg"},

                    {image: "https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png"},
                    {image: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"},
                    {image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Eiffel_Tower_Vertical.JPG/802px-Eiffel_Tower_Vertical.JPG"},


                    {image: "https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg"},
                    {image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Eiffel_Tower_Vertical.JPG/802px-Eiffel_Tower_Vertical.JPG"},
                    {image: "http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg"},

                    {image: "https://www.rd.com/wp-content/uploads/2016/04/01-cat-wants-to-tell-you-laptop.jpg"},
                    {image: "https://www.rd.com/wp-content/uploads/2016/04/01-cat-wants-to-tell-you-laptop-1024x683.jpg"},
                    {image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Eiffel_Tower_Vertical.JPG/802px-Eiffel_Tower_Vertical.JPG"},

                    {image: "https://www.rd.com/wp-content/uploads/2016/04/01-cat-wants-to-tell-you-laptop.jpg"},
                    {image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Eiffel_Tower_Vertical.JPG/802px-Eiffel_Tower_Vertical.JPG"},

                    {image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Eiffel_Tower_Vertical.JPG/802px-Eiffel_Tower_Vertical.JPG"},
                    {image: "https://www.rd.com/wp-content/uploads/2016/04/01-cat-wants-to-tell-you-laptop.jpg"},
                    {image: "https://www.rd.com/wp-content/uploads/2016/04/01-cat-wants-to-tell-you-laptop.jpg"},
                    {image: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"},
                    {image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Eiffel_Tower_Vertical.JPG/2048px-Eiffel_Tower_Vertical.JPG"},

                ]
            }
        },
        computed: {
            noImages(){
                return !this.images || this.images.length <= 0;
            }
        },
        created(){
            if (this.noImages) return;
            this.isLoading = true;
            this.loadImages()
                    .then(values => {
                        this.createCollages(values.filter(item => !item.is_error));
                    })
                    .catch(()=> {
//                       console.log(er);
                    })
                    .finally(()=> {
                        this.isLoading = false;
                        this.play();
                    });
        },
        methods: {
            play(){
                if (this.slides.length <= 0) return;
                //do not start if it's already playing
                if (this.slidesInterval && this.isPlaying) {
                    clearInterval(this.slidesInterval);
                    this.isPlaying = false;
                    return;
                }
                this.slidesInterval = setInterval(()=> {
                    this.activeSlide++;
                    console.log('slide', this.activeSlide);
                    if (this.activeSlide == this.slides.length) {
                        clearInterval(this.slidesInterval);
                        this.isPlaying = false;
                    }
                }, this.autoplayTimeout);

                this.isPlaying = true;
            },
            loadImage(src){
                return new Promise(function (resolve) {
                    let img = new Image();
                    img.onload = function () {
                        const isHorizontal = this.width >= this.height;
                        resolve({
                            image: src,
                            isHorizontal: isHorizontal,
                            isVertical: !isHorizontal,
                        });
                    };
                    img.onerror = function () {
                        resolve({
                            image: src,
                            is_error: true
                        });
                    };
                    img.src = src;
                });
            },
            loadImages(){
                this.slides = [];
                var promises = [];

                this.images.forEach(item => {
                    promises.push(this.loadImage(item.image));
                });
                return Promise.all(promises);
            },
            slideClass(slide){
                const verticals = slide.filter(item => item.isVertical);
                const horizontals = slide.filter(item => item.isHorizontal);
                switch (slide.length) {
                    case 1:
                        return 'is-single';
                        break;
                    case 2:
                        return `is-double is-double-${this.getRandomInt(1, 3)}`;
                        break;
                    case 3:
                        let classType = `is-triple-${this.getRandomInt(1, 4)}`;
//                        let classType = `is-triple-${this.getRandomInt(2, 2)}`;
                        if (verticals.length == 3)
                            classType = `is-triple-5`;
                        return `is-triple ${classType}`;
                        break;
                    case 4:
                        return 'is-four';
                        break;
                    case 5:
                        return 'is-five';
                        break;
                }
            },
            slideTemplate(count){
                switch (count) {
                    case 3:
                        return 'TripleSlide';
                        break;
                    default:
                        return 'SimpleSlide';
                }
            },
            setFirstVertical(slide){
                slide.sort((x, y) => x.isVertical ? -1 : y.isVertical ? 1 : 0);
                return slide;
            },
            getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            rearrangeImages(slide){
                switch (slide.length) {
                    case 2:
                        return this.setFirstVertical(slide);
                        break;
                    case 3:
                        return this.setFirstVertical(slide);
                        break;
                    default:
                        return slide;
                }
            },
            createCollages(images){
                this.slides = [];
                let index = 0;
                let size = 1;
                while (index < images.length) {
                    size = this.getRandomInt(2, 3);
                    this.slides.push(this.rearrangeImages(images.slice(index, size + index)));
                    index = size + index;
                }
            }
        }
    }
</script>
