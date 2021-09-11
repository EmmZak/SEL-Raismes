import { Firestore } from "./../../firebaseConfig";

export default {
  state: {
    categories: ["Tout", "Animaux", "Cuisine", "Jardinage", "Ménagers", "OTHER"],
    publications: [],

    items: [
      { categ: "Animaux", user: {}, cost: "5", slots: [], date: new Date() },
      { categ: "Cuisine", user: {}, cost: "60", slots: [], date: new Date() },
      {
        categ: "Jardinage",
        user: {},
        cost: "50",
        slots: [],
        date: new Date(),
      },
      {
        categ: "Ménagers",
        user: {},
        cost: "20",
        slots: [],
        date: new Date(),
      },
      { categ: "Animaux", user: {}, cost: "30", slots: [], date: new Date() },
      { categ: "Cuisine", user: {}, cost: "45", slots: [], date: new Date() },
      {
        categ: "Jardinage",
        user: {},
        cost: "78",
        slots: [],
        date: new Date(),
      },
      {
        categ: "Ménagers",
        user: {},
        cost: "99  ",
        slots: [],
        date: new Date(),
      },
    ],
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
      //publication.date = new Date();

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
    items(state) {
      return state.items
    },
    categories(state) {
      return state.categories
    }
  },
};
