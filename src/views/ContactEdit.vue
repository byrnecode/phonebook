<template>
  <div>
    <h1 class="is-size-3">Edit Contact</h1>
    <ContactForm :contact-id="contactId" />
  </div>
</template>

<script>
import ContactForm from '@/components/ContactForm.vue'

export default {
  components: {
    ContactForm,
  },
  props: ['id'],
  computed: {
    contactId() {
      return this.id ? parseInt(this.id, 10) : null
    },
  },
}
</script>

<style lang="scss" scoped></style>
