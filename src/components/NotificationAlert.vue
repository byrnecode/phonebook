<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  notification: {
    type: Object,
    required: true,
  },
})

const timeOut = ref(null)

const store = useStore()
function remove(notificationToRemove) {
  store.dispatch('notification/remove', notificationToRemove)
}

const notificationTypeClass = computed(() => {
  return `is-${props.notification.type}`
})

onMounted(() => {
  timeOut.value = setTimeout(() => remove(props.notification), 5000)
})
onUnmounted(() => {
  clearTimeout(timeOut.value)
})
</script>

<template>
  <div class="notification is-light my-4" :class="notificationTypeClass">
    <button class="delete" @click="remove(notification)"></button>
    {{ notification.message }}
  </div>
</template>

<style lang="scss" scoped></style>
