import { ref, watch, computed, onMounted, onUnmounted } from 'vue'

export function useInfiniteScroll(currentList, maxContacts) {
  // custom infinite scroll feature
  const bottom = ref(false)

  function bottomVisible() {
    const scrollY = window.scrollY
    const visible = document.documentElement.clientHeight
    const pageHeight = document.documentElement.scrollHeight
    const bottomOfPage = visible + scrollY >= pageHeight
    return bottomOfPage || pageHeight < visible
  }

  function updateBottom() {
    bottom.value = bottomVisible()
  }

  onMounted(() => window.addEventListener('scroll', updateBottom))
  onUnmounted(() => window.removeEventListener('scroll', updateBottom))

  watch(bottom, (newValue) => {
    if (newValue) {
      maxContacts.value += 1
    }
  })
  // the number of contacts displayed (while infinite scrolling)
  // dependent on the watcher 'bottom'
  const filteredContactsMax = computed(() => {
    return currentList.value.slice(0, maxContacts.value)
  })

  return { filteredContactsMax }
}
