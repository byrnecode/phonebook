import Vue from 'vue'
import VueRouter from 'vue-router'
import ContactList from '../views/ContactList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'contact-list',
    component: ContactList,
  },
  {
    path: '/contact/create',
    name: 'contact-create',
    // route level code-splitting
    // this generates a separate chunk (contact-create.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "contact-create" */ '../views/ContactCreate.vue'
      ),
  },
  {
    path: '/contact/:id',
    name: 'contact-show',
    component: () =>
      import(/* webpackChunkName: "contact-show" */ '../views/ContactShow.vue'),
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router