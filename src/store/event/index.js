import { Firestore } from "./../../firebaseConfig";

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
      event.date = new Date();

      if (event.id == null) {
        await Firestore.collection("events").add(event);
      } else {
        await Firestore.collection("events")
          .doc(event.id)
          .update(event);
        /* local
        var pubObject = state.events.find(item => item.id == pub.id)
        var index = state.events.indexOf(pubObject)
        Object.assign(state.events[index], pub) 
        */
      }
    },
    async deleteEvent({ commit }, item) {
      await Firestore.collection("events")
        .doc(item.id)
        .delete(item);
      /*  
      state.events = state.events.filter(function(event) {
        return event.id != item.id;
      });
      */
    },
    async fetchEvents({ commit }) {
      console.log("fetching events");
      let events = [];
      await Firestore.collection("events").doc("eventsDoc")
        .get()
        .then((doc) => {
          console.log("doc data", doc.data())
          events = doc.data().eventsList
          commit("setEvents", events);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
  getters: {
    events(state) {
      return state.events;
    },
  },
};
