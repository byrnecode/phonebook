<script setup>
import { computed } from 'vue'
import { useContactStore } from '@/stores/contact'

const contactStore = useContactStore()

const props = defineProps({
  contact: {
    type: Object,
    required: true,
  },
})

const fullName = computed(() => {
  return props.contact.firstName + ' ' + props.contact.lastName
})

const favoriteText = computed(() => {
  return props.contact.favorite ? 'Remove from Favorites' : 'Mark as Favorite'
})

function deleteContact() {
  contactStore.setContactToDelete(props.contact)
}

function toggleFavorite() {
  contactStore.editContact({
    ...props.contact,
    favorite: props.contact.favorite ? false : true,
  })
}
</script>

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

<style lang="scss" scoped>
.card-header-icon {
  cursor: auto;
}
.favorite {
  color: #00d1b2;
  font-size: 1.5rem;
}
</style>
