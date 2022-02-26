<template>
  <div>
    <template v-if="contacts.length > 0">
      <h1 class="is-size-3">Contact List</h1>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Search by name or phone number..."
          v-model="search"
        />
      </div>
      <template v-if="filteredContacts.length > 0">
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
      v-if="filteredContacts.length > filteredContactsMax.length"
      class="is-size-4 is-flex is-justify-content-center"
    >
      Loading more contacts...
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
      maxInitialContacts: 5,
      filteredContactsMax: [],
    }
  },
  created() {
    this.$store.dispatch('contact/fetchContacts')
    // custom infinite scroll feature
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
    // set max initial contacts
    this.filteredContactsMax = this.filteredContacts.slice(
      0,
      this.maxInitialContacts
    )
  },
  computed: {
    ...mapState('contact', ['contacts']),
    page() {
      return parseInt(this.$route.query.page) || 1
    },
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
  },
  watch: {
    bottom(newValue) {
      if (newValue) {
        this.loadMore()
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
    // set the number of contacts displayed (while infinite scrolling)
    loadMore() {
      if (this.filteredContactsMax.length === this.filteredContacts.length)
        return
      this.filteredContactsMax.push(
        this.filteredContacts[this.filteredContactsMax.length]
      )
    },
  },
}
</script>

<style lang="scss" scoped></style>
