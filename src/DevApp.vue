<template>
    <div id="app">
        <transition name="fade">
            <h1 v-if="noImages  && !isLoading">No Images</h1>
        </transition>
        <loading-spinner :delay="1500" :loader="isLoading" class="center" text="Loading Images"></loading-spinner>
        <component :is="slideTemplate(slide.length)"
                   v-for="(slide, idx) in slides"
                   :animationDuration="animationDuration"
                   :slidesInterval="slidesInterval"
                   :key="idx"
                   v-if="activeSlide == idx"
                   :status="status"
                   :images="slide"/>
    </div>
</template>

<script>
    import SimpleSlide from '@/components/slides/SimpleSlide';
    import TripleSlide from '@/components/slides/TripleSlide';
    import FourImagesSlide from '@/components/slides/FourImagesSlide';
    import LoadingSpinner from '@/components/LoadingSpinner';
    export default {
        name: 'app',
        components: {
            SimpleSlide, TripleSlide, FourImagesSlide, LoadingSpinner
        },
//        props:['images'],
        data(){
            return {
                slides: [],
                isLoading: false,
                status: 0, //  0 = idle, 1 = running, 2 = paused, 3 = resumed
                slidesTimeout: false,
                activeSlide: 0,
                slidesInterval: 4000,
                animationDuration: 500,
                animationTimeout: false,
                images: [

                    {image: "https://www.rd.com/wp-content/uploads/2016/04/01-cat-wants-to-tell-you-laptop.jpg"},

                    {image: "https://www.rd.com/wp-content/uploads/2016/04/01-cat-wants-to-tell-you-laptop.jpg"},      {image: "https://www.rd.com/wp-content/uploads/2016/04/01-cat-wants-to-tell-you-laptop.jpg"},

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
                        window.addEventListener('keyup', this.pressSpacebar)
                    });
        },
        methods: {
            pressSpacebar(e){
                if (e.keyCode == 32) {
                    console.log(this.status);
                    switch (this.status) {
                        case 1:
                        case 3:
                            this.pause();
                            break;
                        case 2:
                            this.resume();
                            break;
                        default:
                            this.play()
                    }
                }
            },
            pause(){
                console.log('pause');
                clearTimeout(this.slidesTimeout);
                this.status = 2;
            },
            resume(){
                console.log('resume');
                this.status = 3;
                clearTimeout(this.animationTimeout);
                this.animationTimeout = setTimeout(this.nextSlide, this.animationDuration);
            },
            play(){
                if (this.slides.length <= 0) return;
                console.log('play');
                this.startSlidesTimeout();
            },
            nextSlide(){
                this.activeSlide++;
                if (this.activeSlide >= this.slides.length) {
                    this.activeSlide = 0;
                }
                console.log('slide', this.activeSlide);
                this.startSlidesTimeout();
            },
            startSlidesTimeout(){
                this.status = 1;
                clearTimeout(this.slidesTimeout);
                this.slidesTimeout = setTimeout(()=> {
                    this.nextSlide();
                }, this.slidesInterval);
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
            slideTemplate(count){
                switch (count) {
                    case 3:
                        return 'TripleSlide';
                    case 4:
                        return 'FourImagesSlide';
                    default:
                        return 'SimpleSlide';
                }
            },
            getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            createCollages(images){
                this.slides = [];
                let index = 0;
                let size = 1;
                while (index < images.length) {
                    size = this.getRandomInt(3, 4);
                    let slide = images.slice(index, size + index);
                    this.slides.push(slide);
                    index = size + index;
                }
            }
        }
    }
</script>
