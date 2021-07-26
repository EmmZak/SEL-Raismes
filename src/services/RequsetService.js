import firebase from '../firebaseConfig';

export default class Demande {

    constructor() {
        this.db = firebase.firestore();
    }

    get(id) {
        this.db.collection("demandes")
          .doc(id)
          .get()
          .then((res) => {
            return res.data()
          })
          .catch((err) => {
            console.log("getDemande.err ", err)
            return {}
          })
    }

    getAll() {
        //var demandes = []
        return this.db.collection("demandes")
          .get()
        
    }

    create(item) {
      return this.db.collection("demandes")
        .add(item)
    }

    /**
     * demande.id is the ID of generated document
     */
    update(item) {
        this.db.collection("demandes")
        .doc(item.id)
        .update(item)
    }

    async updateUser(user) {
      // update all demandes where user is referenced
      this.db.collection('demandes')
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
    }

    remove(item) {
        this.db.collection("demandes")
        .doc(item.id)
        .delete(item)
    }

}