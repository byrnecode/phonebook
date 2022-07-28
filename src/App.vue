<script setup>
import MainNav from '@/components/MainNav.vue'
import NotificationContainer from '@/components/NotificationContainer.vue'
import DeleteAlert from '@/components/DeleteAlert.vue'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useContactStore } from './stores/contact'

const contactStore = useContactStore()
const { contacts } = storeToRefs(contactStore)

watch(
  contacts,
  (val) => {
    // persist the contacts state to the local storage whenever it changes
    localStorage.setItem('aloware-phonebook', JSON.stringify(val))
  },
  { deep: true }
)
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
