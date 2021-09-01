<template>

    <ul id="example-1">
        <li v-for="(demande, i) in demandes" :key="i">
            {{ demande }}
        </li>
    </ul> 

</template>

<script>
import {Firestore} from './../firebaseConfig';

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
        Firestore.collection("demandes")
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
