import { createStore } from 'vuex'
import * as contact from '@/store/modules/contact.js'
import * as notification from '@/store/modules/notification.js'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    contact,
    notification,
  },
})
