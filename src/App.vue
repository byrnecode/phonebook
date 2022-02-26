<template>
  <div id="app">
    <MainNav />
    <NotificationContainer />
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-8 is-offset-2">
            <router-view />
          </div>
        </div>
      </div>
    </div>
    <DeleteAlert />
  </div>
</template>

<script>
import MainNav from '@/components/MainNav.vue'
import NotificationContainer from '@/components/NotificationContainer.vue'
import DeleteAlert from '@/components/DeleteAlert.vue'

export default {
  components: {
    MainNav,
    NotificationContainer,
    DeleteAlert,
  },
}
</script>

<style lang="scss"></style>
