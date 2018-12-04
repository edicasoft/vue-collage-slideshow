<template>
    <div class="slide">
        <img :src="verticalImage.src" class="is-vertical"/>
        <div class="right-column">
            <img v-for="img in horizontalImages" :src="img.src"  class="is-horizontal"/>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'TripleSlide',
        props: ['images'],
        computed: {
            horizontalImages(){
                return this.images.filter(item => item.isHorizontal)
            },
            verticalImage(){
                return this.images.find(item => item.isVertical)
            }
        }
    }
</script>