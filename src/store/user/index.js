import {
  findUser,
  createUser,
  updateUser,
  removeUser,
  findUsers,
  findAdmins,
  // auth
  logIn,
  logOut
} from "./../firebaseService";

export default {
  state: {
    towns: [
      { name: "Valenciennes", code: "59300" },
      { name: "Raismes", code: "59590" },
      { name: "Bruay-sur-l'Escaut", code: "59860" },
      { name: "Beuvrages", code: "59192" },
      { name: "Anzin", code: "59410" },
      { name: "Petite Forêt", code: "59494" },
      { name: "Escaupont", code: "59278" },
      { name: "Fresnes-sur-l'Escaut", code: "59970" },
    ],
    users: [],
    admins: [],
    // auth user
    actualUser: {},
    visitor: false,
  },
  mutations: {
    // admins
    addAdmin(state, admin) {
      state.admins.push(admin);
    },
    /*
    removeAdmin(state, admin) {
      state.admins.push(admin);
    },
    */
    setAdmins(state, value) {
      state.admins = value;
    },
    // user
    addUser(state, user) {
      state.users.push(user);
    },
    removeUser(state, user) {
      state.users.push(user);
    },
    setUsers(state, value) {
      state.users = value;
    },
    setActualUser(state, user) {
      state.actualUser = user;
    },
    setVisitor(state, visitor) {
      state.visitor = visitor;
    },
  },
  actions: {
    async setVisitor({ commit }, visitor) {
      commit("setVisitor", visitor);
    },
    // signIn user
    async signIn({ commit }, user) {
      console.log("before singin IN ");
      let actualUser = await logIn(user.mail, user.password)
      commit("setActualUser", actualUser);
    },
    async signOut({ commit }) {
      console.log("before sign OUT");
      await logOut()
    },
    // signUp/create or update user
    // data = {user: user, backup: backup}
    async signUpUser({ commit }, data) {
      let user = data.user;
      user.date = new Date().toISOString().split("T")[0];
      // if creating
      if (user.id == null) {
        // register auth
        user.id = await createUser(user);
        //commit("addUser", user);
      } else {
        // if updating
        let backup = data.backup;
        await updateUser(backup, user.mail);
      } // end if
    },
    // delete user
    async deleteUser({ commit }, user) {
      console.log("deleting user", user);
      await removeUser(user);
    },
    // update user
    async updateUser({ commit }, data) {
      let user = data.user;
      let backup = data.backup;

      console.log(user, backup);
      if (backup.mail === user.mail) {
        console.log("NO MAIL CHANGE");
      } else {
        await updateUser(backup, user.mail);
      }
    },
    async getUser({ commit }, id) {
      let user = await findUser(id);
      commit("setActualUser", user);
    },
    // get all users
    // data { admin: true/false}
    async fetchUsers({ commit }, data) {
      console.log("fetching users", data);
      
      let users = []
      if (data.admin) {
        users = await findAdmins()
        commit("setAdmins", users);
      } else {
        users = await findUsers()
        commit("setUsers", users);
      }
    },
  },
  modules: {},
  getters: {
    towns(state) {
      return state.towns;
    },
    users(state) {
      return state.users;
    },
    actualUser(state) {
      return state.actualUser;
    },
    admins(state) {
      return state.admins;
    },
    visitor(state) {
      return state.visitor;
    },
  },
};
