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

    <!-- options  -->
    <v-row
      v-if="$vuetify.breakpoint.xs"
      align="center"
      justify="space-around"
      class=""
    >
      <v-col>
        <v-select
          v-model="sort"
          :items="sortOptions"
          prepend-icon="mdi-sort"
          label="Trier"
          item-text="title"
          item-value="value"
          @change="loadItems()"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          ref="categSelect"
          chips
          v-model="categList"
          :items="categories"
          prepend-icon="mdi-feature-search"
          label="Choisir la catégorie"
          item-text="title"
          item-value="value"
          @change="loadItems()"
          multiple
        ></v-select
      ></v-col>
    </v-row>

    <!-- sort options -->
    <v-row>
      <v-col>
        <v-select
          v-model="sort"
          :items="sortOptions"
          prepend-icon="mdi-sort"
          label="Trier"
          item-text="title"
          item-value="value"
          @change="loadItems()"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          ref="categSelect"
          chips
          v-model="categList"
          :items="categories"
          prepend-icon="mdi-feature-search"
          label="Choisir la catégorie"
          item-text="title"
          item-value="value"
          @change="loadItems()"
          multiple
        ></v-select>
      </v-col>
    </v-row>

    <!-- items rendering -->
    <v-row justify="center">
      <v-col lg="11">
        <div class="text-lg-h4 text-md-h5 text-sm-h6">
          <div class="title-font pb-10 text-left">
            {{ items.length }} offre(s) disponible(s) pour votre recherche
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
                            label="Catégorie"
                            v-model="editedItem.categ"
                            prepend-icon="mdi-shape"
                            :rules="requiredRules"
                          ></v-select>
                        </v-col>
                        <v-col>
                          <v-textarea
                            v-model="editedItem.desc"
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
                  </v-row>
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
            v-for="(item, i) in items"
            :key="i"
          >
            <!-- crud actions -->
            <v-card elevation="0" class="pb-1">
              <v-row>
                <v-col>
                  <v-btn
                    class="primary"
                    @click="(dialog = true), (editedItem = item)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                    <span>Modifier</span> </v-btn
                  ><v-btn
                    class="error"
                    @click="(deleteDialog = true), (itemToDelete = item)"
                  >
                    <v-icon>mdi-delete</v-icon>
                    <span>Supprimer</span>
                  </v-btn></v-col
                >
              </v-row>
            </v-card>
            <!-- item -->
            <publication-card :item="item" :visit="visit" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- pagination
    <v-pagination
      v-if="this.items.length > 0"
      class="pt-5"
      v-model="page"
      :length="nbPages"
      :page="page"
      :total-visible="5"
    ></v-pagination>  -->
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
  categories,
} from "./../store/globals";
import { isConnected } from "./../store/firebaseService";

export default {
  name: "Feed",

  data() {
    return {
      // Form
      requiredRules: requiredRules,
      emailRules: emailRules,
      numberRules: numberRules,
      categories: categories,
      // Form dialog
      dialog: false,
      deleteDialog: false,
      // crud objects
      editedIndex: -1,
      editedItem: {
        id: null,
        categ: "",
        desc: "",
        user: {
          name: "",
          number: "",
          mail: "",
        },
      },
      actualItemBackup: {
        id: null,
        categ: "",
        desc: "",
        user: {
          name: "",
          number: "",
          mail: "",
        },
      },
      defaultItem: {
        id: null,
        categ: "",
        desc: "",
        user: {
          name: "",
          number: "",
          mail: "",
        },
      },
      itemToDelete: {},
      // other
      visit: false,
      sortOptions: sortOptions,
      inDev: false,
      page: 1,
      townList: [],
      sort: "desc",
      categList: [],
      nbItems: 2,
      admin: false,
      //items: [],
    };
  },
  components: {
    PublicationCard,
  },
  methods: {
    test() {
      console.log("feed store visitor", this.isVisitor);
    },
    ...mapActions(["fetchUser", "fetchPublications"]),
    toAdminPage() {
      this.$router.push("/admin");
    },
    async loadItems() {
      //console.log("laoding items");
      // close select menu
      this.$refs.categSelect.blur();

      let categList = [];
      if (this.categList.length == 0) {
        categList = categories;
      } else {
        categList = this.categList;
      }
      // console.log(
      //   "sort=",
      //   this.sort,
      //   ", page=",
      //   this.page,
      //   ", categ=",
      //   categList,
      //   categList.length
      // );
      //console.log("geetting items categlist", categList);
      //this.items = await findPublications(this.sort, categList);
      await this.fetchPublications({
        sort: this.sort,
        categList: categList,
      });
      //console.log("returned publications ", this.items);
    },
    // crud
    async save() {
      console.log("this refs", this.$refs);
      if (!this.$refs.publicationFormFeed.validate()) {
        console.log(
          "mail-number",
          this.editedItem.user.mail,
          this.editedItem.user.number
        );
        return;
      }
      this.processing = true;
      // add creation date for sorting
      this.editedItem["createdOn"] = new Date();
      try {
        await this.$store.dispatch("savePublication", {
          publication: this.editedItem,
          backup: this.actualItemBackup,
        });
      } catch (err) {
        console.log("try-catch", err);
      }

      // reload
      await this.fetchPublications({
        sort: "asc",
        categList: categories,
      });

      this.processing = false;
      this.close();
    },
    async editItem(item) {
      // backup
      this.actualItemBackup = { ...item };
      console.log("editItem.item", item);
      console.log("backup.item", this.actualItemBackup);

      this.editedIndex = this.publications.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      //console.log("deleteItem.item", item)
      this.itemToDelete = item;
      this.editedIndex = this.publications.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.deleteDialog = true;
    },
    async deleteItemConfirm() {
      try {
        await this.$store.dispatch("deletePublication", this.itemToDelete);
      } catch (err) {
        console.log(err);
      }
      //reload
      console.log("reloading items");
      await this.loadItems();
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
  async mounted() {
    let user = isConnected();
    console.log("feeed.user ", user);
    if (user == null) {
      this.visit = true;
    }
    await this.loadItems();
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
</style>
