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
    async savePublication({ commit }, item) {
      if (item.date == null) {
        item.date = new Date();
      }

      await Firestore.collection("publications").add(item);
    },
    async updatePublication({ commit }, data) {
      let item = data.publication;
      //let backup = data.backup

      if (item.date == null) {
        item.date = new Date();
      }
      /* local
      var pubObject = state.publications.find(item => item.id == pub.id)
      var index = state.publications.indexOf(pubObject)
      Object.assign(state.publications[index], pub) 
      */
      await Firestore.collection("publications")
        .doc(item.id)
        .update(item);
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
    fetchPublications({ commit }) {
      console.log("fetching publications");
      let pubs = [];
      Firestore.collection("publications")
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
