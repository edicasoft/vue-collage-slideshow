<template>
    <div id="app">
        <transition name="fade">
            <h1 v-if="noImages  && !isLoading">No Images</h1>
        </transition>
        <loading-spinner :delay="1500" :loader="isLoading" class="center" text="Loading Images"></loading-spinner>
        <component :is="slideTemplate(slide.length)"
                   v-for="(slide, idx) in slides"
                   :autoplayTimeout="autoplayTimeout"
                   :animationDuration="animationDuration"
                   :key="idx"
                   v-if="activeSlide == idx"
                   :isActive="activeSlide == idx"
                   :status="status"
                   :class="slide.slideClass"
                   :images="slide"/>
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
                status: 0, //  0 = idle, 1 = running, 2 = paused, 3 = resumed
                slidesInterval: false,
                activeSlide: 0,
                animationDuration: 500,
                autoplayTimeout: 4000,
                remaining: 0,
                startTime: 0,
                remainingTimeout: false,
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
                        window.addEventListener('keyup', this.pressSpacebar)
                    });
        },
        methods: {
            //TODO:: play/pause by the space btn, play in a loop
            pressSpacebar(e){
                if (e.keyCode == 32) {
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
                if (this.slidesInterval) {
                    clearInterval(this.slidesInterval);
                    this.remaining = this.autoplayTimeout - (new Date() - this.startTime);
                    console.log('pause', this.remaining);
                    this.status = 2;
                }
            },
            resume(){
                console.log('resume', this.remaining);
                this.status = 3;
                if(this.remainingTimeout)
                    clearTimeout(this.remainingTimeout);
                this.remainingTimeout = setTimeout(this.startSlidesInterval, this.remaining);
            },
            play(){
                if (this.slides.length <= 0) return;
                console.log('play');
                this.status = 1;
                this.startTime = new Date();
                this.startSlidesInterval();
            },
            startSlidesInterval(){
                this.startTime = new Date();
                this.slidesInterval = setInterval(()=> {
                    this.activeSlide++;
                    console.log('slide', this.activeSlide);
                    if (this.activeSlide >= this.slides.length) {
                        this.activeSlide = 0;
                    }
                }, this.autoplayTimeout);
                this.status = 1;
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
            getSlideClass(slide){
                const verticals = slide.filter(item => item.isVertical);
                const horizontals = slide.filter(item => item.isHorizontal);
                switch (slide.length) {
                    case 1:
                        return 'is-single';
                        //vertical image is always goes first
                    case 2:
                        this.setFirstVertical(slide);
                        return `is-double is-double-${this.getRandomInt(1, 3)}`;
                        //vertical image is always goes first
                    case 3:
                        const rndType = this.getRandomInt(1, 4);
//                        console.log('rndType', rndType);
//                        console.log('verticals', verticals.length);
                        const classType = `is-triple`;
                        //for three vertical images in the row
                        if (verticals.length == 3) {
                            return `${classType} is-triple-5`;
                        }
                        // if a slide has the only one vertical img - use templates that doesn't use 3/4 of a slide width for it
                        if (verticals.length == 1) {
                            this.setFirstVertical(slide);
                            return `${classType} is-triple-${this.getRandomInt(1, 2)}`;
                        }
                        // use horizontal image for the 3/4 of a slide width
                        if (rndType >= 3)
                            this.setFirstHorizontal(slide);
                        return `${classType} is-triple-${rndType}`;
                    case 4:
                        return `is-four is-four-${this.getRandomInt(1, 3)}`;
                    case 5:
                        return `is-four is-four-${this.getRandomInt(1, 3)}`;
                    case 6:
                        return `is-four is-four-${this.getRandomInt(1, 3)}`;
                    case 7:
                        return `is-four is-four-${this.getRandomInt(1, 3)}`;
                }
            },
            slideTemplate(count){
                switch (count) {
                    case 3:
                        return 'TripleSlide';
                    default:
                        return 'SimpleSlide';
                }
            },
            setFirstVertical(slide){
                slide.sort((x, y) => x.isVertical ? -1 : y.isVertical ? 1 : 0);
            },
            setFirstHorizontal(slide){
                slide.sort((x, y) => x.isHorizontal ? -1 : y.isHorizontal ? 1 : 0);
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
                    size = this.getRandomInt(2, 3);
                    let slide = images.slice(index, size + index);
                    slide.slideClass = this.getSlideClass(slide);
                    this.slides.push(slide);
                    index = size + index;
                }
            }
        }
    }
</script>
