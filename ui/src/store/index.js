import Vue from 'vue'
import Vuex from 'vuex'
import UserStore from './user'
import PublicationStore from './publication'
import EventStore from './event'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user: UserStore,
    publication: PublicationStore,
    event: EventStore
  }
})

export default store
