import { Firestore } from "./../../firebaseConfig";

/*

Information
Venez nous rencontrer cette semaine lors des permanences du Troc d'heures raismois. RDV le mercredi 21 juillet de 15 à 17 h ou le jeudi 22 juillet de 9h30 à 11h30 (rez-de-chaussée de la mairie annexe de Sabatier, rue Léopold Dussart).

Inscription
Le Troc d'heures raismois prend ses vacances d'été jusqu'au lundi 30 août. Nous vous retrouverons donc dès la rentrée pour les permanences de septembre : - Mercredi 1er septembre 15h-17h - Mercredi 8 septembre 15h-17h.

*/ 

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
      await Firestore.collection("events")
        .get()
        .then((query) => {
          query.forEach((doc) => {
            var e = doc.data()
            e.id = doc.id
            events.push(e)
          })
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
