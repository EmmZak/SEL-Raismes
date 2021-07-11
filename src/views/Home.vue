<template>
<!-- list  -->
<v-container class="grey lighten-5">
  <v-row>
    <v-col v-for="(item,i) in items" :key="i" cols="3">
      <v-card>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        ></v-img>

        <v-card-title>{{ item.categ }}</v-card-title>

        <v-card-text>
          $ {{ item.cost }}
        </v-card-text>

        <v-card-title>Disponibilités</v-card-title>

        <v-card-text>
          <v-row>
            <v-chip-group
              v-for="(slot,i) in item.slots"
              :key="i"
              active-class="deep-purple accent-4 white--text"
              column
              flex
            >
            <v-col>
              <v-chip>
                {{ slot }}
              </v-chip>
            </v-col>
              
            </v-chip-group>
          </v-row>


        </v-card-text>

      </v-card>
    </v-col>
  </v-row>
</v-container>
  
</template>

<script>
//import DateHandler from './../helperFunctions/DateHandler'
//import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'Home',

  data() {
    return {
      
    }
  },
  components: {
  },
  methods: {
    ...mapActions(["fetchPublications"]),

  },
  computed: {
    items() {
      return this.$store.getters.publications
    },
  },
  mounted() {
    this.fetchPublications()
  }
  
}
</script>
