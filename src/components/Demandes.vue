<template>

    <ul id="example-1">
        <li v-for="(demande, i) in demandes" :key="i">
            {{ demande }}
        </li>
    </ul> 

</template>

<script>
import firebase from './../firebaseConfig';
const db = firebase.firestore();

export default {
    name: "Demandes",

    data() {
        return {
            demandes: []
        };
    },
    mounted() {
        this.getDemandes();
    },
    methods: {
      getDemandes() {
        db.collection("demandes")
          .get()
          .then((query) => {
            query.forEach((doc) => {
              console.log("doc.id => ", doc.id);
              this.demandes.push(doc.data());
            })
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
    }
}
</script>
