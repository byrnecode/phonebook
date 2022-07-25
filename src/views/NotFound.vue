<script setup>
defineProps({
  resource: {
    type: [String, Number],
    required: true,
  },
})
</script>

<template>
  <div>
    <h1 class="is-size-1">404</h1>
    <h3>
      The {{ resource ? resource : 'page' }} you're looking for is not found.
    </h3>
    <p>
      <router-link :to="{ name: 'contact-list' }">Back to Homepage</router-link>
    </p>
  </div>
</template>

<style scoped></style>
