<template>
  <div class="container">
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <nav class="navbar my-5" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a
              role="button"
              class="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbar-main"
              @click="toggleMenu"
              :class="{ 'is-active': isActive }"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div
            id="navbar-main"
            class="navbar-menu"
            :class="{ 'is-active': isActive }"
          >
            <div class="navbar-start">
              <router-link class="navbar-item" :to="{ name: 'contact-list' }">
                <strong>Home</strong>
              </router-link>
            </div>

            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  <router-link
                    class="button is-primary"
                    :to="{ name: 'contact-create' }"
                  >
                    Add Contact
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    toggleMenu() {
      this.isActive = !this.isActive
    },
  },
}
</script>

<style lang="scss" scoped></style>
