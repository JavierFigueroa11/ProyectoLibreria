import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/home',
    name: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/signin',
    name: 'Signin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Signin.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Contact.vue')
  },
  {
    path: '/home_admin',
    name: 'home_admin',
    component: () => import('../views/HomeAdmin.vue')
  },
  {
    path: '/home_user',
    name: 'home_user',
    component: () => import('../views/HomeUser.vue')
  },
  {
    path: '/loans_admin',
    name: 'loans_admin',
    component: () => import('../views/LoanAdmin.vue')
  },
  {
    path: '/book_admin',
    name: 'book_admin',
    component: () => import('../views/BookAdmin.vue')
  },
  {
    path: '/partners_admin',
    name: 'partners_admin',
    component: () => import('../views/PartnersAdmin.vue')
  },
  {
    path: '/logout',
    name: '/logout',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
