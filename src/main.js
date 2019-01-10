import Vue from 'vue'
import App from './DevApp.vue'
import '@/assets/main.scss'
import '@/assets/slides.scss'
import '@/assets/animation.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
