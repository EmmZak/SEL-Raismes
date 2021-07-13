<template>
<!-- list  -->
<v-container class="grey lighten-5">
  <v-row>
    <v-col v-for="(item,i) in items" :key="i" cols="3">
      <v-card class="publication_card">
        <v-img class="categ_image"
          :src="require(`@/assets/${item.categ}.jpg`)"
        ></v-img>

        <v-row >
          <v-col md="8">
            <v-card-title>
              {{ item.categ }}
            </v-card-title>
          </v-col>
          <v-col >
            <v-card-title>
              <span class="amber--text accent-3">
                $ {{ item.cost }}
              </span> 
            </v-card-title>
          </v-col>
        </v-row>




        <v-card-title>Disponibilités</v-card-title>

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
          <v-card-actions>
            
            <v-list-item class="">
              <v-list-item-avatar color="grey darken-3" >
                <v-img
                  class="elevation-6"
                  alt=""
                  :src="require(`@/assets/avatars/${item.user.gender}.png`)"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title> {{ item.user.fullName.split(" ")[0] }} </v-list-item-title> 
              </v-list-item-content>
              <v-list-item-content>
                <v-icon large>
                  mdi-phone
                </v-icon>
              </v-list-item-content>
            </v-list-item>
          </v-card-actions>
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
  max-width: 300px;
}

.categ_image {
  max-height: 150px;
  max-width: 300px;
}

.v-card--reveal {
align-items: center;
bottom: 0;
justify-content: center;
opacity: .9;
position: absolute;
width: 100%;
}
</style>