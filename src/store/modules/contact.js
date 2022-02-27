// import ContactService from '@/services/ContactService.js'

export const namespaced = true

export const state = {
  contacts: [],
  contactsTotal: 0,
  contactToDelete: null,
}

export const mutations = {
  ADD_CONTACT(state, contact) {
    state.contacts.push(contact)
  },
  DELETE_CONTACT(state, contact) {
    state.contacts = state.contacts.filter((c) => c.id !== contact.id)
  },
  EDIT_CONTACT(state, contact) {
    const index = state.contacts.findIndex((c) => c.id === contact.id)
    if (index >= 0) {
      state.contacts.splice(index, 1, contact)
    }
  },
  SET_CONTACTS(state, contacts) {
    state.contacts = contacts
  },
  SET_CONTACT_TO_DELETE(state, contact) {
    state.contactToDelete = contact
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
  deleteContact({ state, commit, dispatch }, contact) {
    commit('DELETE_CONTACT', contact)
    localStorage.setItem('aloware-phonebook', JSON.stringify(state.contacts))
    const notification = {
      type: 'danger',
      message: 'Your contact has been deleted!',
    }
    dispatch('notification/add', notification, { root: true })
    commit('SET_CONTACT_TO_DELETE', null)
  },
  editContact({ state, commit, dispatch }, contact) {
    commit('EDIT_CONTACT', contact)
    localStorage.setItem('aloware-phonebook', JSON.stringify(state.contacts))
    const notification = {
      type: 'success',
      message: 'Your contact has been updated!',
    }
    dispatch('notification/add', notification, { root: true })
  },
  fetchContacts({ commit }) {
    const phonebookData =
      JSON.parse(localStorage.getItem('aloware-phonebook')) || []
    commit('SET_CONTACTS', phonebookData)
  },
  setContactToDelete({ commit }, contact) {
    commit('SET_CONTACT_TO_DELETE', contact)
  },
}
export const getters = {
  getContactById: (state) => (id) => {
    return state.contacts.find((contact) => contact.id === id)
  },
  getContactByPhoneNum: (state) => (phoneNumber) => {
    return state.contacts.find((contact) => contact.phoneNumber === phoneNumber)
  },
}
