import { Firestore } from "./../../firebaseConfig";

export default {
  state: {
    publications: [],
  },
  mutations: {
    setPublications(state, value) {
      state.publications = value;
    },
  },
  actions: {
    // data = {publication: publication, backup: backup}
    async savePublication({ commit }, data) {
      let publication = data.publication;
      publication.date = new Date();

      if (publication.id == null) {
        await Firestore.collection("publications").add(publication);
      } else {
        await Firestore.collection("publications")
          .doc(publication.id)
          .update(publication);
        /* local
        var pubObject = state.publications.find(item => item.id == pub.id)
        var index = state.publications.indexOf(pubObject)
        Object.assign(state.publications[index], pub) 
        */
      }
    },
    async deletePublication({ commit }, item) {
      await Firestore.collection("publications")
        .doc(item.id)
        .delete(item);
      /*  
      state.publications = state.publications.filter(function(pub) {
        return pub.id != item.id;
      });
      */
    },
    async fetchPublications({ commit }) {
      console.log("fetching publications");
      let pubs = [];
      await Firestore.collection("publications")
        .get()
        .then((query) => {
          query.forEach((doc) => {
            var pub = doc.data();
            pub.id = doc.id;
            pubs.push(pub);
          });
          commit("setPublications", pubs);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
  getters: {
    publications(state) {
      return state.publications;
    },
  },
};
