<template>
    <div class="slide" v-show="isActive">
        <transition-group @enter="enterEl"
                          @leave="leaveEl"
                          @before-enter="beforeEnterEl"
                          class="slide-inner"
                          :css="false"
                          tag="div">
            <img v-for="(img, idx) in images" :src="img.image" :key="idx" v-show="startAnimation"
                 :class="[{'is-vertical': img.isVertical, 'is-horizontal': img.isHorizontal}, 'animated-image']"/>
        </transition-group>
    </div>
</template>
<script>
    export default {
        //a slide with one or two images
        name: 'SimpleSlide',
        props: ['images', 'isActive'],
        created(){

        },
        watch: {
            isActive: {
                immediate: true,
                handler(newVal, oldVal){
                    if (newVal) {
                        setTimeout(()=> {
                            this.startAnimation = true;
                        }, 100);
                        setTimeout(()=> {
                            this.startAnimation = false;
                        }, 3500);
                    }
                }
            }
        },
        data(){
            return {
                startAnimation: false,
                animations: [
                    {name: 'left', isTaken: false},
                    {name: 'right', isTaken: false},
                    {name: 'top', isTaken: false},
                    {name: 'bottom', isTaken: false}
                ]
            }
        },
        methods: {
            getRandomElement(arr){
                return arr[Math.floor(Math.random() * arr.length)]
            },
            getAnimation(el){
                let freeAnimations = this.animations.filter(item => !item.isTaken);
                let animation = freeAnimations.length > 0 ? this.getRandomElement(freeAnimations) : this.getRandomElement(this.animations);
                animation.isTaken = true;
                el.classList.add(`slide-${animation.name}-enter`);
                el.setAttribute('data-animation', animation.name);
                console.log('animation', animation.name);
                return animation.style;
            },
            beforeEnterEl(el) {
                this.getAnimation(el);
            },
            enterEl(el, done){
                setTimeout(()=> {
                    const animationName = el.getAttribute('data-animation');
                    el.classList.remove(`slide-${animationName}-enter`);
                    done();
                }, 100);
            },
            leaveEl(el, done) {
                //exit animation
                console.log('leave');
                const animationName = el.getAttribute('data-animation');
                el.classList.add(`slide-${animationName}-leave-active`);
                setTimeout(()=> {
                    done();
                }, 500);
            },
        }
    }
</script>