<template>
  <!-- list  -->
  <v-container class="my-5 feed" fluid>
    <!-- <v-btn @click="test()">user hcekc</v-btn> -->
    <!-- NOTIF  -->
    <v-dialog v-model="inDev" persistent max-width="700">
      <v-card>
        <v-card-title class="text-h5">
          La page est actuellement en développement
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="inDev = false">
            Fermer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row justify="space-between" class="pr-5 pl-5 ">
      <v-btn text @click="signOut()" width="100%" class="error"> Déconnexion </v-btn>
    </v-row>

    <Account v-if="false" :user="{ name: 'manu' }" />

    <!-- sort options -->
    <v-row class="pt-5" justify="space-around">
      <v-col lg="4">
        <v-select
          v-model="pagination.order"
          :items="sortOptions"
          prepend-icon="mdi-sort"
          label="Trier"
          item-text="title"
          item-value="value"
          @change="loadServices()"
        ></v-select>
      </v-col>
      <v-col lg="6">
        <v-select
          ref="categSelect"
          chips
          v-model="selectedCategories"
          :items="categories"
          prepend-icon="mdi-feature-search"
          label="Choisir la catégorie"
          item-text="name"
          item-value="value"
          @change="loadServices()"
          multiple
        ></v-select>
      </v-col>
    </v-row>

    <!-- items rendering -->
    <ServiceDialog
      ref="crudDialog"
      :show="crudDialog"
      :users="users"
      :service="service"
      @crud-event="endCrudEvent"
    />

    <v-row justify="center">
      <v-col lg="11">
        <div class="text-lg-h4 text-md-h5 text-sm-h6">
          <div class="title-font pb-10 text-left">
            {{ services.length }} offre(s) disponible(s) pour votre recherche
          </div>
        </div>

        <v-row v-if="admin" justify="space-between">
          <v-btn class="primary" @click="startCrudEvent(null)">
            <v-icon>mdi-plus</v-icon>
            <span>Nouvelle Publication</span>
          </v-btn>
          <v-btn v-if="admin" @click="toAdminPage()" class="success">
            Gérer les utilisateurs
          </v-btn>
        </v-row>

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
            v-for="(service, i) in services"
            :key="i"
          >
            <!-- crud actions -->
            <v-card elevation="0" class="pb-1" v-if="admin">
              <v-row>
                <v-col>
                  <!-- <v-btn class="primary" @click="editItem(service)"> -->
                  <v-btn class="primary" @click="startCrudEvent(service)">
                    <v-icon>mdi-pencil</v-icon>
                    <span>Modifier</span> </v-btn
                  ><v-btn class="error" @click="deleteCrudEvent(service)">
                    <v-icon>mdi-delete</v-icon>
                    <span>Supprimer</span>
                  </v-btn></v-col
                >
              </v-row>
            </v-card>
            <!-- item -->
            <PublicationCard :item="service" :visit="visit" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-pagination
      v-if="this.services.length > 0"
      class="pt-5"
      v-model="pagination.page"
      :length="nbPages"
      :page="pagination.page"
      :total-visible="5"
    ></v-pagination>
  </v-container>
</template>

<script>
//import { mapActions } from "vuex";
import ServiceDialog from "./../components/dialog/ServiceDialog.vue";
import PublicationCard from "./../components/PublicationCard.vue";
import Account from "./../components/Account.vue";
//import { getCategories } from "./../services/category";
import { getServices, getCount } from "./../services/service";
import { getUsers } from "./../services/user";

export default {
  name: "Feed",
  components: {
    PublicationCard,
    Account,
    ServiceDialog,
  },
  data() {
    return {
      // Form dialog
      crudDialog: false,
      // service to pass as prop to dialog
      service: {
        id: null,
        category: "",
        description: "",
        userId: "",
      },
      defaultService: {
        id: null,
        category: "",
        description: "",
        userId: "",
      },
      // other
      pagination: {
        page: 1,
        offset: 0,
        limit: 10,
        order: "desc",
        categories: [],
      },
      visit: false,
      inDev: false,
      page: 1,
      townList: [],
      sort: "desc",
      selectedCategories: [],
      itemsPerPage: 10,
      search: "",
      //items: [],
      users: [],
      services: [],
      count: 0,
    };
  },
  methods: {
    startCrudEvent(service) {
      if (service != null) {
        this.service = { ...service };
      } else {
        this.service = { ...this.defaultService };
      }
      this.crudDialog = true;
    },
    async endCrudEvent() {
      await this.loadServices();
      this.service = { ...this.defaultService };
      this.crudDialog = false;
    },
    async deleteCrudEvent(service) {
      await this.$refs.crudDialog.deleteItem(service);
    },
    test() {
      console.log("this.editedItem", this.editedItem);
    },
    async signOut() {
      await this.$store.dispatch("signOutStore");
      this.goToPath("/");
    },
    toAdminPage() {
      this.goToPath("/users");
    },
    filterItems() {
      console.log("search ", this.search);
    },
    // load services
    async loadServices() {
      this.$refs.categSelect.blur();
      this.pagination.categories =
        this.selectedCategories.length == 0
          ? this.categories.map((e) => e.value)
          : this.selectedCategories;

      let items = await getServices(this.pagination);
      console.log("feed.services", items.data);
      this.services = items.data;
      //   await this.fetchPublications({
      //     sort: this.sort,
      //     selectedCategories: selectedCategories,
      //   });
    },
    // load users
    async loadUsers() {
      let items = await getUsers();
      console.log("feed users", items.data);
      this.users = items.data;
    },
  },
  async mounted() {
    await this.loadServices();
    await this.loadUsers();

    let res = await getCount();
    this.count = res.data;
  },
  computed: {
    admin() {
      const user = this.$store.getters.user;
      return user ? user.admin : false;
    },
    nbPages() {
      if (this.services.length <= this.pagination.limit) {
        return 1;
      }
      let n = this.services.length / this.pagination.limit;
      if (n % 2 != 0) {
        return (n | 0) + 1;
      }
      console.log("n -> ", n);
      return n;
    },
  },
};
</script>

<style scoped>
.feed {
  background-color: rgb(255, 255, 255);
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
</style>
