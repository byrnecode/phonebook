# phonebook

This app allows you to add/edit/delete contacts on your browser. It uses localstorage for storing the data. Implemented with Vue 3 using Compisition API.

Created with vue-cli, Pinia, Vue router, ESlint, Prettier, SASS

Other Packages:

Bulma - as pure css framework (to handle global styles and helper classes)

google-libphonenumber - phone formatter and validation

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## App Notes
Entry points: App.vue, main.js

Main Router: 'src/router/index.js'

Available Routes:

'/' - `ContactList.vue` - Homepage and shows the main contact list

'/contact/create' - `ContactCreate.vue` - Where you can add new contact

'/contact/:id' - `ContactEdit.vue` - View for individual contact, where you can also edit

'/404' - `NotFound.vue` - Catch all 404 page

Pinia stores: 'src/stores/..' - contact and notification

## Checklist for this task

Functions:

- The contact list needs to have a basic phone number or name search.

- The contact list needs to have an infinite scroll for loading more contacts (pagination).

- There should be a way to mark contacts as favorite and see your favorite list from the contacts list.

- You should be able to sort based on created at or based on full name ASC / DESC. Default is created at DESC (latest on top).

Rules:

- Phone numbers are unique so you can’t have two contacts with the same phone number.

- Phone numbers need to be validated and fixed to E164 format using google-libphonenumber package.

- All the data needs to be stored in Pinia storage and it needs to be persistent (should not go away with refresh).

- The page should not refresh while you are adding a contact.
