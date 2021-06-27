<template>

    <ul id="example-1">
        <li v-for="(pub, i) in pubs" :key="i">
            {{ pub }}
        </li>
    </ul> 

</template>

<script>
import firebase from '../firebaseConfig';
const db = firebase.firestore();

export default {
    name: "Publications",

    data() {
        return {
            pubs: []
        };
    },
    mounted() {
        this.getPubs();
    },
    methods: {
      getPubs() {
        db.collection("offres")
          .get()
          .then((query) => {
            query.forEach((doc) => {
              console.log("doc.id => ", doc.id);
              this.pubs.push(doc.data());
            })
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        
        db.collection("demandes")
          .get()
          .then((query) => {
            query.forEach((doc) => {
              console.log("doc.id => ", doc.id);
              this.pubs.push(doc.data());
            })
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });

      }
    }
}
</script>
