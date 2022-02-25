// import ContactService from '@/services/ContactService.js'

export const namespaced = true

export const state = {
  contacts: [],
  contactsTotal: 0,
}

export const mutations = {
  ADD_CONTACT(state, contact) {
    state.contacts.push(contact)
  },
  SET_CONTACTS(state, contacts) {
    state.contacts = contacts
  },
  SET_CONTACTS_TOTAL(state, contactsTotal) {
    state.contactsTotal = contactsTotal
  },
}

export const actions = {
  createContact({ state, commit, dispatch }, contact) {
    commit('ADD_CONTACT', contact)
    localStorage.setItem('aloware-phonebook', JSON.stringify(state.contacts))
    const notification = {
      type: 'success',
      message: 'Your contact has been created!',
    }
    dispatch('notification/add', notification, { root: true })
  },
  fetchContacts({ commit }) {
    const phonebookData =
      JSON.parse(localStorage.getItem('aloware-phonebook')) || []
    commit('SET_CONTACTS_TOTAL', phonebookData.length)
    commit('SET_CONTACTS', phonebookData)
  },
}
export const getters = {
  getContactById: (state) => (id) => {
    return state.contacts.find((contact) => contact.id === id)
  },
}
