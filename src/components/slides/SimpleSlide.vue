<template>
    <div class="slide">
        <slide-animation :animationDuration="animationDuration" class="slide-inner">
            <img v-for="(img, idx) in images" :src="img.image" :key="idx" v-if="startAnimation"
                 :class="[{'is-vertical': img.isVertical, 'is-horizontal': img.isHorizontal}]"/>
        </slide-animation>
    </div>
</template>
<script>
    import SlideAnimation from "@/components/SlideAnimation";
    export default {
        //a slide with one or two images
        name: 'SimpleSlide',
        props: ['images', 'isActive', 'autoplayTimeout', 'animationDuration', 'status'],
        components: {
            SlideAnimation
        },
        computed:{
            endAnimationTime(){
                return this.autoplayTimeout - this.animationDuration;
            }
        },
        watch: {
            status(newVal, oldVal){
                console.log(newVal);
                if (newVal == 2) {
                    clearTimeout(this.animationTimeout);
                }
                else if (newVal == 3) {
                    this.endAnimationAfter(this.endAnimationTime);
                }
            },
            isActive: {
                immediate: true,
                handler(newVal, oldVal){
                    if (newVal) {
                        setTimeout(()=> {
                            console.log('startAnimation');
                            this.startAnimation = true;
                        }, 10);
                        this.endAnimationAfter(this.endAnimationTime);
                    }
                }
            }
        },
        data(){
            return {
                startAnimation: false,
                animationTimeout: false,
            }
        },
        methods: {
            endAnimationAfter(time){
                console.log('endAnimationAfter');
                this.animationTimeout = setTimeout(()=> {
                    console.log('endAnimation');
                    this.startAnimation = false;
                }, time);
            }
        }
    }
</script>