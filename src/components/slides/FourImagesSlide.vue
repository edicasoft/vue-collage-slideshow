<template>
    <div :class="['slide', 'slide-inner', 'is-four', `is-four-${slideClass}`]">
        <slide-animation :animationDuration="animationDuration" class="left-column">
            <img v-for="(img, idx) in leftColumn" :src="img.image" :key="idx" v-if="showImages"/>
        </slide-animation>
        <slide-animation :animationDuration="animationDuration" class="right-column">
            <img v-for="(img, idx) in rightColumn" :src="img.image" :key="idx" v-if="showImages"/>
        </slide-animation>
    </div>
</template>
<script>
    import SlideAnimation from "@/components/SlideAnimation";
    import SimpleSlide from "@/components/slides/SimpleSlide";
    export default {
        name: 'FourImagesSlide',
        mixins: [SimpleSlide],

        computed: {
            slideClass(){
                if (this.verticalImages.length >= 1) {
                    this.setFirstVertical(this.images);
                    return `${this.getRandomInt(2, 3)}`;
                }
                return `${this.getRandomInt(1, 3)}`;
            },
            leftColumn(){
                return this.slideClass == 1 ? this.images.slice(0, 2) : this.images.slice(0, 1);
            },
            rightColumn(){
                return this.slideClass == 1 ? this.images.slice(2) : this.images.slice(1);
            }
        }
    }
</script>