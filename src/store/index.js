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
      return state.userService.getUser(id)
    },
    async fetchUsers({state}) {
      var users = await state.userService.getUsers()
      console.log("fetchUsers.commit.users", users)
      this.commit("setUsers", users)
    },
    createUser({state}, user) {
      state.users.push(user)
      return state.userService.createUser(user)
    },
    // find user by ID, get Index and modify in state.users
    updateUser({state}, user) {
      console.log("user", user)
      var userObject = state.users.find(item => item.id == user.id)
      console.log("userObject", userObject)
      var index = state.users.indexOf(userObject)
      Object.assign(state.users[index], user) 
      return state.userService.updateUser(user)
    },
    removeUser({state}, user) {
      state.users.splice(state.users.indexOf(user, 1))
      return state.userService.removeUser(user)
    },
    /****** UsPublicationer CRUD *******/
    savePublication() {

    },
    getPublication({state}, id) {
      return state.publicationService.getPublication(id)
    },
    async fetchPublications({state}) {
      var publications = await state.publicationService.getPublications()
      this.commit("setPublications", publications)
    },
    createPublication({state}, item) {
      return state.publicationService.createUser(item)
    },
    updatePublication({state}, item) {
      return state.publicationService.update(item)
    }
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