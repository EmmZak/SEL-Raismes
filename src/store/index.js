import Vue from 'vue'
import Vuex from 'vuex'
import AdminService from './../services/AdminService'
import UserService from './../services/UserService'
import publicationService from './../services/PublicationService'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    adminService: new AdminService(),
    admins: [],
    userService: new UserService(),
    users: [], 
    publicationService: new publicationService(),
    publications: []
  },
  mutations: {
    // stuff to change state
    setAdmins(state, value) {
      state.admins = value
    },
    setUsers(state, value) {
      state.users = value
    },
    setPublications(state, value) {
      state.publications = value
    }
  },
  actions: {
    /****** Admin CRUD *******/
    saveAdmin({dispatch}, admin) {
      // creation date is not picked
      if (admin.date == null) {
        admin.date = new Date()
      } 
      
      //admin.fullName = user.nom + " " + user.prenom

      if (admin.id != null) {
        // update
        // check if object has changed to avoid useless update operation
        dispatch('updateAdmin',  admin)
      } else {
        // create
        dispatch('createAdmin', admin)
      }
    },
    getAdmin({state}, id) {
      return state.adminService.get(id)
    },
    fetchAdmins({state}) {
      var admins = state.adminService.getAll()
      this.commit("setAdmins", admins)
    },
    createAdmin({state}, admin) {
      state.adminService.create(admin)
        .then((doc) => {
          console.log("doc.id", doc.id)
          admin.id = doc.id
          state.admins.push(admin)
          console.log("created admin", admin)
        })
    },
    // find admin by ID, get Index and modify in state.admins
    async updateAdmin({state}, admin) {
      var adminObject = state.admins.find(item => item.id == admin.id)
      var index = state.admins.indexOf(adminObject)
      Object.assign(state.admins[index], admin) 

      //console.log("updating  admin")
      return state.adminService.update(admin)
    },
    removeAdmin({state}, admin) {
      state.admins = state.admins.filter(function(item) {
        return item.id != admin.id
      })

      return state.adminService.remove(admin)
    },

    /****** User CRUD *******/
    saveUser({dispatch}, user) {
      // creation date is not picked
      if (user.date == null) {
        user.date = new Date()
      } 
      
      //user.fullName = user.nom + " " + user.prenom

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
    async updateUser({state}, user) {
      var userObject = state.users.find(item => item.id == user.id)
      var index = state.users.indexOf(userObject)
      Object.assign(state.users[index], user) 

      //console.log("updating pubs")
      await state.publicationService.updateUser(user)
      //console.log("updating  user")
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
      //console.log("fetching pubs")
      var pubs = []
      state.publicationService.getAll()
        .then((query) => {
          query.forEach((doc) => {
            var pub = doc.data()
            pub["id"] = doc.id
            //user.date = this.formatDDMMYYYY(user.date)
            pubs.push(pub)
          })

          this.commit("setPublications", pubs)
        })
        .catch((err) => {
          console.log("err", err)
        })
      
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
    admins(state) {
      return state.admins
    },
    users(state) {
      return state.users
    },
    publications(state) {
      return state.publications
    }
  }
})

export default store;