<template>
    <div class="vc-slideshow" :style="{height}">
        <transition name="fade">
            <slot name="empty" v-if="noImages  && !isLoading && showNoImagesMsg">
                <div class="vc-slideshow-h1">
                    {{noImagesMsg}}
                </div>
            </slot>
        </transition>
        <slot name="loader" v-if="showLoadingMsg && isLoading">
            <loading-spinner :delay="1500" :loader="isLoading" :text="loadingMsg"></loading-spinner>
        </slot>
        <div :class="['vc-slideshow-slide', {'vc-slideshow-active' : activeSlideIdx == idx}]"
             v-for="(slide, idx) in slides" :key="idx">
            <component :is="slideTemplate(slide.length)"
                       :animationDuration="animationDuration"
                       :slidesInterval="slidesInterval"
                       v-if="activeSlideIdx == idx"
                       :status="status"
                       :images="slide"/>
        </div>
    </div>
</template>

<script>
    import SimpleSlide from '@/components/slides/SimpleSlide';
    import TripleSlide from '@/components/slides/TripleSlide';
    import FourImagesSlide from '@/components/slides/FourImagesSlide';
    import FiveImagesSlide from '@/components/slides/FiveImagesSlide';
    import LoadingSpinner from '@/components/LoadingSpinner';
    import './assets/main.scss'
    import './assets/slides.scss'
    import './assets/animation.scss'
    export default {
        name: 'VueCollageSlideshow',
        components: {
            SimpleSlide, TripleSlide, FourImagesSlide, LoadingSpinner, FiveImagesSlide
        },
        props: {
            images: {
                type: Array,
                required: true
            },
            height: {
                type: String,
                default: '600px'
            },
            slidesInterval: {
                type: Number,
                default: 4000,
                validator: (value) => value >= 1000
            },
            collageSizeMin: {
                type: Number,
                default: 2,
                validator: (value) => value >= 1 && value <= 5
            },
            collageSizeMax: {
                type: Number,
                default: 5,
                validator: (value) => value >= 1 && value <= 5
            },
            noImagesMsg: {
                type: String,
                default: 'No Images',
            },
            showNoImagesMsg: {
                type: Boolean,
                default: true,
            },
            showLoadingMsg: {
                type: Boolean,
                default: true,
            },
            loadingMsg: {
                type: String,
                default: 'Loading...',
            },
            keyboardNavigation: {
                type: Boolean,
                default: false,
            },
        },
        data(){
            return {
                slides: [],
                isLoading: false,
                status: 0, //  0 = idle, 1 = running, 2 = paused, 3 = resumed
                slidesTimeout: false,
                activeSlideIdx: 0,
                animationDuration: 500,
                animationTimeout: false
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
            this.loadImages(this.images)
                    .then(values => {
                        this.createCollages(values.filter(item => !item.is_error));
                    })
                    .catch(()=> {
//                       console.log(er);
                    })
                    .finally(()=> {
                        this.isLoading = false;
                        this.play();
                        if (this.keyboardNavigation) window.addEventListener('keyup', this.pressKey)
                    });
        },
        methods: {
            slideTemplate(count){
                switch (count) {
                    case 3:
                        return 'TripleSlide';
                    case 4:
                        return 'FourImagesSlide';
                    case 5:
                        return 'FiveImagesSlide';
                    default:
                        return 'SimpleSlide';
                }
            },
            pressKey(e){
                switch (e.keyCode) {
                    case 32:
                        this.onKeySpace();
                        break;
                    case 37:
                        this.onKeyLeft();
                        break;
                    case 39:
                        this.onKeyRight();
                        break;
                }
            },
            onKeySpace(){
                //                    console.log(this.status);
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
            },
            onKeyLeft(){
                clearTimeout(this.animationTimeout);
                this.animationTimeout = setTimeout(this.previousSlide, this.animationDuration);
            },
            onKeyRight(){
                clearTimeout(this.animationTimeout);
                this.animationTimeout = setTimeout(this.nextSlide, this.animationDuration);
            },
            pause(){
//                console.log('pause');
                clearTimeout(this.slidesTimeout);
                this.status = 2;
            },
            resume(){
//                console.log('resume');
                this.status = 3;
                clearTimeout(this.animationTimeout);
                this.animationTimeout = setTimeout(this.nextSlide, this.animationDuration);
            },
            play(){
                if (this.slides.length <= 0) return;
//                console.log('play');
                this.startSlidesTimeout();
            },
            nextSlide(){
                this.activeSlideIdx++
                this.$nextTick(()=>{
                  this.activeSlideIdx = this.activeSlideIdx % this.slides.length
//                console.log('nextSlide', this.activeSlideIdx);
                  if (this.status !== 2) this.startSlidesTimeout();
                })
            },
            previousSlide(){
                this.activeSlideIdx--;
                this.$nextTick(()=>{
                    if (this.activeSlideIdx < 0) {
                        this.activeSlideIdx = this.slides.length - 1;
                    }
    //               console.log('previousSlide', this.activeSlideIdx);
                    if (this.status !== 2) this.startSlidesTimeout();
                })
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
            loadImages(images){
                var promises = [];

                images.forEach(item => {
                    promises.push(this.loadImage(item.image));
                });
                return Promise.all(promises);
            },
            getRandomInt(min, max) {
                let min_val = Math.min(min, max);
                let max_val = Math.max(min, max);
                min_val = Math.min(Math.max(Math.ceil(min_val), 1), 5);
                max_val = Math.min(Math.max(Math.floor(max_val), 1), 5);
                return Math.floor(Math.random() * (max_val - min_val + 1)) + min_val;
            },
            createCollages(images){
                let index = 0;
                let size = 1;
                while (index < images.length) {
                    size = this.getRandomInt(this.collageSizeMin, this.collageSizeMax);
                    let slide = images.slice(index, size + index);
                    this.slides.push(slide);
                    index = size + index;
                }
            },
            add(images){
                this.loadImages(images)
                        .then(values => {
                            this.createCollages(values.filter(item => !item.is_error));
                        })
                        .catch(()=> {
//                       console.log(er);
                        })
            }
        }
    }
</script>
