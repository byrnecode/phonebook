import { createRouter, createWebHistory } from 'vue-router'
import ContactList from '../views/ContactList.vue'
import store from '@/store/index.js'

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
    name: 'contact-edit',
    component: () =>
      import(/* webpackChunkName: "contact-show" */ '../views/ContactEdit.vue'),
    props: true,
    beforeEnter: (to, from, next) => {
      // if directly going to this route by typing in the url
      // or from a page refresh, we need to fetch the contacts
      if (from.matched.length === 0) {
        store.dispatch('contact/fetchContacts')
      }
      const { id } = to.params
      const contact = store.getters['contact/getContactById'](parseInt(id, 10))
      // for unknown contact id, redirect to 404
      if (!contact)
        router.push({
          name: '404',
          params: { resource: `Contact ID: ${id}` },
        })
      else next()
    },
  },
  {
    path: '/404',
    name: '404',
    component: () =>
      import(/* webpackChunkName: "404" */ '../views/NotFound.vue'),
    props: true,
  },
  {
    path: '/:catchAll(.*)',
    redirect: { name: '404', params: { resource: 'page' } },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes,
})

export default router
