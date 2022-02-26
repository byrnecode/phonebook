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

<script>
import ContactCard from '@/components/ContactCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    ContactCard,
  },
  data() {
    return {
      search: '',
      bottom: false,
      maxContacts: 5,
      favoritesToggle: 'all',
      sortOrder: 'Created At DESC',
      sortOptions: [
        'Created At DESC',
        'Created At ASC',
        'Full Name ASC',
        'Full Name DESC',
      ],
    }
  },
  created() {
    this.$store.dispatch('contact/fetchContacts')
    // custom infinite scroll feature
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
  },
  computed: {
    ...mapState('contact', ['contacts']),
    // the filtered contact list by search (name or phone number)
    filteredContacts() {
      return this.contacts.filter((contact) => {
        const searchTerm = this.search.toLowerCase()
        return (
          contact.firstName.toLowerCase().includes(searchTerm) ||
          contact.lastName.toLowerCase().includes(searchTerm) ||
          contact.phoneNumber.toLowerCase().includes(searchTerm)
        )
      })
    },
    // the number of contacts displayed (while infinite scrolling)
    // dependent on the watcher this.bottom
    filteredContactsMax() {
      return this.currentList.slice(0, this.maxContacts)
    },
    sortByCreatedDesc() {
      return [...this.filteredContacts].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    },
    sortByCreatedAsc() {
      return [...this.filteredContacts].sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
      })
    },
    sortByNameAsc() {
      return [...this.filteredContacts].sort((a, b) => {
        const fullNameA = `${a.firstName} ${a.lastName}`
        const fullNameB = `${b.firstName} ${b.lastName}`
        return fullNameA.localeCompare(fullNameB)
      })
    },
    sortByNameDesc() {
      return [...this.filteredContacts].sort((a, b) => {
        const fullNameA = `${a.firstName} ${a.lastName}`
        const fullNameB = `${b.firstName} ${b.lastName}`
        return fullNameB.localeCompare(fullNameA)
      })
    },
    // change the contact list based on the selected sort order
    currentSortedList() {
      const obj = {
        [this.sortOptions[0]]: this.sortByCreatedDesc,
        [this.sortOptions[1]]: this.sortByCreatedAsc,
        [this.sortOptions[2]]: this.sortByNameAsc,
        [this.sortOptions[3]]: this.sortByNameDesc,
      }
      return obj[this.sortOrder]
    },
    currentList() {
      if (this.favoritesToggle === 'all') {
        return this.currentSortedList
      } else {
        return this.currentSortedList.filter((contact) => {
          return contact.favorite
        })
      }
    },
  },
  watch: {
    bottom(newValue) {
      if (newValue) {
        this.maxContacts += 1
      }
    },
  },
  methods: {
    bottomVisible() {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
  },
}
</script>

<style lang="scss" scoped></style>
