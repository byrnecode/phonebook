<template>
  <div class="card my-5">
    <header class="card-header">
      <p class="card-header-title">{{ fullName }}</p>
      <button
        v-if="contact.favorite"
        class="card-header-icon"
        aria-label="more options"
      >
        <span class="icon favorite"> &starf; </span>
      </button>
    </header>
    <div class="card-content">
      <div class="content">
        Phone Number: <strong>{{ contact.phoneNumber }}</strong>
        <br />
        Created at:
        <strong>
          <time :datetime="contact.createdAt">{{ contact.createdAt }}</time>
        </strong>
      </div>
    </div>
    <footer class="card-footer">
      <router-link
        href="#"
        class="card-footer-item has-text-info"
        :to="{ name: 'contact-edit', params: { id: contact.id } }"
        >Edit</router-link
      >
      <a
        href="#"
        class="card-footer-item has-text-primary"
        @click.prevent="toggleFavorite"
      >
        {{ favoriteText }}
      </a>
      <a
        href="#"
        class="card-footer-item has-text-danger"
        data-target="delete-contact-modal"
        @click.prevent="deleteContact"
        >Delete</a
      >
    </footer>
  </div>
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
    favoriteText() {
      return this.contact.favorite
        ? 'Remove from Favorites'
        : 'Mark as Favorite'
    },
  },
  methods: {
    deleteContact() {
      this.$store.dispatch('contact/setContactToDelete', this.contact)
    },
    toggleFavorite() {
      this.$store.dispatch('contact/editContact', {
        ...this.contact,
        favorite: this.contact.favorite ? false : true,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.card-header-icon {
  cursor: auto;
}
.favorite {
  color: #00d1b2;
  font-size: 1.5rem;
}
</style>
