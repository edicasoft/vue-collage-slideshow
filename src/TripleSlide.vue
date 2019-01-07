<template>
    <div class="slide">
        <img  :src="images[0].image" class="left-column"/>
        <div class="right-column">
            <img  :src="images[1].image" />
            <img  :src="images[2].image" />
        </div>
    </div>
</template>
<script>
    export default {
        name: 'TripleSlide',
        props: ['images'],
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