import firebase from '../firebaseConfig';

export default class User {

    constructor() {
        this.db = firebase.firestore();
    }

    getUser(id) {
        this.db.collection("users")
          .doc(id)
          .get()
          .then((res) => {
            return res.data()
          })
          .catch((err) => {
            console.log("getUser.err ", err)
            return {}
          })
    }

    getUsers() {
        var users = []
        
        this.db.collection("users")
          .get()
          .then((query) => {
            query.forEach((doc) => {

              var user = doc.data()
              user["id"] = doc.id
              //user.date = this.formatDDMMYYYY(user.date)
              users.push(user)
            })

          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        return users
    }

    createUser(user) {
      this.db.collection("users")
        .doc()
        .set(user)
    }

    /**
     * user.id is the ID of generated document
     */
    updateUser(user) {
      this.db.collection("users")
        .doc(user.id)
        .update(user)
    }

    removeUser(user) {
      this.db.collection("users")
        .doc(user.id)
        .delete(user)
    }

}