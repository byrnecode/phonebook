import { computed } from 'vue'

export function useFavoritesToggle(favoritesToggle, currentSortedList) {
  const currentList = computed(() => {
    if (favoritesToggle.value === 'all') {
      return currentSortedList.value
    } else {
      return currentSortedList.value.filter((contact) => {
        return contact.favorite
      })
    }
  })

  return { currentList }
}
