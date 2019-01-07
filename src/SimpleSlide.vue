<template>
    <div class="slide">
        <img v-for="img in images" :src="img.image"
             :class="[{'is-vertical': img.isVertical, 'is-horizontal': img.isHorizontal}]"/>
    </div>
</template>
<script>
    export default {
        //a slide with one or two images
        name: 'SimpleSlide',
        props: ['images']
    }
</script>