import { db } from "./../../firebaseConfig";
import { collection, query, doc, getDocs, addDoc,updateDoc, deleteDoc } from "@firebase/firestore";

export default {
  state: {
    events: [],
  },
  mutations: {
    setEvents(state, value) {
      state.events = value;
    },
  },
  actions: {
    // data = {event: event, backup: backup}
    async saveEvent({ commit }, data) {
      let event = data.event;
      //event.date = new Date();
      if (event.id == null) {
        await addDoc(collection(db, "events"), event)
      } else {
        await updateDoc(doc(db, "events", event.id), event)
      }
    },
    async deleteEvent({ commit }, item) {
      await deleteDoc(doc(db, "events", item.id))
    },
    async fetchEvents({ commit }) {
      console.log("fetching events");
      let events = [];

      const q = query(collection(db, "events"))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        var e = doc.data()
        e.id = doc.id
        events.push(e)
      })
      commit("setEvents", events);
    },
  },
  modules: {},
  getters: {
    events(state) {
      return state.events;
    },
  },
};
