<template>
<!-- list  -->
<v-container class="pt-10">
  <v-row>
    <!-- 
    <v-col v-for="(item,i) in items" :key="i" cols="3">
      
      <publication-card :item="item" />

    </v-col>
     -->
    <v-col v-for="(item,i) in items" :key="i" cols="3">
      <publication-card :item="item" />
    </v-col>
  </v-row>
</v-container>
  
</template>

<script>
//import DateHandler from './../helperFunctions/DateHandler'
//import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import PublicationCard from './../components/PublicationCard.vue'

export default {
  name: 'Feed',

  data() {
    return {
      
    }
  },
  components: {
    PublicationCard
  },
  methods: {
    ...mapActions(["fetchPublications"]),

  },
  computed: {
    items() {
      //var arr = [this.$store.getters.publications[0]]
      var arr = this.$store.getters.publications
      console.log("retuining item arr", arr)
      return arr
    },
  },
  created() {
    this.fetchPublications()
  }
  
}
</script>

<style scoped>
/* 
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
} */

</style>
