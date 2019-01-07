import Vue from 'vue'
import App from './DevApp.vue'
import '@/assets/main.scss'
import '@/assets/slides.scss'
import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
