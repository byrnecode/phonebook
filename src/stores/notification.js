import { defineStore } from 'pinia'

let nextId = 1

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
  }),

  actions: {
    add(notification) {
      this.notifications.push({
        ...notification,
        id: nextId++,
      })
    },
    remove(notificationToRemove) {
      this.notifications = this.notifications.filter(
        (notification) => notification.id !== notificationToRemove.id
      )
    },
  },
})
