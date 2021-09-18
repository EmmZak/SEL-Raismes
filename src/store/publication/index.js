import { Firestore } from "./../../firebaseConfig";

export default {
  state: {
    sortOptions: [
      { title: "Le plus récent", value: "latest" },
      { title: "Le plus ancien", value: "oldest" },
      { title: "Par défaut", value: "default" },
    ],
    categories: ["Tout", "Garde d'Animaux", "Aide en cuisine", "Aide au jardinage", "Coup de main ménager", "OTHER"],
    publications: [],
    items: [],
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
    sortOptions(state) {
      return state.sortOptions
    },  
    publications(state) {
      return state.publications;
    },
    items(state) {
      return state.items
    },
    categories(state) {
      return state.categories
    }
  },
};
