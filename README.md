# phonebook

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

This app is created with vue-cli. Selected options: Vuex, Vue router, ESlint, Prettier, SASS
Added Bulma as pure css framework (to handle global styles and helper classes)
Entry points: App.vue, main.js
Routes/Views:
'/' - ContactList - homepage/ shows main the contact list
'/contact/create' - ContactCreate - Where you can add new contact
'/contact/:id' - ContactShow - View for individual contact, where you can also edit.
