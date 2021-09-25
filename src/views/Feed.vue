<template>
  <!-- list  -->
  <v-container class="my-5 feed" fluid>
    <!-- NOTIF  -->
    <v-dialog v-model="dialog" persistent max-width="700">
      <v-card>
        <v-card-title class="text-h5">
          La page est actuellement en développement
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Fermer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn v-if="admin" @click="toAdminPage()" class="success">
      Interface ADMIN
    </v-btn>

    <!-- options
    <v-row align="center" justify="space-around" class="">
      <v-col v-for="(option, i) in options" :key="i" cols="12" lg="2">
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
    </v-row>  -->

    <v-row justify="center">
      <v-col v-if="!done" lg="11">
        <div class="text-lg-h4">
          <div class="title-font pb-10 text-left">
            {{ items.length }} offre(s) disponible(s) pour votre recherche
          </div>
        </div>
        <v-row class="">
          <v-col
            cols="12"
            lg="6"
            md="12"
            sm="12"
            xs="12"
            :class="{
              'pa-5': $vuetify.breakpoint.lg,
              'pa-2': $vuetify.breakpoint.xs,
            }"
            v-for="(item, i) in items"
            :key="i"
          >
            <publication-card :item="item" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- left app bar  -->
    <v-navigation-drawer
      :drawer="true"
      app
      clipped
      fixed
      :permanent="$vuetify.breakpoint.smAndUp"
      class="pt-16"
    >
      <v-toolbar></v-toolbar>
      <v-toolbar flat>
        <v-list>
          <v-list-item>
            <v-select
              v-model="sort"
              :items="this.$store.getters.sortOptions"
              prepend-icon="mdi-sort"
              label="Trier"
              item-text="title"
              item-value="value"
              @change="change()"
            ></v-select>
          </v-list-item>
          <v-list-item>
            <v-select
              v-model="categList"
              :items="this.$store.getters.categories"
              prepend-icon="mdi-feature-search"
              label="Choisir la catégorie"
              item-text="title"
              item-value="value"
              @change="change()"
              multiple
            ></v-select>
          </v-list-item>
          <!-- <v-list-item>
            <v-autocomplete
              v-model="townList"
              :items="$store.getters.towns"
              label="Ville - Code Postal"
              prepend-icon="mdi-home-city"
              :item-text="(town) => town.name + ', ' + town.code"
              return-object
              @change="change()"
              multiple
            ></v-autocomplete>
          </v-list-item> -->
        </v-list>
      </v-toolbar>
    </v-navigation-drawer>

    <v-pagination
      v-if="this.items.length > 0"
      class="pt-5"
      v-model="page"
      :length="nbPages"
      :page="page"
      :total-visible="5"
    ></v-pagination>
  </v-container>
</template>

<script>
import { findPublications } from './../store/firebaseService'
import { mapActions } from "vuex";
import PublicationCard from "./../components/PublicationCard.vue";

export default {
  name: "Feed",

  data() {
    return {
      dialog: false,
      done: false,
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
          items: this.categories,
          icon: "mdi-feature-search",
        },
        {
          model: "town",
          title: "Ville-Commune",
          items: this.towns,
          icon: "mdi-map-marker",
        },
      ],
      page: 1,
      townList: [],
      sort: "desc",
      categList: [],
      nbItems: 2,
      admin: false,
      items: []
    };
  },
  components: {
    PublicationCard,
  },
  methods: {
    ...mapActions(["fetchUser", "fetchPublications"]),
    toAdminPage() {
      this.$router.push("/admin");
    },
    async change() {
      let categList = [];
      if (this.categList.length == 0) {
        categList = this.$store.getters.categories;
      } else {
        categList = this.categList
      }
      console.log(
        "sort=",
        this.sort,
        ", page=",
        this.page,
        ", categ=",
        categList,
        categList.length
      );
      console.log("geetting items")
      this.items = await findPublications(this.sort, categList)
      console.log("returned publications ", this.items)
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
    towns() {
      console.log("returning towns");
      return this.$store.getters.towns;
    },
    categories() {
      return this.$store.getters.categories;
    },
    // items() {
    //   let a = this.$store.getters.publications;
    //   //console.log("returning publivations", a)
    //   // return [...a, ...a, ...a, ...a, ...a, ...a, ...a, ...a, ...a, ...a];
    //   return a;
    // },
  },
  async mounted() {
    await this.change()
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
/* .feed {
  background: linear-gradient(
    34deg,
    rgba(233, 148, 224, 1) 0%,
    rgba(180, 215, 166, 1) 46%,
    rgba(0, 212, 255, 1) 100%
  );
} */

.feed {
  background-color: rgb(255, 255, 255);
  /* background: linear-gradient(
    34deg,
    rgba(233, 148, 224, 1) 0%,
    rgba(180, 215, 166, 1) 46%,
    rgba(0, 212, 255, 1) 100%
  ); */
}

.title-font {
  font-family: "Open Sans", sans-serif;
}

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
