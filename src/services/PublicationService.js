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
            console.log("getUser.err ", err)
            return {}
          })
    }

    getAll() {
        var pubs = []
        this.db.collection("publications")
          .get()
          .then((query) => {
            query.forEach((doc) => {

              var pub = doc.data()
              pub["id"] = doc.id
              //user.date = this.formatDDMMYYYY(user.date)
              pubs.push(pub)
            })

          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        return pubs
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

    remove(item) {
        this.db.collection("publications")
        .doc(item.id)
        .delete(item)
    }

}