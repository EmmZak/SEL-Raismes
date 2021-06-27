<template>

<v-card>
  <v-card-title>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
  </v-card-title>
  <v-data-table
    :headers="headers"
    :items="users"
    :search="search"
  ></v-data-table>
</v-card>

</template>

<script>
import firebase from './../firebaseConfig';
const db = firebase.firestore();

export default {
    name: "Users",

    data() {
        return {
            search: "",
            users: [],
            headers: [
              {
                text: "Nom", value: "nom"
              },
              {
                text: "Prénom", value: "prenom"
              },
              {
                text: "Adresse", value: "adresse"
              },
              {
                text: "Inscription", value: "date"
              },
              {
                text: "Crédit", value: "credit"
              },
              {
                text: "Action"
              },
            ]
        };
    },
    mounted() {
        this.getUsers();
    },
    methods: {
      getUsers() {
        db.collection("users")
          .get()
          .then((query) => {
            query.forEach((doc) => {
              console.log("doc.id => ", doc.id);
              this.users.push(doc.data());
            })
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
    }
}
</script>
