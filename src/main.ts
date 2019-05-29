import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

Vue.config.productionTip = false

try {
  new Vue({
    render: h => h(App)
  }).$mount('#app')
} catch (e) {
  alert(e)
}
