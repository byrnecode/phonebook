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
          :class="{ 'is-danger': phoneNumberError }"
          type="text"
          placeholder="+14244048668"
          v-model="phoneNumber"
          @blur="phoneNumberTouched = true"
        />
      </div>
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

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    contactId: {
      type: [Number],
      required: false,
    },
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      firstNameTouched: false,
      lastNameTouched: false,
      phoneNumberTouched: false,
    }
  },
  computed: {
    ...mapGetters('contact', ['getContactById']),
    firstNameError() {
      return !this.firstName && this.firstNameTouched ? true : false
    },
    lastNameError() {
      return !this.lastName && this.lastNameTouched ? true : false
    },
    phoneNumberError() {
      return !this.phoneNumber && this.phoneNumberTouched ? true : false
    },
    contact() {
      return this.contactId ? this.getContactById(this.contactId) : null
    },
  },
  mounted() {
    if (this.contact) {
      this.firstName = this.contact.firstName
      this.lastName = this.contact.lastName
      this.phoneNumber = this.contact.phoneNumber
    }
  },
  methods: {
    create() {
      const id = Math.floor(Math.random() * 10000000) // psuedo random id, on prod we can use something like uuid package
      this.$store.dispatch('contact/createContact', {
        id,
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        createdAt: this.getDateTime(),
      })
    },
    edit() {
      this.$store.dispatch('contact/editContact', {
        ...this.contact,
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
      })
    },
    submit() {
      this.firstNameTouched = true
      this.lastNameTouched = true
      this.phoneNumberTouched = true
      // simple check if fields are blank
      if (
        !this.firstNameError &&
        !this.lastNameError &&
        !this.phoneNumberError
      ) {
        // if we have contactId props, then we are editing
        if (this.contactId) {
          this.edit()
        }
        // else create new contact
        else {
          this.create()
        }
        this.clear()
        this.$router.push({ name: 'contact-list' })
      }
    },
    clear() {
      this.firstName = ''
      this.lastName = ''
      this.phoneNumber = ''
    },
    getDateTime() {
      const today = new Date()
      const date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate()
      const time =
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      return date + ' ' + time
    },
  },
}
</script>

<style lang="scss" scoped>
.cancel-btn {
  position: absolute;
  right: 0;
}
</style>
