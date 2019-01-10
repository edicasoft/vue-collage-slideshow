<template>
    <div class="slide">
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
                    console.log('playLeave');
                    this.showImages = false;
                }, time);
            }
        }
    }
</script>