import {
  Firestore,
  FirebaseAuth,
  FirebaseRefForAuth,
} from "./../../firebaseConfig";

export default {
  state: {
    users: [],
    // auth user
    actualUser: {
      fullName: "",
      mail: "",
      number: "",
      adresse: "",
      date: null,
      creadit: "",
    },
  },
  mutations: {
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
  },
  actions: {
    // signUp/create user
    async signUpUser({ commit }, user) {
      if (user.date == null) {
        user.date = new Date();
      }
      // register auth
      console.log("authing user", user);
      let authUser = await FirebaseAuth.createUserWithEmailAndPassword(
        user.mail,
        user.password
      );

      const uid = authUser.user.uid;
      user.id = uid;

      Firestore.collection("users")
        .doc(uid)
        .set(user);

      commit("addUser", user);
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
      Firestore.collection("users")
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

      // update publications
      await Firestore.collection("publications")
        .where("user.id", "==", user.id)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            var update = {};
            update[`user`] = user;
            doc.ref.update(update);
          });
        });
    },
    // get all users
    fetchUsers({ commit }) {
      console.log("fetching users");
      let users = [];
      Firestore.collection("users")
        .get()
        .then((query) => {
          query.forEach((doc) => {
            var user = doc.data();
            user.id = doc.id;
            users.push(user);
          });
          commit("setUsers", users);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
  getters: {
    users(state) {
      return state.users;
    },
  },
};
