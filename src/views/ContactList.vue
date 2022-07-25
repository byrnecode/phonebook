<script setup>
import ContactCard from '@/components/ContactCard.vue'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll.js'
import { useSearch } from '@/composables/useSearch.js'
import { useSortList } from '@/composables/useSortList.js'
import { useFavoritesToggle } from '@/composables/useFavoritesToggle.js'

const store = useStore()

// featch contacts on first load
store.dispatch('contact/fetchContacts')
const contacts = computed(() => store.state.contact.contacts)

const { search, filteredContacts } = useSearch(contacts)

// eslint-disable-next-line
const { sortOrder, sortOptions, currentSortedList } = useSortList(filteredContacts)

const favoritesToggle = ref('all')
const { currentList } = useFavoritesToggle(favoritesToggle, currentSortedList)

const maxContacts = ref(5)
const { filteredContactsMax } = useInfiniteScroll(currentList, maxContacts)
</script>

<template>
  <div>
    <template v-if="contacts.length > 0">
      <h1 class="is-size-3">Contact List</h1>
      <div class="columns my-5">
        <div class="column">
          <div class="field">
            <label class="label">Search</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Search by name or phone number..."
                v-model="search"
              />
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Sort by</label>
            <div class="control is-expanded">
              <div class="select is-fullwidth">
                <select v-model="sortOrder">
                  <option
                    v-for="option in sortOptions"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <div class="label">Show:</div>
            <div class="control">
              <label class="radio">
                <input type="radio" value="all" v-model="favoritesToggle" />
                All
              </label>
              <label class="radio">
                <input
                  type="radio"
                  value="favorites"
                  v-model="favoritesToggle"
                />
                Favorites
              </label>
            </div>
          </div>
        </div>
      </div>
      <template v-if="currentList.length > 0">
        <ContactCard
          v-for="contact in filteredContactsMax"
          :contact="contact"
          :key="contact.id"
        />
      </template>
      <h2 v-else class="has-text-centered is-size-4 my-5">
        No contacts found.
      </h2>
    </template>
    <template v-else>
      <h1 class="is-size-4">
        You haven't added any contacts yet. Click the "Add Contact" button above
        to add one.
      </h1>
    </template>
    <h3
      v-if="currentList.length > filteredContactsMax.length"
      class="is-size-4 is-flex is-justify-content-center"
    >
      Keep scrolling to load more contacts...
    </h3>
  </div>
</template>

<style lang="scss" scoped></style>
