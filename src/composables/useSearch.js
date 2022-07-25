import { ref, computed } from 'vue'

export function useSearch(contacts) {
  const search = ref('')
  // the filtered contact list by search (name or phone number)
  const filteredContacts = computed(() => {
    return contacts.value.filter((contact) => {
      const searchTerm = search.value.toLowerCase()
      return (
        contact.firstName.toLowerCase().includes(searchTerm) ||
        contact.lastName.toLowerCase().includes(searchTerm) ||
        contact.phoneNumber.toLowerCase().includes(searchTerm)
      )
    })
  })

  return { search, filteredContacts }
}
