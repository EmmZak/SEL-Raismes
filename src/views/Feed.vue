<template>
<!-- list  -->
<v-layout>
  
  <v-container class="pt-10">
    <v-btn @click="signOut()">Se Deconnecter</v-btn>
    <v-btn 
      v-if="admin" 
      @click="toAdminPage()"
      class="success"
    > 
      Interface ADMIN 
    </v-btn>
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
</v-layout>

  
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
      admin: false
    }
  },
  components: {
    PublicationCard
  },
  methods: {
    ...mapActions(["fetchPublications"]),
    async signOut() {
      try { 
        await this.$store.dispatch('signOut')
        this.$router.push('/')  
      } catch(error) {
        console.log("signout error", error)
      }
    },
    toAdminPage() {
      this.$router.push('/admin')
    }
  },
  computed: {
    items() {
      //var arr = [this.$store.getters.publications[0]]
      var arr = this.$store.getters.publications
      console.log("retuining item arr", arr)
      return arr
    },
  },
  async created() {
    await this.fetchPublications()
    // check if user is admin
    let storeUser = this.$store.getters.actualUser
    console.log("storeUser", storeUser)
    if (storeUser.admin) {
      this.admin = true
    }
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
