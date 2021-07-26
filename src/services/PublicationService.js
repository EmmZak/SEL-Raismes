import firebase from '../firebaseConfig';

export default class Publication {

    constructor() {
        this.db = firebase.firestore();
    }

    get(id) {
        this.db.collection("publications")
          .doc(id)
          .get()
          .then((res) => {
            return res.data()
          })
          .catch((err) => {
            console.log("getPublication.err ", err)
            return {}
          })
    }

    getAll() {
        //var pubs = []
        return this.db.collection("publications")
          .get()
        /*
          .then((query) => {
            query.forEach((doc) => {

              var pub = doc.data()
              pub["id"] = doc.id
              //user.date = this.formatDDMMYYYY(user.date)
              pubs.push(pub)
            })
            console.log("getAll() fethcing done in then")
            return pubs
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        console.log("PublicationService.returning")
        return pubs
        */
    }

    create(item) {
      return this.db.collection("publications")
        .add(item)
    }

    /**
     * publication.id is the ID of generated document
     */
    update(item) {
        this.db.collection("publications")
        .doc(item.id)
        .update(item)
    }

    async updateUser(user) {
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
    }

    remove(item) {
        this.db.collection("publications")
        .doc(item.id)
        .delete(item)
    }

}