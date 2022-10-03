import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue } from 'bootstrap-vue'
import VueAxios from 'vue-axios'
import Axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false
Vue.use(BootstrapVue)

Vue.use(VueAxios, Axios)
Vue.use(VueSweetalert2)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.prototype.$conexion = process.env.VUE_APP_URL
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
