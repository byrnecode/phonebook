<template>
  <div class="notification-container">
    <NotificationAlert
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationAlert from '@/components/NotificationAlert.vue'
import { mapState } from 'vuex'

export default {
  components: {
    NotificationAlert,
  },
  computed: mapState('notification', ['notifications']),
}
</script>

<style lang="scss" scoped>
.notification-container {
  position: fixed;
  z-index: 10;
  width: 300px;
  right: 30px;
  bottom: 0;
}
</style>
