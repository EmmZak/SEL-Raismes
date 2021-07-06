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
      // creation date is not picked
      if (user.date == null) {
        user.date = new Date()
      } 
      
      user.fullName = user.nom + " " + user.prenom

      if (user.id != null) {
        // update
        // check if object has changed to avoid useless update operation
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
          console.log("created user", user)
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
      console.log("item to save", item)
      // creation date is set automatically
      if (item.date == null) {
        item.date = new Date()
      } 
      
      item.userFullName = item.user.nom + " " + item.user.prenom

      /*
       * item.user is the selected user
       * so we need to point to the document
       */
      console.log("setting  id path wtih", item.user)
      item.user =  this.state.userService.db.doc('users/' + item.user.id)

      if (item.id != null) {
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
      console.log("fetching pubs")
      var publications = state.publicationService.getAll()

      for (let i=0; i<publications.length; i++) {
        var userId = publications[i].user.id
        var user = this.state.userService.getUser(userId)
        console.log("pub.user ", user)  
        publications[i].user = user
      }

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