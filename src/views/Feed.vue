<template>
  <!-- list  -->
  <v-container class="my-5" fluid>
    <v-btn v-if="admin" @click="toAdminPage()" class="success">
      Interface ADMIN
    </v-btn>
    <!-- options -->
    <v-row align="center" justify="center" class="" app>
      <v-col v-for="(option, i) in options" :key="i" lg="2" xs="6">
        <v-select
          v-model="$data[option.model]"
          x-large
          :items="option.items"
          :label="option.title"
          :prepend-icon="option.icon"
          item-text="title"
          item-value="value"
          @change="change()"
        ></v-select>
      </v-col>
    </v-row>

    <v-row justify="space-around">
      <v-col lg="10">
        <v-row>
          <v-col
            cols="12"
            lg="6"
            md="6"
            xs="12"
            class="pa-5"
            v-for="(item, i) in items"
            :key="i"
          >
            <publication-card :item="item" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-navigation-drawer :drawer="true" app clipped fixed class="pt-16">
      <v-toolbar></v-toolbar>
      <v-toolbar flat>
        <v-list>
          <v-list-item v-for="(option, i) in options" :key="i" class="pt-10">
            <v-select
              :items="option.items"
              :prepend-icon="option.icon"
              :label="option.title"
            ></v-select>
          </v-list-item>
        </v-list>
      </v-toolbar>
    </v-navigation-drawer>

    <v-pagination
      class="pt-5"
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
          model: "sort",
          title: "Trier",
          items: [
            { title: "Le plus récent", value: "latest" },
            { title: "Le plus ancien", value: "oldest" },
            { title: "Par défaut", value: "default" },
          ],
          icon: "mdi-sort",
        },

        {
          model: "category",
          title: "Choisir la catégorie",
          items: this.$store.getters.categories,
          icon: "mdi-feature-search",
        },
        {
          model: "town",
          title: "Ville-Commune",
          items: [
            "Raismes",
            "Bruay-sur-l'Escaut",
            "Beuvrages",
            "Anzin",
            "Petite Forêt",
            "Escaupont",
            "Fresnes-sur-l'Escaut",
          ],
          icon: "mdi-map-marker",
        },
      ],
      page: 1,
      town: "Raismes",
      sort: "latest",
      category: "Ménagers",
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
    change() {
      console.log(
        "sort=",
        this.sort,
        ", page=",
        this.page,
        ", categ=",
        this.category
      );
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
    // set parameters from url
    /*
    if (this.$route.page) {
      this.page = this.$route.page
    }
    if (this.$route.town) {
      this.town = this.$route.town
    } */
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
#styled-input {
  height: 40px;
  font-size: 20pt;
}
.styled-input label[for] {
  height: 40px;
  font-size: 20pt;
}
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
