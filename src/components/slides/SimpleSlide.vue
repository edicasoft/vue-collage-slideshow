<template>
    <div :class="['slide', slideClass]">
        <slide-animation :animationDuration="animationDuration" class="slide-inner">
            <img v-for="(img, idx) in images" :src="img.image" :key="idx" v-if="showImages"
                 :class="[{'is-vertical': img.isVertical, 'is-horizontal': img.isHorizontal}]"/>
        </slide-animation>
    </div>
</template>
<script>
    import SlideAnimation from "@/components/SlideAnimation";
    export default {
        //a slide with one or two images
        name: 'SimpleSlide',
        props: ['images', 'isActive', 'slidesInterval', 'status', 'animationDuration'],
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
                return this.slidesInterval - this.animationDuration;
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
                        return 'is-single';
                        //vertical image is always goes first
                    case 2:
                        this.setFirstVertical(this.images);
                        return `is-double is-double-${this.getRandomInt(1, 3)}`;
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
            },
        },
        data(){
            return {
                showImages: false,
                startLeaveTimeout: 0,
                playLeaveTimeout: 0,
            }
        },
        methods: {
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