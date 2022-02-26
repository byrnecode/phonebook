<template>
  <div
    id="delete-contact-modal"
    class="modal"
    :class="{ 'is-active': isActive }"
  >
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">You are about to delete a contact</p>
        <button class="delete" aria-label="close" @click="cancel"></button>
      </header>
      <section class="modal-card-body">
        <p class="my-5">
          Are you sure you want to delete <strong>{{ fullName }}</strong> from
          your contact list?
        </p>
      </section>
      <footer class="modal-card-foot is-justify-content-end">
        <button class="button is-danger" @click.prevent="deleteContact">
          Yes, Delete
        </button>
        <button class="button" @click="cancel">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('contact', ['contactToDelete']),
    fullName() {
      if (this.contactToDelete) {
        return (
          this.contactToDelete.firstName + ' ' + this.contactToDelete.lastName
        )
      }
      return ''
    },
    isActive() {
      return this.contactToDelete ? true : false
    },
  },
  methods: {
    deleteContact() {
      this.$store.dispatch('contact/deleteContact', this.contactToDelete)
    },
    cancel() {
      this.$store.dispatch('contact/setContactToDelete', null)
    },
  },
}
</script>

<style lang="scss" scoped></style>
