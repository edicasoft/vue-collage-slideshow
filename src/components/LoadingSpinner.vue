<template>
  <div class="vc-slideshow-spinner-wrapper" v-show="showLoader">
    <div class="vc-slideshow-spinner-icon"></div>
    <div class="vc-slideshow-loading-text" v-if="text">{{text}}</div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['text', 'delay', 'loader'],
    computed: {
      isLoading(){
        return this.loader
      }
    },
    watch: {
      isLoading: {
        immediate: true,
        handler(newVal){
          if (newVal && this.delay) {
            this.delayTimeout = setTimeout(()=> {
              this.showLoader = true;
            }, this.delay)
          }
          else if(!newVal && this.delay){
            clearTimeout(this.delayTimeout);
            this.showLoader = false;
          }
          else{
            this.showLoader = true;
          }
        }
      }
    },
    data() {
      return {
        delayTimeout: null,
        showLoader: !this.delay || !this.loader
      }
    }
  }
</script>
