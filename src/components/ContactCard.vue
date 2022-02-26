<template>
  <!-- <router-link
    class="contact-link"
    :to="{ name: 'contact-show', params: { id: contact.id } }"
  > -->
  <div class="card my-5">
    <header class="card-header">
      <p class="card-header-title">{{ fullName }}</p>
    </header>
    <div class="card-content">
      <div class="content">
        Phone Number: <strong>{{ contact.phoneNumber }}</strong>
        <br />
        Created at:
        <strong>
          <time datetime="2016-1-1">{{ contact.createdAt }}</time>
        </strong>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">Edit</a>
      <a
        href="#"
        class="card-footer-item"
        data-target="delete-contact-modal"
        @click.prevent="deleteContact"
        >Delete</a
      >
    </footer>
  </div>
  <!-- </router-link> -->
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  computed: {
    fullName() {
      return this.contact.firstName + ' ' + this.contact.lastName
    },
  },
  methods: {
    deleteContact() {
      this.$store.dispatch('contact/setContactToDelete', this.contact)
    },
  },
}
</script>

<style lang="scss" scoped></style>
