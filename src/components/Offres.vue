<template>

    <ul id="example-1">
        <li v-for="(offre, i) in offres" :key="i">
            {{ offre }}
        </li>
    </ul> 

</template>

<script>
import {Firestore} from './../firebaseConfig';

export default {
    name: "Offres",

    data() {
        return {
            offres: []
        };
    },
    mounted() {
        this.getOffres();
    },
    methods: {
      getOffres() {
        Firestore.collection("offres")
          .get()
          .then((query) => {
            query.forEach((doc) => {
              console.log("doc.id => ", doc.id);
              this.offres.push(doc.data());
            })
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
    }
}
</script>
