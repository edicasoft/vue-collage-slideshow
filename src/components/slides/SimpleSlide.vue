<template>
    <div :class="['vc-slideshow-slide-inner', slideClass]">
        <div class="vc-slideshow-img-animated-wrapper" v-for="(img, idx) in images" :key="idx">
            <slide-animation :animationDuration="animationDuration">
                <img :src="img.image" v-if="showImages"
                     :class="['vc-slideshow-img',{'vc-slideshow-is-vertical': img.isVertical, 'vc-slideshow-is-horizontal': img.isHorizontal}]"/>
            </slide-animation>
        </div>
    </div>
</template>
<script>
    import SlideAnimation from "@/components/SlideAnimation";
    export default {
        //a slide with one or two images
        name: 'SimpleSlide',
        props: ['images', 'slidesInterval', 'status', 'animationDuration'],
        components: {
            SlideAnimation
        },
        created(){
            setTimeout(()=> {
                this.showImages = true;
            }, 10);
            this.playLeave(this.leaveStartTime);
        },
        computed: {
            leaveStartTime(){
                //100 - beforeEnter timeout
                return this.slidesInterval - this.animationDuration + 100;
            },
            horizontalImages(){
                return this.images.filter(item => item.isHorizontal)
            },
            verticalImages(){
                return this.images.filter(item => item.isVertical)
            },
            slideClass(){
                switch (this.images.length) {
                    case 1:
                        return 'vc-slideshow-is-single';
                        //vertical image is always goes first (in order to contain maximum 50%, usually 30%, of the screen width)
                    case 2:
                        if (this.verticalImages.length > 0) {
                            this.setFirstVertical(this.images);
                            return `vc-slideshow-is-double vc-slideshow-is-double-${this.getRandomInt(1, 3)}`;
                        } else { //use 50|50 template if there are no vertical images
                            return `vc-slideshow-is-double vc-slideshow-is-double-1`;
                        }
                }
            }
        },
        watch: {
            status(newVal){
                //if paused - stop animation timeout
                if (newVal == 2) {
                    clearTimeout(this.startLeaveTimeout);
                }
                //if resumed - play leave animation immediately
                if (newVal == 3) {
                    this.playLeave(0);
                }
            }
        },
        data(){
            return {
                showImages: false,
                startLeaveTimeout: 0,
                playLeaveTimeout: 0,
            }
        },
        methods: {
            replaceVerticalsInPositions(neededIdxs){
                if (!neededIdxs || neededIdxs.length == 0 || this.horizontalImages.length == 0) return;
                neededIdxs.forEach(idx => {
                    if (this.images[idx] && this.images[idx].isVertical) {
                        //find indexes of horizontal images
                        let horizontalIdxs = this.horizontalImages.map(item => this.images.indexOf(item));
                        //remove indexes which already are in appropriate places
                        horizontalIdxs = horizontalIdxs.filter((el) => !neededIdxs.includes(el));
//                        console.log('horizontalIdxs', horizontalIdxs);
                        //swap any horizontal image with founded vertical
                        let horizontalIdx = horizontalIdxs[0];
                        if (horizontalIdx != null) {
                            [this.images[idx], this.images[horizontalIdx]] = [this.images[horizontalIdx], this.images[idx]];
                        }
//                        console.log('swap', horizontalIdxs[0], '->', idx);
                    }
                });
            },
            playLeave(time){
                clearTimeout(this.startLeaveTimeout);
                this.startLeaveTimeout = setTimeout(()=> {
//                    console.log('playLeave');
                    this.showImages = false;
                }, time);
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
            }

        }
    }
</script>