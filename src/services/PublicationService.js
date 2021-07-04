import firebase from '../firebaseConfig';

export default class Publication {

    constructor() {
        this.db = firebase.firestore();
    }

    getPublication(id) {
        return this.db.collection("publications")
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

    getPublications() {
        var publications = []

        this.db.collection("publications")
          .get()
          .then((query) => {
            query.forEach((doc) => {

              var pub = doc.data()
              //user.date = this.formatDDMMYYYY(user.date)
              publications.push(pub)
            })

          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        return publications
    }

    createPublication(item) {
        this.db.collection("publications")
          .doc()
          .set(item)
    }

    /**
     * publication.id is the ID of generated document
     */
    updatePublication(item) {
        this.db.collection("publications")
        .doc(item.id)
        .update(item)
    }

    removePublication(item) {
        this.db.collection("publications")
        .doc(item.id)
        .delete(item)
    }

}