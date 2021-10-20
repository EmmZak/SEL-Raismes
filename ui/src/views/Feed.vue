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

    <v-btn v-if="admin" @click="toAdminPage()" class="success">
      Interface ADMIN
    </v-btn>

    <!-- sort options -->
    <v-row class="" justify="space-around">
      <v-col cols="12" lg="3">
        <v-text-field
          v-model="search"
          label="Recherche"
          @input="filterItems()"
        ></v-text-field>
      </v-col>
      <v-col lg="3">
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
      <v-col lg="3">
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
    <v-row justify="center">
      <v-col lg="11">
        <div class="text-lg-h4 text-md-h5 text-sm-h6">
          <div class="title-font pb-10 text-left">
            {{ services.length }} offre(s) disponible(s) pour votre recherche
          </div>
        </div>

        <v-row>
          <v-col>
            <v-btn class="primary" @click="dialog = true">
              <v-icon>mdi-plus</v-icon>
              <span>Nouvelle Publication</span>
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="">
          <!-- crud dialog -->
          <v-dialog v-model="dialog" max-width="800px">
            <v-card>
              <!-- form -->
              <v-card-text>
                <v-form ref="publicationFormFeed">
                  <v-row class="pa-0">
                    <v-col>
                      <v-row>
                        <v-col class="">
                          <v-card-title class="pl-0">
                            <span class="text-h4">Création Publication</span>
                          </v-card-title>
                        </v-col> </v-row
                      ><v-row>
                        <v-col>
                          <v-select
                            :items="categories"
                            item-text="name"
                            label="Catégorie"
                            v-model="editedItem.category"
                            prepend-icon="mdi-shape"
                            :rules="requiredRules"
                          ></v-select>
                        </v-col>
                        <v-col>
                          <v-textarea
                            v-model="editedItem.description"
                            label="Description ..."
                            prepend-icon="mdi-info"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row class="pt-0 pb-0">
                    <v-col class="pt-0">
                      <v-card-title class="pa-0">
                        <span class="text-h4">Séliste</span>
                      </v-card-title>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-col>
                        <v-autocomplete
                          :items="users"
                          v-model="editedItem.userId"
                          label="Séliste"
                          prepend-icon="mdi-account"
                          :item-text="
                            (user) =>
                              `${user.name}, ${user.surname}, ${user.mail}, ${user.number}, ${user.town.name}, ${user.town.code}`
                          "
                          item-value="id"
                          :rules="requiredRules"
                        ></v-autocomplete>
                        <!-- <v-select
                          :items="users"
                          :item-text="
                            (user) =>
                              `${user.name}, ${user.surname}, ${user.mail}, ${user.number}, ${user.credit}, ${user.town.name}, ${user.town.code}`
                          "
                          label="Séliste"
                          v-model="editedItem.user"
                          prepend-icon="mdi-shape"
                          :rules="requiredRules"
                        ></v-select> -->
                      </v-col>
                    </v-col>
                  </v-row>
                  <!-- Field notation
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.user.name"
                        label="Prénom"
                        prepend-icon="mdi-account"
                        :rules="requiredRules"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.user.surname"
                        label="Nom"
                        prepend-icon="mdi-account"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.user.mail"
                        label="E-mail"
                        prepend-icon="mdi-email"
                        :rules="emailRules"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.user.number"
                        label="Numéro"
                        prepend-icon="mdi-phone"
                      ></v-text-field>
                    </v-col>
                  </v-row> -->
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Annuler
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Enregistrer
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- delete dialog -->
          <v-dialog v-model="deleteDialog" max-width="500px">
            <v-card>
              <v-card-title class="text-h10"
                >Vous êtes sûr de vouloir supprimer l'annonce ?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Annuler</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
            <v-card elevation="0" class="pb-1">
              <v-row>
                <v-col>
                  <v-btn class="primary" @click="editItem(service)">
                    <v-icon>mdi-pencil</v-icon>
                    <span>Modifier</span> </v-btn
                  ><v-btn class="error" @click="deleteItem(service)">
                    <v-icon>mdi-delete</v-icon>
                    <span>Supprimer</span>
                  </v-btn></v-col
                >
              </v-row>
            </v-card>
            <!-- item -->
            <publication-card :item="service" :visit="visit" />
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
//import { findPublications } from "./../store/firebaseService";
import { mapActions } from "vuex";
import PublicationCard from "./../components/PublicationCard.vue";
import {
  requiredRules,
  emailRules,
  numberRules,
  sortOptions,
} from "./../store/globals";
import { isConnected } from "./../store/firebaseService";

import { getCategories } from "./../services/category";
import { getServices, getCount, createService, updateService, deleteService } from "./../services/service";
import { getUsers } from "./../services/user";

export default {
  name: "Feed",

  data() {
    return {
      // Form
      requiredRules: requiredRules,
      emailRules: emailRules,
      numberRules: numberRules,
      categories: [],
      // Form dialog
      dialog: false,
      deleteDialog: false,
      // crud objects
      editedIndex: -1,
      editedItem: {
        id: null,
        category: "",
        description: "",
        userId: "",
      },
      actualItemBackup: {
        id: null,
        category: "",
        description: "",
        userId: "",
      },
      defaultItem: {
        id: null,
        category: "",
        description: "",
        userId: "",
      },
      itemToDelete: {},
      // other
      pagination: {
        page: 1,
        offset: 0,
        limit: 10,
        order: "desc",
        categories: [],
      },
      visit: false,
      sortOptions: sortOptions,
      inDev: false,
      page: 1,
      townList: [],
      sort: "desc",
      selectedCategories: [],
      itemsPerPage: 10,
      search: "",
      admin: false,
      //items: [],
      users: [],
      services: [],
      count: 0,
    };
  },
  components: {
    PublicationCard,
  },
  methods: {
    test() {
      console.log("this.editedItem", this.editedItem);
    },
    ...mapActions(["fetchUser", "fetchPublications", "fetchCategories"]),
    toAdminPage() {
      this.$router.push("/admin");
    },
    filterItems() {
      console.log("search ", this.search);
    },
    // crud
    async save() {
      console.log("this refs", this.$refs);
      if (!this.$refs.publicationFormFeed.validate()) {
        // console.log(
        //   "mail-number",
        //   this.editedItem.user.mail,
        //   this.editedItem.user.number
        // );
        return;
      }
      this.processing = true;

      console.log("this.editedItem", this.editedItem);

      if (this.editedItem.id) {
        await updateService(this.editedItem);
      } else {
        await createService(this.editedItem);
      }
      await this.loadServices();

      //   // add creation date for sorting
      //   this.editedItem["createdOn"] = new Date();
      //   try {
      //     await this.$store.dispatch("savePublication", {
      //       publication: this.editedItem,
      //       backup: this.actualItemBackup,
      //     });
      //   } catch (err) {
      //     console.log("try-catch", err);
      //   }

      this.processing = false;
      this.close();
    },
    async editItem(item) {
      // backup
      this.actualItemBackup = { ...item };
      console.log("editItem.item", item);
      console.log("backup.item", this.actualItemBackup);

      this.editedIndex = this.items.indexOf(item);
      //this.editedItem = Object.assign({}, item);
      this.editedItem = { ...item, user: { ...item.user } };
      this.dialog = true;
    },
    deleteItem(item) {
      //console.log("deleteItem.item", item)
      this.itemToDelete = item;
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.deleteDialog = true;
    },
    async deleteItemConfirm() {
      try {
        //await this.$store.dispatch("deletePublication", this.itemToDelete);
      } catch (err) {
        console.log(err);
      }
      //reload
      console.log("reloading items");
      await this.loadServices();
      console.log("reloaded items");

      this.itemToDelete = {};
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      //this.editedItem = {}
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    closeDelete() {
      // cancel deleting
      //console.log("closeDelete")
      this.deleteDialog = false;
      this.close();
    },

    // load services
    async loadServices() {
      this.$refs.categSelect.blur();
      this.pagination.categories =
        this.selectedCategories.length == 0
          ? this.categories.map((e) => e.name)
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
    this.categories = this.$store.getters.categories;
    console.log("FEED.categories", this.categories);

    await this.loadServices();
    await this.loadUsers();

    let res = await getCount();
    console.log("feed.count", res);
    this.count = res.data;
  },
  computed: {
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
    towns() {
      console.log("returning towns");
      return this.$store.getters.towns;
    },
    items() {
      let a = this.$store.getters.publications;
      //console.log("returning publivations", a)
      // return [...a, ...a, ...a, ...a, ...a, ...a, ...a, ...a, ...a, ...a];
      return a;
    },
    isVisitor() {
      return this.$store.getters.visitor;
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
