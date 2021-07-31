import {
  Firestore,
  FirebaseAuth,
  FirebaseRefForAuth,
} from "./../../firebaseConfig";

export default {
  state: {
    admins: [],
  },
  mutations: {
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
    }
  },
  actions: {
    // signUp/create admin
    async signUpAdmin({ commit }, admin) {
      if (admin.date == null) {
        admin.date = new Date();
      }
      // register auth
      console.log("authing admin", admin);
      let authUser = await FirebaseAuth.createUserWithEmailAndPassword(
        admin.mail,
        admin.password
      );

      const uid = authUser.user.uid;
      admin.id = uid;

      Firestore.collection("admins")
        .doc(uid)
        .set(admin);

      commit("addAdmin", admin);
    },
    // delete admin
    async deleteAdmin({ commit }, admin) {
      //let app = FirebaseRefForAuth.initializeApp(firebaseConfig, "authManager");

      await FirebaseRefForAuth.signInWithEmailAndPassword(
        admin.mail,
        admin.password
      );
      await FirebaseRefForAuth.currentUser.delete();
      await FirebaseRefForAuth.signOut();
      //await app.delete();

      // remove from collections
      Firestore.collection("admins")
        .doc(admin.id)
        .delete(admin);
    },
    // update user
    async updateAdmin({ commit }, data) {
      //let app = FirebaseRefForAuth.initializeApp(firebaseConfig, "authManager");
      let admin = data.admin;
      let backup = data.backup;
      console.log(admin, backup);
      if (backup.mail === admin.mail) {
        console.log("NO MAIL CHANGE");
      } else {
        await FirebaseRefForAuth.signInWithEmailAndPassword(
          backup.mail,
          backup.password
        );
        let actualUser = FirebaseRefForAuth.currentUser;
        await actualUser.updateEmail(admin.mail);
        await FirebaseRefForAuth.signOut();
        //app.delete()
      }
      // update in collections
      Firestore.collection("admins")
        .doc(admin.id)
        .update(admin);
    },
    // get all admins
    fetchAdmins({ commit }) {
      let admins = [];
      Firestore.collection("admins")
        .get()
        .then((query) => {
          query.forEach((doc) => {
            var admin = doc.data();
            admin.id = doc.id;
            admins.push(admin);
          });
          commit("setAdmins", admins);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
  getters: {
    admins(state) {
      return state.admins;
    },
  },
};
