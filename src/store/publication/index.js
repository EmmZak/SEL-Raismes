import {
  //findPublication,
  findPublications,
  createPublication,
  updatePublication,
  removePublication,
} from "./../firebaseService";

export default {
  state: {
    sortOptions: [
      { title: "Le plus récent", value: "desc" },
      { title: "Le plus ancien", value: "asc" },
      /* No default order for now
      { title: "Par défaut", value: "" } */
    ],
    categories: [
      //"Tout",
      "Garde d'Animaux",
      "Aide en cuisine",
      "Aide au jardinage",
      "Coup de main ménager",
      //"OTHER",
    ],
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
        await createPublication(publication);
      } else {
        await updatePublication(publication);
      }
    },
    async deletePublication({ commit }, item) {
      await removePublication(item)
    },
    async fetchPublications({ commit }) {
      console.log("fetching publications");
      let pubs = await findPublications()
      commit("setPublications", pubs);
    },
  },
  modules: {},
  getters: {
    sortOptions(state) {
      return state.sortOptions;
    },
    publications(state) {
      return state.publications;
    },
    items(state) {
      return state.items;
    },
    categories(state) {
      return state.categories;
    },
  },
};
