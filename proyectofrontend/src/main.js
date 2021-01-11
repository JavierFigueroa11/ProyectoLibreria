import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import axios from 'axios';
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);
Vue.prototype.$axios = axios;
axios.defaults.withCredentials = true;

Vue.config.productionTip = false;

axios.defaults.withCredentials = true;

import Nav from './components/public/Nav.vue'
Vue.component('Nav', Nav);
import Menus from './components/public/Menus.vue'
Vue.component('Menus', Menus);
import Principal from './components/public/Principal.vue'
Vue.component('Principal', Principal);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
