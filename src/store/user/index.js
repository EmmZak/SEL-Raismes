import {
  Firestore,
  FirebaseAuth,
  FirebaseRefForAuth,
} from "./../../firebaseConfig";

export default {
  state: {
    towns: [
      { town: "Valenciennes", code: "59300" },
      { town: "Raismes", code: "59590" },
      { town: "Bruay-sur-l'Escaut", code: "59860" },
      { town: "Beuvrages", code: "59192" },
      { town: "Anzin", code: "59410" },
      { town: "Petite Forêt", code: "59494" },
      { town: "Escaupont", code: "59278" },
      { town: "Fresnes-sur-l'Escaut", code: "59970" },
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

      let actualUser = await FirebaseAuth.signInWithEmailAndPassword(
        user.mail,
        user.password
      );
      let id = actualUser.user.uid;
      console.log("looking for doc id", id);

      await Firestore.collection("users")
        .doc(id)
        .get()
        .then((doc) => {
          console.log("got user data", doc.data());
          commit("setActualUser", doc.data());
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("after store sing IN ");
    },
    async signOut({ commit }) {
      console.log("before sign OUT");

      await FirebaseAuth.signOut();
      commit("setActualUser", {});

      console.log("after signx OUT");
    },
    // signUp/create or update user
    // data = {user: user, backup: backup}
    async signUpUser({ commit }, data) {
      let user = data.user;
      user.date = new Date().toISOString().split('T')[0]
      
      //let batch = Firestore.batch();
      // if creating
      let authUser = null;
      if (user.id == null) {
        // register auth
        console.log("authing user", user);
        authUser = await FirebaseAuth.createUserWithEmailAndPassword(
          user.mail,
          user.password
        );

        const uid = authUser.user.uid;
        user.id = uid;

        Firestore.collection("users")
          .doc(uid)
          .set(user);

        commit("addUser", user);
      } 
      else {
        // if updating
        let backup = data.backup;

        if (backup.mail === user.mail) {
          console.log("NO MAIL CHANGE");
        } else {
          await FirebaseRefForAuth.signInWithEmailAndPassword(
            backup.mail,
            backup.password
          );
          let actualUser = FirebaseRefForAuth.currentUser;
          await actualUser.updateEmail(user.mail);
          await FirebaseRefForAuth.signOut();
          //app.delete()
        }
        // update in collections
        await Firestore.collection("users")
          .doc(user.id)
          .update(user);
      } // end if
    },
    // delete user
    async deleteUser({ commit }, user) {
      //let app = FirebaseRefForAuth.initializeApp(firebaseConfig, "authManager");

      await FirebaseRefForAuth.signInWithEmailAndPassword(
        user.mail,
        user.password
      );
      await FirebaseRefForAuth.currentUser.delete();
      await FirebaseRefForAuth.signOut();
      //await app.delete();

      // remove from collections
      await Firestore.collection("users")
        .doc(user.id)
        .delete(user);
    },
    // update user
    async updateUser({ commit }, data) {
      //let app = FirebaseRefForAuth.initializeApp(firebaseConfig, "authManager");
      let user = data.user;
      let backup = data.backup;
      console.log(user, backup);
      if (backup.mail === user.mail) {
        console.log("NO MAIL CHANGE");
      } else {
        await FirebaseRefForAuth.signInWithEmailAndPassword(
          backup.mail,
          backup.password
        );
        let actualUser = FirebaseRefForAuth.currentUser;
        await actualUser.updateEmail(user.mail);
        await FirebaseRefForAuth.signOut();
        //app.delete()
      }

      // update in collections
      await Firestore.collection("users")
        .doc(user.id)
        .update(user);
    },
    async getUser({ commit }, id) {
      await Firestore.collection("users")
        .doc(id)
        .get()
        .then((doc) => {
          commit("setActualUser", doc.data());
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // get all users
    // data { admin: true/false}
    fetchUsers({ commit }, data) {
      console.log("fetching users", data);

      let users = [];
      Firestore.collection("users")
        .where("admin", "==", data.admin)
        .get()
        .then((query) => {
          query.forEach((doc) => {
            var user = doc.data();
            user.id = doc.id;
            users.push(user);
          });
          if (data.admin) {
            commit("setAdmins", users);
          } else {
            commit("setUsers", users);
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
