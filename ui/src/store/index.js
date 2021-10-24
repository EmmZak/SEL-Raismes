import Vue from 'vue'
import Vuex from 'vuex'

import ServiceStore from "./service"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    service: ServiceStore
  }
})
