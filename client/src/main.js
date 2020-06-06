// =========================================================
// * Vuetify Material Dashboard - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import axios from 'axios';
import vuetify from './plugins/vuetify'
import i18n from './i18n'


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuthenticate)) {
    if (!store.getters['Auth/isLoggedIn']) {
      next('/login');
    }
    else {
      next();
    }
  }
  else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.isLoggedIn) {
      next('/profile');
    }
    else {
      next();
    }
  }
  else {
    next();
  }
})


Vue.config.productionTip = false

Vue.prototype.$http = axios;
const token = localStorage.getItem("token");

if(token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}


new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
