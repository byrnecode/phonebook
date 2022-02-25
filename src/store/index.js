import Vue from 'vue'
import Vuex from 'vuex'
import * as contact from '@/store/modules/contact.js'
import * as notification from '@/store/modules/notification.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    contact,
    notification,
  },
})
