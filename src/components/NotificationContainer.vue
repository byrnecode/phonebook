<script setup>
import NotificationAlert from '@/components/NotificationAlert.vue'
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()
const notifications = computed(() => {
  return notificationStore.notifications
})
</script>

<template>
  <div class="notification-container">
    <NotificationAlert
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<style lang="scss" scoped>
.notification-container {
  position: fixed;
  z-index: 10;
  width: 300px;
  right: 30px;
  bottom: 0;
}
</style>
