<template>
    <div :class="['vc-slideshow-slide-inner', 'vc-slideshow-is-triple', slideClass]">
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
        name: 'TripleSlide',
        mixins: [SimpleSlide],

        computed: {
            slideClass(){
                //for three vertical images in the row
                if (this.verticalImages.length == 3) {
                    return `vc-slideshow-is-triple-5`;
                }
                // if a slide has the only one vertical img - use templates that doesn't use 3/4 of a slide width for it
                if (this.verticalImages.length == 1) {
                    this.setFirstVertical(this.images);
                    return `vc-slideshow-is-triple-${this.getRandomInt(1, 2)}`;
                }
                const rndType = this.getRandomInt(1, 4);
                // use horizontal image for the 3/4 of a slide width
                if (rndType >= 3)
                    this.setFirstHorizontal(this.images);
                return `vc-slideshow-is-triple-${rndType}`;
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