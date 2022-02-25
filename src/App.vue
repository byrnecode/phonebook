<template>
  <div id="app">
    <nav>
      <router-link :to="{ name: 'contact-list' }">List</router-link> |
      <router-link :to="{ name: 'contact-create' }">Create</router-link>
    </nav>
    <div class="section">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
