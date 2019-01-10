<template>
    <div class="slide slide-inner">
        <slide-animation :animationDuration="animationDuration" class="left-column">
            <img :src="images[0].image" :key="0" v-if="showImages"/>
        </slide-animation>
        <slide-animation :animationDuration="animationDuration" class="right-column">
            <img :src="images[1].image" :key="1" v-if="showImages"/>
            <img :src="images[2].image" :key="2" v-if="showImages"/>
        </slide-animation>
    </div>
</template>
<script>
    import SlideAnimation from "@/components/SlideAnimation";
    import SimpleSlide from "@/components/slides/SimpleSlide";
    export default {
        name: 'TripleSlide',
        mixins: [SimpleSlide],

//        computed: {
//            horizontalImages(){
//                return this.images.filter(item => item.isHorizontal)
//            },
//            verticalImage(){
//                return this.images.find(item => item.isVertical)
//            }
//        }
    }
</script>