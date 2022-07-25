import { ref, computed } from 'vue'

export function useSortList(filteredContacts) {
  const sortOrder = ref('Created At DESC')
  const sortOptions = ref([
    'Created At DESC',
    'Created At ASC',
    'Full Name ASC',
    'Full Name DESC',
  ])

  // change the contact list based on the selected sort order
  const currentSortedList = computed(() => {
    const obj = {
      [sortOptions.value[0]]: sortByCreatedDesc.value,
      [sortOptions.value[1]]: sortByCreatedAsc.value,
      [sortOptions.value[2]]: sortByNameAsc.value,
      [sortOptions.value[3]]: sortByNameDesc.value,
    }
    return obj[sortOrder.value]
  })
  const sortByCreatedDesc = computed(() => {
    return [...filteredContacts.value].sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      return dateB > dateA ? 1 : dateB < dateA ? -1 : 0
    })
  })
  const sortByCreatedAsc = computed(() => {
    return [...filteredContacts.value].sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      return dateA > dateB ? 1 : dateA < dateB ? -1 : 0
    })
  })
  const sortByNameAsc = computed(() => {
    return [...filteredContacts.value].sort((a, b) => {
      const fullNameA = `${a.firstName} ${a.lastName}`
      const fullNameB = `${b.firstName} ${b.lastName}`
      return fullNameA.localeCompare(fullNameB)
    })
  })
  const sortByNameDesc = computed(() => {
    return [...filteredContacts.value].sort((a, b) => {
      const fullNameA = `${a.firstName} ${a.lastName}`
      const fullNameB = `${b.firstName} ${b.lastName}`
      return fullNameB.localeCompare(fullNameA)
    })
  })

  return { currentSortedList, sortOrder, sortOptions }
}
