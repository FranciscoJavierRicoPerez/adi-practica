import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Vuex from 'vuex'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.use(Vuex);
import PaginaPrincipal from './components/PaginaPrincipal.vue'
import ListadoVideojuegos from './components/ListadoVideojuegos.vue'
import Login from './components/Login.vue'
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes:[
    {
      path:'/',
      component: PaginaPrincipal
    },
    {
      path:'/home',
      component: PaginaPrincipal
    },
    {
      path:'/videojuegos',
      component: ListadoVideojuegos
    },
    {
      path: '/login',
      component: Login
    }
  ]
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) },
}).$mount('#app')
