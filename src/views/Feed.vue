<template>
<!-- list  -->
<v-container class="grey lighten-5">
  <v-row>
    <v-col v-for="(item,i) in items" :key="i" cols="3">
      <v-card class="publication_card">
        <v-img class="categ_image"
          :src="require(`@/assets/${item.categ}.jpg`)"
        ></v-img>

        <v-row justify="space-around">

          <v-card-title class="card-title">
            <span class="font-weight-light"> {{ item.categ }} </span>
          </v-card-title>

          <v-card-title class="card-cost">
            <span class="amber--text accent-3">
              $ {{ item.cost }}
            </span> 
          </v-card-title>
        </v-row>



        <v-card-title
          class="card-slots-text"
        >
          <span class="font-weight-light"> Disponibilités </span>
        </v-card-title>

        <!-- slots 
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
              <v-chip small>
                {{ slot }}
              </v-chip>
            </v-col>
              
            </v-chip-group>
          </v-row>
        </v-card-text> -->

        <!-- Info -->
        <v-divider></v-divider>

        <!-- info card -->
        <v-card>
          <v-row justify="center">
            <v-icon large>
              mdi-account-circle
            </v-icon>

            <v-card-title class="card-user-name"> 
              <span class="font-weight-light"> {{ item.user.fullName.split(" ")[0] }}  </span>
            </v-card-title>
 
            <v-icon medium>
              mdi-phone
            </v-icon>
          </v-row>
        </v-card>
        <!-- END info card -->
        
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
  name: 'Feed',

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

<style scoped>

.publication_card {
  max-width: 200px;
}

.categ_image {
  max-height: 150px;
  max-width: 300px;
}

.card-title {
  font-size: 1em;
}

.card-cost {
  font-size: 1em;
}

.card-slots-text {
  font-size: 1em;
}

.card-user-name {
  font-size: 1em;
}

</style>
