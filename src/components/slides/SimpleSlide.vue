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
        props: ['images', 'isActive', 'autoplayTimeout', 'animationDuration'],
        components: {
            SlideAnimation
        },
        watch: {
            isActive: {
                immediate: true,
                handler(newVal, oldVal){
                    if (newVal) {
                        setTimeout(()=> {
                            console.log('startAnimation');
                            this.startAnimation = true;
                        }, 10);
                        if (this.autoplayTimeout) {
                            setTimeout(()=> {
                                console.log('endAnimation');
                                this.startAnimation = false;
                            }, this.autoplayTimeout - this.animationDuration);
                        }
                    }
                }
            }
        },
        data(){
            return {
                startAnimation: false
            }
        }
    }
</script>