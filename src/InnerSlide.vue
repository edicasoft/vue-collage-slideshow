<template>
    <div class="slide">
        <img v-for="img in images" :src="img.src"
             :class="[{'is-vertical': img.isVertical, 'is-horizontal': img.isHorizontal}]"/>
    </div>
</template>
<script>
    export default {
        name: 'InnerSlide',
        props: ['images']
    }
</script>