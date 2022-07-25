<script setup>
import ContactForm from '@/components/ContactForm.vue'
import { computed } from 'vue'

const props = defineProps(['id'])

const contactId = computed(() => {
  return props.id ? parseInt(props.id, 10) : null
})
</script>

<template>
  <div>
    <h1 class="is-size-3">Edit Contact</h1>
    <ContactForm :contact-id="contactId" />
  </div>
</template>

<style lang="scss" scoped></style>
