import Vue from 'vue'
import Vuex from 'vuex'
import UserStore from './user'
import AdminStore from './admin'
import PublicationStore from './publication'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user: UserStore,
    admin: AdminStore,
    publication: PublicationStore
  }
})

export default store
