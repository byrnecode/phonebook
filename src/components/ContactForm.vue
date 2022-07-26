<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {
  PhoneNumberFormat as PNF,
  PhoneNumberUtil,
} from 'google-libphonenumber'
const phoneUtil = PhoneNumberUtil.getInstance()

const store = useStore()
const router = useRouter()

const props = defineProps({
  contactId: {
    type: [Number],
    required: false,
  },
})

const firstName = ref('')
const lastName = ref('')
const phoneNumber = ref('')
const firstNameTouched = ref(false)
const lastNameTouched = ref(false)
const phoneNumberTouched = ref(false)
const formattedNumError = ref('')

const getContactById = computed(() => {
  return store.getters['contact/getContactById'](props.contactId)
})

const getContactByPhoneNum = computed(() => {
  return store.getters['contact/getContactByPhoneNum'](phoneNumber.value)
})

const firstNameError = computed(() => {
  return !firstName.value && firstNameTouched.value ? true : false
})

const lastNameError = computed(() => {
  return !lastName.value && lastNameTouched.value ? true : false
})

const phoneNumberError = computed(() => {
  return !phoneNumber.value && phoneNumberTouched.value ? true : false
})

const contact = computed(() => {
  return props.contactId ? getContactById.value : null
})

const hasErrors = computed(() => {
  return (
    firstNameError.value ||
    lastNameError.value ||
    phoneNumberError.value ||
    formattedNumError.value
  )
})

watch(phoneNumber, (val) => {
  if (!val) {
    // always clear if no user input
    formattedNumError.value = ''
  } else if (val && val.length > 1) {
    try {
      // parse and validate phone number
      const number = phoneUtil.parseAndKeepRawInput(val, 'US')
      phoneNumber.value = phoneUtil.format(number, PNF.E164)
      formattedNumError.value = ''
    } catch (error) {
      formattedNumError.value = error
    }
  }
})

onMounted(() => {
  if (contact.value) {
    firstName.value = contact.value.firstName
    lastName.value = contact.value.lastName
    phoneNumber.value = contact.value.phoneNumber
  }
})

function create() {
  // generate psuedo random id, on prod we can use something like uuid package
  const id = Math.floor(Math.random() * 10000000)
  store.dispatch('contact/createContact', {
    id,
    firstName: firstName.value,
    lastName: lastName.value,
    phoneNumber: phoneNumber.value,
    createdAt: getDateTime(),
  })
}

function edit() {
  store.dispatch('contact/editContact', {
    ...contact.value,
    firstName: firstName.value,
    lastName: lastName.value,
    phoneNumber: phoneNumber.value,
  })
}

function submit() {
  firstNameTouched.value = true
  lastNameTouched.value = true
  phoneNumberTouched.value = true
  // check first if number already exists
  const found = getContactByPhoneNum.value
  if (found && found.id !== props.contactId) {
    formattedNumError.value = `Error: Phone number ${phoneNumber.value} already exists!`
  }
  // check for other form errors
  if (!hasErrors.value) {
    // if we have contactId props, then we are editing
    if (props.contactId) {
      edit()
    }
    // else create new contact
    else {
      create()
    }
    clear()
    router.push({ name: 'contact-list' })
  }
}

function clear() {
  firstName.value = ''
  lastName.value = ''
  phoneNumber.value = ''
  formattedNumError.value = ''
}

function getDateTime() {
  const today = new Date()
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  return date + ' ' + time
}
</script>

<template>
  <form class="my-5">
    <div class="field">
      <label class="label">Firstname</label>
      <div class="control">
        <input
          class="input"
          :class="{ 'is-danger': firstNameError }"
          type="text"
          placeholder="John"
          v-model="firstName"
          @blur="firstNameTouched = true"
        />
      </div>
      <p v-if="firstNameError" class="help is-danger">This field is required</p>
    </div>

    <div class="field">
      <label class="label">Lastname</label>
      <div class="control">
        <input
          class="input"
          :class="{ 'is-danger': lastNameError }"
          type="text"
          placeholder="Doe"
          v-model="lastName"
          @blur="lastNameTouched = true"
        />
      </div>
      <p v-if="lastNameError" class="help is-danger">This field is required</p>
    </div>

    <div class="field">
      <label class="label">Phone number</label>
      <div class="control">
        <input
          class="input"
          :class="{ 'is-danger': phoneNumberError || formattedNumError }"
          type="tel"
          placeholder="+14244048668"
          v-model="phoneNumber"
          @blur="phoneNumberTouched = true"
        />
      </div>
      <p v-if="formattedNumError" class="help is-danger">
        {{ formattedNumError }}
      </p>
      <p v-if="phoneNumberError" class="help is-danger">
        This field is required
      </p>
    </div>

    <div class="field is-grouped is-relative">
      <div class="control">
        <button class="button is-link" type="submit" @click.prevent="submit">
          Submit
        </button>
      </div>
      <div class="control">
        <button class="button is-link is-light" @click.prevent="clear">
          Clear
        </button>
      </div>
      <div class="control cancel-btn" v-if="contactId">
        <router-link
          class="button is-link is-danger"
          :to="{ name: 'contact-list' }"
          >Cancel</router-link
        >
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.cancel-btn {
  position: absolute;
  right: 0;
}
</style>
