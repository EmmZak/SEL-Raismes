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
    :items="publications"
    :search="search"
  ></v-data-table>
</v-card>

</template>

<script>
import DateHandler from './../helperFunctions/DateHandler'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    name: "PublicationsList",
    mixins: [DateHandler],
    data() {
        return {
            search: "",
            //publications: [],
            headers: [
              { text: "Catégorie", value: "categ" },
              { text: "Prestataire", value: "user" },
              { text: "Crénaux", value: "slots" },
              { text: "Date", value: "date" },
              { text: "Coût", value: "cost" },
              { text: "Actions" },  
            ]
        };
    },
    methods: {
      ...mapActions(["fetchPublications"])
    },
    computed: mapGetters(["publications"]),
    created() {
      this.fetchPublications()
    }
}
</script>
