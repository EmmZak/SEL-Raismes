import Vue from 'vue'
import Vuex from 'vuex'
import UserService from './../services/UserService'
import publicationService from './../services/PublicationService'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userService: new UserService(),
    users: [], 
    publicationService: new publicationService(),
    publications: []
  },
  mutations: {
    // stuff to change state
    setUsers(state, value) {
      state.users = value
    },
    setPublications(state, value) {
      state.publications = value
    }
  },
  actions: {
    /****** User CRUD *******/
    saveUser({dispatch}, user) {
      if (user.id != "") {
        // update
        dispatch('updateUser',  user)
      } else {
        // create
        dispatch('createUser', user)
      }
    },
    getUser({state}, id) {
      return state.userService.get(id)
    },
    fetchUsers({state}) {
      var users = state.userService.getAll()
      this.commit("setUsers", users)
    },
    createUser({state}, user) {
      state.userService.create(user)
        .then((doc) => {
          console.log("doc.id", doc.id)
          user.id = doc.id
          state.users.push(user)
        })
    },
    // find user by ID, get Index and modify in state.users
    updateUser({state}, user) {
      var userObject = state.users.find(item => item.id == user.id)
      var index = state.users.indexOf(userObject)
      Object.assign(state.users[index], user) 
      return state.userService.update(user)
    },
    removeUser({state}, user) {
      state.users = state.users.filter(function(item) {
        return item.id != user.id
      })

      return state.userService.remove(user)
    },
    /****** Publication CRUD *******/
    savePublication({dispatch}, item) {
      if (item.id != "") {
        // update
        dispatch('updatePublication',  item)
      } else {
        // create
        dispatch('createPublication', item)
      }
    },
    getPublication({state}, id) {
      return state.publicationService.get(id)
    },
    fetchPublications({state}) {
      var publications = state.publicationService.getAll()
      this.commit("setPublications", publications)
    },
    createPublication({state}, item) {
      state.publicationService.create(item)
        .then((doc) => {
          console.log("doc.id", doc.id)
          item.id = doc.id
          state.publications.push(item)
        })
    },
    updatePublication({state}, pub) {
      var pubObject = state.publications.find(item => item.id == pub.id)
      var index = state.publications.indexOf(pubObject)
      Object.assign(state.publications[index], pub) 
      return state.publicationService.update(pub)
    },
    removePublication({state}, item) {
      state.publications = state.publications.filter(function(pub) {
        return pub.id != item.id
      })

      return state.publicationService.remove(item)
    },
  },
  modules: {
  }, 
  getters: {
    users(state) {
      return state.users
    },
    publications(state) {
      return state.publications
    }
  }
})

export default store;