import { db, auth, authManager } from "./../../firebaseConfig";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
} from "@firebase/firestore";
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  updateEmail,
  deleteUser
} from "firebase/auth";

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

      let actualUser = await signInWithEmailAndPassword(
        auth,
        user.mail,
        user.password
      );
      let id = actualUser.user.uid;
      console.log("looking for doc id", id);

      const userDoc = await getDoc(doc(db, "users", id));

      if (userDoc.exists()) {
        console.log("got user data", userDoc.data());
        commit("setActualUser", userDoc.data());
      } else {
        console.log("no such document with id=", id);
      }
    },
    async signOut({ commit }) {
      console.log("before sign OUT");

      await signOut(auth)
        .then(() => {
          console.log("after signx OUT");
          commit("setActualUser", {});
        })
        .catch((err) => {
          console.log("cant log out err", err);
        });
    },
    // signUp/create or update user
    // data = {user: user, backup: backup}
    async signUpUser({ commit }, data) {
      let user = data.user;
      user.date = new Date().toISOString().split("T")[0];
      // if creating
      if (user.id == null) {
        // register auth
        console.log("authing user", user);
        let authUser = await createUserWithEmailAndPassword(
          auth,
          user.mail,
          user.password
        );
        user.id = authUser.user.uid;

        await setDoc(doc(db, "users", user.id), user);
        commit("addUser", user);
      } else {
        // if updating
        let backup = data.backup;

        if (backup.mail === user.mail) {
          console.log("NO MAIL CHANGE");
        } else {
          signInWithEmailAndPassword(
            authManager,
            backup.mail,
            backup.password
          );
          updateEmail(authManager.currentUser, user.mail)
          .then(() => {
            signOut(authManager);
          })
          .catch((err) => {
            console.log("error updating user auth", err);
          });
        }
        // update in collections
        await updateDoc(doc(db, "users", user.id), user)
      } // end if 
    },
    // delete user
    async deleteUser({ commit }, user) {
      console.log("deleting user", user);

      let authUser = await signInWithEmailAndPassword(
        authManager,
        user.mail,
        user.password
      );
      deleteUser(authUser).then(() => {
        console.log("DELETED user", user);
      }).catch((err) => {
        console.log("err deleting user", user,  err)
      })
      
      await deleteDoc(doc(db, "users", user.id));
    },
    // update user
    async updateUser({ commit }, data) {
      let user = data.user;
      let backup = data.backup;

      console.log(user, backup);
      if (backup.mail === user.mail) {
        console.log("NO MAIL CHANGE");
      } else {
        signInWithEmailAndPassword(authManager, backup.mail, backup.password);
        updateEmail(authManager.currentUser, user.mail)
          .then(() => {
            signOut(authManager);
          })
          .catch((err) => {
            console.log("error updating user auth", err);
          });
      }
      // update in collections
      const docRef = doc(db, "users", user.id);
      await updateDoc(docRef, user);
    },
    async getUser({ commit }, id) {
      const userDoc = await getDoc(doc(db, "users", id));
      if (userDoc.exists()) {
        commit("setActualUser", userDoc.data());
      } else {
        console.log("doc doesnt exist with id", id);
      }
    },
    // get all users
    // data { admin: true/false}
    async fetchUsers({ commit }, data) {
      console.log("fetching users", data);
      let users = [];

      const q = query(
        collection(db, "users"),
        where("admin", "==", data.admin)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        var user = doc.data();
        user.id = doc.id;
        users.push(user);
      });

      if (data.admin) {
        commit("setAdmins", users);
      } else {
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
