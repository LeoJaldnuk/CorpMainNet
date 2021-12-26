import Vue from 'vue'
import Router from 'vue-router'
import ConTekCalcView from '../views/ConTekCalcView.vue'
import Home from '../views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/contekcalc',
      name: 'con-tek-calc',
      component: ConTekCalcView,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

// Authentication can occur here

export default router;