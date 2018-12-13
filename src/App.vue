<template>
    <div id="app">
        <transition name="fade">
            <h1 v-if="noImages && !isLoading">No Images</h1>
        </transition>
        <loading-spinner :delay="1500" :loader="isLoading" class="center" text="Loading Images"></loading-spinner>
        <transition name="fade">
            <carousel v-if="!noImages && !isLoading" :per-page="1" :paginationEnabled="false" :autoplay="true"
                      :autoplayTimeout="3000"
                      :autoplayHoverPause="false">
                <slide v-for="(slide, idx) in slides" :key="idx">
                    <component :is="slideTemplate(slide)" :class="slideClass(slide)" :images="slide"/>
                </slide>
            </carousel>
        </transition>
    </div>
</template>

<script>
    import InnerSlide from './InnerSlide';
    import TripleSlide from './TripleSlide';
    import LoadingSpinner from '@/components/LoadingSpinner';
    export default {
        name: 'app',
        components: {
            InnerSlide, TripleSlide, LoadingSpinner
        },
//        props:['images'],
        data(){
            return {
                slides: [],
                isLoading: false,
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
                        this.createCollages(values);
                    })
                    .catch(()=> {
//                       console.log(er);
                    })
                    .finally(()=> {
                        this.isLoading = false;

                    });
        },
        methods: {
            slideTemplate(slide){
                return slide.length == 3 ? 'TripleSlide' : 'InnerSlide'
            },
            slideClass(slide){
                let slideClass = {};
                if (slide.length == 3) slideClass['is-triple'] = true;
                else if (slide.length == 2) slideClass['is-double'] = true;
                else slideClass['is-single'] = true;
                const verticals = slide.filter(item => item.isVertical);
                const horizontals = slide.filter(item => item.isHorizontal);
                if (verticals.length == 2 && slideClass['is-double']) slideClass['of-verticals'] = true;
                if (horizontals.length == 2 && slideClass['is-double']) slideClass['of-horizontals'] = true;
                return slideClass
            },
            loadImage(src){
                return new Promise(function (resolve) {
                    let img = new Image();
                    img.onload = function () {
                        const isHorizontal = this.width >= this.height;
                        resolve({
                            src: src,
                            isHorizontal: isHorizontal,
                            isVertical: !isHorizontal,
                        });
                    };
                    img.onerror = function () {
                        resolve({
                            src: src,
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

            slideIsFull(slide, next_image){
                let isFull = false;
                if (slide.length == 3) {
                    return true;
                }
                const horizontals = slide.filter(item => item.isHorizontal);
                const verticals = slide.filter(item => item.isVertical);

                if (horizontals.length == 2 && next_image.isHorizontal) isFull = true;
                else if (verticals.length == 2) isFull = true;
                else if (horizontals.length == 1 && verticals.length == 1 && next_image.isVertical) isFull = true;

                return isFull;
            },
            setFirstVertical(slide){
                slide.sort((x, y) => x.isVertical ? -1 : y.isVertical ? 1 : 0);
                return slide;
            },
            pushSlide(slide){
                slide = this.setFirstVertical(slide);
                this.slides.push(slide);
            },
            createCollages(images){
//                console.log(images);
                let slide = [];
                this.slides = [];
                images.forEach((image) => {
                    if (image.is_error) return;
                    if (this.slideIsFull(slide, image)) {
//                        console.log('slideIsFull');
                        slide = this.setFirstVertical(slide);
                        this.pushSlide(slide);
                        slide = [];
                    }
//                    console.log(i, image.isHorizontal ? 'horizontal' : 'vertical');
                    slide.push(image);
                });
                this.pushSlide(slide);
//                console.log('slides', this.slides);
            }
        }
    }
</script>
