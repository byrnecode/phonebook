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

<script>
export default {
  props: {
    resource: {
      type: [String, Number],
      required: true,
    },
  },
}
</script>

<style scoped></style>
