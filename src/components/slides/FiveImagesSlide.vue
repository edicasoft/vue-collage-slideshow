<template>
    <div :class="['slide-inner', 'is-five', `is-five-${slideClass}`]">
        <div class="left-column">
            <div v-for="(img, idx) in leftColumn" :key="idx" class="img-animated-wrapper">
                <slide-animation :animationDuration="animationDuration">
                    <img :src="img.image" v-if="showImages" :data-idx="img.idx"/>
                </slide-animation>
            </div>
        </div>
        <div class="center-column" v-if="centerImg">
            <div class="img-animated-wrapper">
                <slide-animation :animationDuration="animationDuration">
                    <img :src="centerImg.image" v-if="showImages" :data-idx="centerImg.idx"/>
                </slide-animation>
            </div>
        </div>
        <div class="right-column">
            <div v-for="(img, idx) in rightColumn" :key="idx" class="img-animated-wrapper">
                <slide-animation :animationDuration="animationDuration">
                    <img :src="img.image" v-if="showImages" :data-idx="img.idx"/>
                </slide-animation>
            </div>
        </div>
    </div>
</template>
<script>
    import SimpleSlide from "@/components/slides/SimpleSlide";
    export default {
        name: 'FiveImagesSlide',
        mixins: [SimpleSlide],

        computed: {
            slideClass(){
                let rndInt = this.getRandomInt(1, 3);
                //the best template for the case when there is only one vertical image
                //do not use other templates if there are only a few horizontal images
                if (this.verticalImages.length == 1 || this.horizontalImages.length < 3) {
                    rndInt = 1;
                }
                //do not use template 1 if there are no vertical images
                if (this.verticalImages.length == 0)
                    rndInt = this.getRandomInt(2, 3);

                if (rndInt == 1) {
                    this.swapMiddleImageWithVertical();
                }
                else {
                    this.replaceVerticalsInPositions([1, 2, 4]);
                }
                return `${rndInt}`;
            },
            leftColumn(){
                return this.slideClass == 1 ? this.images.slice(0, 2) : this.images.slice(0, 1);
            },
            centerImg(){
                return this.slideClass == 1 && this.images[2] != null ? this.images[2] : null;
            },
            rightColumn(){
                return this.slideClass == 1 ? this.images.slice(3) : this.images.slice(1);
            }
        },
        methods: {
            swapMiddleImageWithVertical(){
                const verticalImageIdx = this.images.findIndex(img => img.isVertical);
                if (verticalImageIdx >= 0 && this.images[2] != null)
                    [this.images[2], this.images[verticalImageIdx]] = [this.images[verticalImageIdx], this.images[2]];
            }
        }
    }
</script>