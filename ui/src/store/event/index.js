import { db } from "./../../firebaseConfig";
import { collection, query, doc, getDocs, addDoc,updateDoc, deleteDoc } from "@firebase/firestore";
import { getEvents } from "./../../services/event"
const print = console.log
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
		let events = [];
		await getEvents()
			.then((res) => {
				//print("store.events", res.data)
				events = res.data
				commit("setEvents", events);
			})
			.catch((err) => {
				print("store.err", err)
			})

    //   const q = query(collection(db, "events"))
    //   const querySnapshot = await getDocs(q)
    //   querySnapshot.forEach((doc) => {
    //     var e = doc.data()
    //     e.id = doc.id
    //     events.push(e)
    //   })
      
    },
  },
  modules: {},
  getters: {
    events(state) {
      return state.events;
    },
  },
};
