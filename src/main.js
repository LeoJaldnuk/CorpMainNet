import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
//import store if needed:  import store from './store/index'
//import axios when ready:  import axios from 'axios'

Vue.config.productionTip = false

//axios.default.baseURL = process.env.VUE_APP_REMOTE_API;

new Vue({
  router,
  //store,
  render: h => h(App)
}).$mount('#app')