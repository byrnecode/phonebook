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

    <div class="field is-grouped">
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
    </div>
  </form>
</template>

<script>
export default {
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
    firstNameError() {
      return !this.firstName && this.firstNameTouched ? true : false
    },
    lastNameError() {
      return !this.lastName && this.lastNameTouched ? true : false
    },
    phoneNumberError() {
      return !this.phoneNumber && this.phoneNumberTouched ? true : false
    },
  },
  methods: {
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
        const id = Math.floor(Math.random() * 10000000) // psuedo random id, on prod we can use something like uuid package
        this.$store.dispatch('contact/createContact', {
          id,
          firstName: this.firstName,
          lastName: this.lastName,
          phoneNumber: this.phoneNumber,
          createdAt: this.getDateTime(),
        })
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

<style lang="scss" scoped></style>
