<template>
  <div class="notification is-light my-4" :class="notificationTypeClass">
    <button class="delete" @click="remove(notification)"></button>
    {{ notification.message }}
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
    }
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  computed: {
    notificationTypeClass() {
      return `is-${this.notification.type}`
    },
  },
  methods: mapActions('notification', ['remove']),
}
</script>

<style lang="scss" scoped></style>
