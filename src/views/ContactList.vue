<template>
  <div>
    <h1>Contact List</h1>
    <ContactCard
      v-for="contact in contacts"
      :contact="contact"
      :key="contact.id"
    />
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
    // const data = [
    //   {
    //     id: 1,
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     number: '555-555-5555',
    //     createdAt: '2016-01-01',
    //   },
    //   {
    //     id: 2,
    //     firstName: 'Jane',
    //     lastName: 'Doe',
    //     number: '555-555-5555',
    //     createdAt: '2016-01-01',
    //   },
    // ]
    // localStorage.setItem('aloware-phonebook', JSON.stringify(data))
    this.$store.dispatch('contact/fetchContacts')
  },
  computed: {
    ...mapState(['contact']),
    contacts() {
      return this.contact.contacts
    },
    page() {
      return parseInt(this.$route.query.page) || 1
    },
  },
}
</script>

<style lang="scss" scoped></style>
