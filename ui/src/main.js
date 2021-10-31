import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { auth } from './firebaseConfig'

// mixins.js
import {
  formatISOonlydate,
  formatISOdateToHours,
  // path
  getCurrentPath,
  goToPath,
  // rules
  requiredRules,
  passwordRules,
  nameRules,
  emailRules,
  numberRules,
  onlyNumbersRules,
  messageRules,
  subjectRules,
  townRules,
  // sort
  sortOptions,
  // towns
  towns,
  getTownName,
  // categories
  categories,
  getCategoryByValue,
  getCategoryNameByValue,
  getCategoryImageByValue
} from "./mixins"

Vue.config.productionTip = false

const mixin = {
  data: () => {
    return {
      townRules,
      requiredRules,
      passwordRules,
      nameRules,
      emailRules,
      numberRules,
      onlyNumbersRules,
      messageRules,
      subjectRules,
      // towns
      towns,
      // categories
      categories,
      // sort
      sortOptions
    }
  },
  methods: {
    goToPath,
    getCurrentPath,
    // town
    getTownName,
    // categories
    getCategoryByValue,
    getCategoryNameByValue,
    getCategoryImageByValue,
    // date time format
    formatISOonlydate,
    formatISOdateToHours,
  }
}

Vue.mixin(mixin)

// new Vue({
//   router,
//   store,
//   vuetify,
//   render: h => h(App)
// }).$mount('#app')
let app
auth.onAuthStateChanged((authUser) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }

  if (authUser) {
    console.log("Main.js, found authUser", authUser)
    store.dispatch('setup', authUser)
  } else {
    console.log("Main.js, NO User found")
  }
})


