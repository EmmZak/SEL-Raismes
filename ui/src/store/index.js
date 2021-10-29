import Vue from 'vue'
import Vuex from 'vuex'

import ServiceStore from "./service"
import UserStore from "./user"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    service: ServiceStore,
    user: UserStore
  }
})
