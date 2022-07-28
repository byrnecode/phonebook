<script setup>
import { computed } from 'vue'
import { useContactStore } from '@/stores/contact'

const contactStore = useContactStore()

const contactToDelete = computed(() => {
  return contactStore.contactToDelete
})

const fullName = computed(() => {
  if (contactToDelete.value) {
    return (
      contactToDelete.value.firstName + ' ' + contactToDelete.value.lastName
    )
  }
  return ''
})

const isActive = computed(() => {
  return contactToDelete.value ? true : false
})

function deleteContact() {
  contactStore.deleteContact(contactToDelete.value)
}

function cancel() {
  contactStore.setContactToDelete(null)
}
</script>

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

<style lang="scss" scoped></style>
