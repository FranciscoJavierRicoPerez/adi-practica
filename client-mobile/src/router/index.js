import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue'
import ListadoVideojuegos from '../views/ListadoVideojuegos.vue'
import CrearVideojuego from '../views/CrearVideojuego.vue'
import Login from '../views/Login.vue'
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/videojuegos',
    name: 'ListadoVideojuegos',
    component: ListadoVideojuegos
  },
  {
    path: '/crearVideojuego',
    name: 'CrearVideojuego',
    component: CrearVideojuego
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
