<script setup>
import MainNav from '@/components/MainNav.vue'
import NotificationContainer from '@/components/NotificationContainer.vue'
import DeleteAlert from '@/components/DeleteAlert.vue'
</script>

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

<style lang="scss"></style>
