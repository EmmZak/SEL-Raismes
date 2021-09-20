import { db } from "./../../firebaseConfig";
import { collection, query, where, doc, getDoc, getDocs, addDoc,updateDoc, deleteDoc } from "@firebase/firestore";

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
        await addDoc(collection(db, "publications"), publication)
      } else {
        await updateDoc(doc(db, "publications", publication.id), publication)
      }
    },
    async deletePublication({ commit }, item) {
      await deleteDoc(doc(db, "publications", item.id))
    },
    async fetchPublications({ commit }) {
      console.log("fetching publications");
      let pubs = [];

      const q = query(collection(db, "publications"))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        var pub = doc.data();
        pub.id = doc.id;
        pubs.push(pub);
      })
      commit("setPublications", pubs);
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
