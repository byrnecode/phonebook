<template>
  <div>
    <h1 class="is-size-3">Edit Contact</h1>
    <ContactForm :contact-id="id" />
  </div>
</template>

<script>
import ContactForm from '@/components/ContactForm.vue'

export default {
  components: {
    ContactForm,
  },
  props: ['id'],
}
</script>

<style lang="scss" scoped></style>
