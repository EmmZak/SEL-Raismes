<template>
  <!-- list  -->
  <v-container class="my-5" fluid>
    <v-btn v-if="admin" @click="toAdminPage()" class="success">
      Interface ADMIN
    </v-btn>

    <!-- options -->
    <v-row align="center">
      <v-col v-for="(option, i) in options" :key="i" cols="12" lg="2">
        <v-select
          :items="option.items"
          :label="option.title"
          :prepend-icon="option.icon"
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="6" md="6" xs="12" class="pa-5" v-for="(item, i) in items" :key="i">
        <publication-card :item="item" />
      </v-col>
    </v-row>

    <v-navigation-drawer clipped class="red">
      <v-list>
        <v-list-item v-for="(option, i) in options" :key="i">
          <v-select
            :items="option.items"
            :label="option.title"
            :prepend-icon="option.icon"
          ></v-select>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-pagination
      v-model="page"
      :length="nbPages"
      :page="page"
      :total-visible="5"
    ></v-pagination>
  </v-container>
</template>

<script>
//import DateHandler from './../helperFunctions/DateHandler'
//import { mapGetters } from 'vuex'
import { mapActions } from "vuex";
import PublicationCard from "./../components/PublicationCard.vue";

export default {
  name: "Feed",

  data() {
    return {
      options: [
        {
          title: "Trier",
          items: ["Le plus récent", "Le plus ancien", "Par défaut"],
          icon: "mdi-sort",
        },
        {
          title: "Choisir la catégorie",
          items: this.$store.getters.categories,
          icon: "mdi-feature-search",
        },
      ],
      sortItems: ["Le plus récent", "Le plus ancien", "Par défaut"],
      page: 1,
      nbItems: 2,
      admin: false,
    };
  },
  components: {
    PublicationCard,
  },
  methods: {
    ...mapActions(["fetchUser, fetchPublications"]),
    toAdminPage() {
      this.$router.push("/admin");
    },
  },
  computed: {
    nbPages() {
      if (this.items.length <= this.nbItems) {
        return 1;
      }
      let n = this.items.length / this.nbItems;
      if (n % 2 != 0) {
        return (n | 0) + 1;
      }
      console.log("n -> ", n);
      return n;
    },
    items() {
      //var arr = [this.$store.getters.publications[0]]
      //var arr = this.$store.getters.publications;
      var arr = this.$store.getters.items;
      console.log("returning item arr", arr);
      return arr;
    },
  },
  async mounted() {
    //await this.fetchPublications();

    // check if auth user
    //await this.fetchUser();

    // check if user is admin
    let storeUser = this.$store.getters.actualUser;
    console.log("Feed.actualUser", storeUser);
    if (storeUser.admin) {
      this.admin = true;
    }
  },
};
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
