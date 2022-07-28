import { defineStore } from 'pinia'
import { useNotificationStore } from './notification'

export const useContactStore = defineStore('contact', {
  state: () => ({
    contacts: [],
    contactsTotal: 0,
    contactToDelete: null,
  }),

  getters: {
    getContactById: (state) => {
      return (id) => state.contacts.find((contact) => contact.id === id)
    },
    getContactByPhoneNum: (state) => {
      return (phoneNumber) =>
        state.contacts.find((contact) => contact.phoneNumber === phoneNumber)
    },
  },

  actions: {
    createContact(contact) {
      this.contacts.push(contact)
      const notificationStore = useNotificationStore()
      notificationStore.add({
        type: 'success',
        message: 'Your contact has been created!',
      })
    },
    deleteContact(contact) {
      this.contacts = this.contacts.filter((c) => c.id !== contact.id)
      const notificationStore = useNotificationStore()
      notificationStore.add({
        type: 'danger',
        message: 'Your contact has been deleted!',
      })
      this.contactToDelete = null
    },
    editContact(contact) {
      const index = this.contacts.findIndex((c) => c.id === contact.id)
      if (index >= 0) {
        this.contacts.splice(index, 1, contact)
      }
      const notificationStore = useNotificationStore()
      notificationStore.add({
        type: 'success',
        message: 'Your contact has been updated!',
      })
    },
    fetchContacts() {
      this.contacts =
        JSON.parse(localStorage.getItem('aloware-phonebook')) || []
    },
    setContactToDelete(contact) {
      this.contactToDelete = contact
    },
  },
})
