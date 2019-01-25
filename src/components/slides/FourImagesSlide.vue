<template>
    <div :class="['vc-slideshow-slide-inner', 'vc-slideshow-is-four', `vc-slideshow-is-four-${slideClass}`]">
        <div class="vc-slideshow-left-column">
            <div class="vc-slideshow-img-animated-wrapper" v-for="(img, idx) in leftColumn" :key="idx">
                <slide-animation :animationDuration="animationDuration">
                    <img :src="img.image" v-if="showImages" class="vc-slideshow-img"/>
                </slide-animation>
            </div>
        </div>
        <div class="vc-slideshow-right-column">
            <div class="vc-slideshow-img-animated-wrapper" v-for="(img, idx) in rightColumn" :key="idx">
                <slide-animation :animationDuration="animationDuration">
                    <img :src="img.image" v-if="showImages" class="vc-slideshow-img"/>
                </slide-animation>
            </div>
        </div>
    </div>
</template>
<script>
    import SimpleSlide from "@/components/slides/SimpleSlide";
    export default {
        name: 'FourImagesSlide',
        mixins: [SimpleSlide],

        computed: {
            slideClass(){
                if (this.verticalImages.length > 0) {
                    this.setFirstVertical(this.images);
                    this.replaceVerticalsInPositions([1]);
                    return `${this.getRandomInt(4, 5)}`;
                }
                return `${this.getRandomInt(1, 5)}`;
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