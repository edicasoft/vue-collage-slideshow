<template>
    <div :class="['slide', 'slide-inner', 'is-five', `is-five-${slideClass}`]">
        <div class="left-column">
            <slide-animation v-for="(img, idx) in leftColumn" :animationDuration="animationDuration" class="img-animated-wrapper">
                <img :src="img.image" :key="idx" v-if="showImages" :data-idx="img.idx"/>
            </slide-animation>
        </div>
        <div class="center-column" v-if="centerImg">
            <slide-animation  :animationDuration="animationDuration" class="img-animated-wrapper">
                <img :src="centerImg.image" key="centered" v-if="showImages" :data-idx="centerImg.idx"/>
            </slide-animation>
        </div>  <div class="right-column">
            <slide-animation  v-for="(img, idx) in rightColumn" :animationDuration="animationDuration" class="img-animated-wrapper">
                <img :src="img.image" :key="idx" v-if="showImages" :data-idx="img.idx"/>
            </slide-animation>
        </div>
    </div>
</template>
<script>
    import SlideAnimation from "@/components/SlideAnimation";
    import SimpleSlide from "@/components/slides/SimpleSlide";
    export default {
        name: 'FiveImagesSlide',
        mixins: [SimpleSlide],

        computed: {
            slideClass(){
                return `${2}`;

                //the best template for this case
                if (this.verticalImages.length == 1) {
                    this.swapMiddleImageWithVertical();
                    return 1;
                }
                let rndInt = this.getRandomInt(1, 1);
                //do not use template one if there are no vertical images
                if(rndInt == 1){
                    if (this.verticalImages.length > 0)
                        this.swapMiddleImageWithVertical();
                    else this.getRandomInt(2, 3);
                }
//                if (this.verticalImages.length >= 1) {
//                    this.setFirstVertical(this.images);
//                    return `${this.getRandomInt(4, 5)}`;
//                }
                return `${rndInt}`;
            },
            leftColumn(){
                return this.slideClass == 1 ? this.images.slice(0, 2) : this.images.slice(0,1);
            },
            centerImg(){
                return this.slideClass == 1 ? this.images[2] : null;
            },
            rightColumn(){
                return this.slideClass == 1 ? this.images.slice(3) : this.images.slice(1);
            }
        },
        methods:{
            swapMiddleImageWithVertical(){
                const verticalImageIdx = this.images.findIndex(img => img.isVertical);
                if(verticalImageIdx >= 0)
                    [this.images[2], this.images[verticalImageIdx]] = [this.images[verticalImageIdx], this.images[2]];
            }
        }
    }
</script>