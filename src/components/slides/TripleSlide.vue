<template>
    <div :class="['slide', 'slide-inner', 'is-triple', slideClass]">
        <div class="left-column">
            <slide-animation v-for="(img, idx) in leftColumn" :animationDuration="animationDuration" class="img-animated-wrapper">
                <img :src="img.image" :key="idx" v-if="showImages"/>
            </slide-animation>
        </div>
        <div class="right-column">
            <slide-animation v-for="(img, idx) in rightColumn" :animationDuration="animationDuration" class="img-animated-wrapper">
                <img :src="img.image" :key="idx" v-if="showImages"/>
            </slide-animation>
        </div>
    </div>
</template>
<script>
    import SlideAnimation from "@/components/SlideAnimation";
    import SimpleSlide from "@/components/slides/SimpleSlide";
    export default {
        name: 'TripleSlide',
        mixins: [SimpleSlide],

        computed: {
            slideClass(){
                //for three vertical images in the row
                if (this.verticalImages.length == 3) {
                    return `is-triple-5`;
                }
                // if a slide has the only one vertical img - use templates that doesn't use 3/4 of a slide width for it
                if (this.verticalImages.length == 1) {
                    this.setFirstVertical(this.images);
                    return `is-triple-${this.getRandomInt(1, 2)}`;
                }
                const rndType = this.getRandomInt(1, 4);
                // use horizontal image for the 3/4 of a slide width
                if (rndType >= 3)
                    this.setFirstHorizontal(this.images);
                return `is-triple-${rndType}`;
            },
            leftColumn(){
                return this.images.slice(0, 1);
            },
            rightColumn(){
                return this.images.slice(1);
            }
        }
    }
</script>