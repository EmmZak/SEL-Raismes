import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// mixins.js
import {
  formatISOonlydate,
  formatISOdateToHours,
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

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
