<template>
  <div>
    <template v-if="contacts.length > 0">
      <h1 class="is-size-3">Contact List</h1>
      <ContactCard
        v-for="contact in contacts"
        :contact="contact"
        :key="contact.id"
      />
    </template>
    <template v-else>
      <h1 class="is-size-4">
        You haven't added any contacts yet. Click the "Add Contact" button above
        to add one.
      </h1>
    </template>
  </div>
</template>

<script>
import ContactCard from '@/components/ContactCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    ContactCard,
  },
  created() {
    this.$store.dispatch('contact/fetchContacts')
  },
  computed: {
    ...mapState('contact', ['contacts']),
    page() {
      return parseInt(this.$route.query.page) || 1
    },
  },
}
</script>

<style lang="scss" scoped></style>
