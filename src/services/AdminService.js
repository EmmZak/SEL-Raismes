import firebase from '../firebaseConfig';
//import messaging from 'firebase/messaging'
/*
 * BHq2BDIL9qZ_wate3SqLHT3Kvb1etAY8EWGmSxRttAnWA1ilDEe51pBWkFG8oT69fM0dvwIJBaHavENRxN9FkWk
 */

export default class Admin {

    constructor() {
        this.db = firebase.firestore();
        this.notifier = firebase.messaging();
    }

    publish() {

    }

    get(id) {
        this.db.collection("admins")
          .doc(id)
          .get()
          .then((res) => {
            return res.data()
          })
          .catch((err) => {
            console.log("getAdmin.err ", err)
            return {}
          })
    }

    getAll() {
        var admins = []
        this.db.collection("admins")
          .get()
          .then((query) => {
            query.forEach((doc) => {

              var admin = doc.data()
              admin["id"] = doc.id
              //user.date = this.formatDDMMYYYY(admin.date)
              admins.push(admin)
            })

          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        return admins
    }

    create(admin) {
      return this.db.collection("admins")
        .add(admin)
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
     * admin.id is the ID of generated document
     */
    update(admin) {
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
      this.db.collection("admins")
        .doc(admin.id)
        .update(admin)
    }

    remove(admin) {
      console.log("adminService.removeadmin")
      this.db.collection("admins")
        .doc(admin.id)
        .delete(admin)
    }

}