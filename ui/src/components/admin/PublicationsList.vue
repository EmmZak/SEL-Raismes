<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Rechercher"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="publications"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:[`item`]="{ item }">
      <publication-card :item="item" :visit="false" />
      </template>
      <!------------------------ Custom field rendering ------------------------>
      <!-- date column -->
      <template v-slot:[`item.date`]="{ item }">
        <span>{{ formatDDMMYYYY(item.date) }}</span>
      </template>
      <!-- slots column -->
      <template v-slot:[`item.startTime`]="{ item }">
        <span>{{ item.startTime }}h - {{ item.endTime }}h </span>
      </template>
      <!------------------------ Custom field rendering ------------------------>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Gestion de publications</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-btn @click="toPDF(this.publications)" class="red white--text">
            <v-icon>mdi-file-pdf-box</v-icon>Exporter</v-btn
          >
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nouvelle Publication
              </v-btn>
            </template>
            <v-card>
              <!-- form -->
              <v-card-text>
                <v-form ref="publicationForm">
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
                            :rules="rules"
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
                        :rules="numberRules"
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
          <v-dialog v-model="dialogDelete" max-width="500px">
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
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import PublicationCard from "./../../components/PublicationCard.vue";
//import { formatDDMMYYYY } from "./../../services/general"
//import { mapGetters } from 'vuex'
import { mapActions } from "vuex";
import {
  requiredRules,
  emailRules,
  numberRules,
  categories,
} from "./../../store/globals";

export default {
  name: "PublicationsList",
  components: {
    PublicationCard,
  },
  data() {
    return {
      // Form
      requiredRules: requiredRules,
      emailRules: emailRules,
      numberRules: numberRules,
      categories: categories,
      // Form dialog
      dialog: false,
      dialogDelete: false,
      search: "",
      loadedPublications: [],
      slots: [], //["8-9h", "9-10h", "10-11h", ""],
      headers: [
        // { text: "ID", value: "id" },
        { text: "Catégorie", value: "categ" },
        //{ text: "Séliste", value: "user" },
        //{ text: "Nom", value: "user.surname" },
        { text: "Prénom", value: "user.name" },
        { text: "Numéro", value: "user.number" },
        { text: "E-mail", value: "user.mail" },
        { text: "Description", value: "desc" },
        //{ text: "Adresse", value: "adresse" },
        //{ text: "Crénaux", value: "startTime" },
        //{ text: "Date", value: "date" },
        //{ text: "Coût", value: "cost" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        id: null,
        categ: "",
        desc: "",
        user: {
          name: "",
          //surname: "",
          number: "",
          mail: "",
        },
        //adresse: "",
        //startTime: null,
        //endTime: null,
        //date: null,
        //cost: "",
      },
      actualItemBackup: {
        id: null,
        categ: "",
        desc: "",
        user: {
          name: "",
          //surname: "",
          number: "",
          mail: "",
        },
        //adresse: "",
        // startTime: null,
        // endTime: null,
        // date: null,
        // cost: "",
      },
      defaultItem: {
        id: null,
        categ: "",
        desc: "",
        user: {
          name: "",
          //surname: "",
          number: "",
          mail: "",
        },
        //adresse: "",
        // startTime: null,
        // endTime: null,
        // slots: "",
        // date: null,
        // cost: "",
      },
      itemToDelete: {},
      processing: false,
      sort: "asc",
    };
  },
  methods: {
    ...mapActions(["fetchUsers", "fetchPublications"]),
    async save() {
      if (!this.$refs.publicationForm.validate()) {
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
    // UPDATE
    async editItem(item) {
      // backup
      this.actualItemBackup = { ...item };
      console.log("editItem.item", item);
      console.log("backup.item", this.actualItemBackup);

      this.editedIndex = this.publications.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    // DELETE
    deleteItem(item) {
      //console.log("deleteItem.item", item)
      this.itemToDelete = item;
      this.editedIndex = this.publications.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      try {
        await this.$store.dispatch("deletePublication", this.itemToDelete);
      } catch (err) {
        console.log(err);
      }
      //reload
      await this.fetchPublications();

      this.itemToDelete = {};
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    closeDelete() {
      // cancel deleting
      //console.log("closeDelete")
      this.dialogDelete = false;
      this.close();
    },
    test() {
      console.log("pub", this.$store.getters.publications[0].user);
    },
    isUserLoaded(user) {
      if (user == undefined) {
        return false;
      }
      if (user.adresse == undefined) {
        return false;
      }

      return true;
    },
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    publications() {
      return this.$store.getters.publications;
    },
    formTitle() {
      return this.editedIndex === -1
        ? "Création Annonce"
        : "Modification Annonce";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  async mounted() {
    this.fetchUsers({ admin: false });
    await this.fetchPublications({
      sort: "asc",
      categList: categories,
    });
  },
};
</script>
