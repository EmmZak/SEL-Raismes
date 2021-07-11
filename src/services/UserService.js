import firebase from '../firebaseConfig';

export default class User {

    constructor() {
        this.db = firebase.firestore();
    }

    get(id) {
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

    getAll() {
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

    create(user) {
      return this.db.collection("users")
        .add(user)
        /*
        .then((doc) => {
          console.log("UserService.createUser.doc.id", doc.id)
          
          return doc.id
        })
        .catch((err) => {
          console.log("err", err)
          return null
        })
        console.log("returning service.createUser")
        //return id
        */
    }

    /**
     * user.id is the ID of generated document
     */
    update(user) {
      /*
      // update all publications where user is referenced
      this.db.collection('publications')
             .where('user.id', '==', user.id)
             .get()
             .then((docs) => {
               docs.forEach((doc) => {
                 console.log("updating doc.id", doc.id)
                 var update = {}
                 update[`user`] = user
                 doc.ref.update(update)
               })
             })
      */
      // update user collection
      this.db.collection("users")
        .doc(user.id)
        .update(user)
    }

    remove(user) {
      console.log("UserService.removeUser")
      this.db.collection("users")
        .doc(user.id)
        .delete(user)
    }

    getTimestamp() {
      return 
    }

}