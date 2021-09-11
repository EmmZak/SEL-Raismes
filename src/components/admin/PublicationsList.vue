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

    <v-btn @click="test()">test</v-btn>
    <v-data-table
      :headers="headers"
      :items="publications"
      :search="search"
      class="elevation-1"
    >
      <!------------------------ Custom field rendering ------------------------>
      <!-- date column -->
      <template v-slot:[`item.date`]="{ item }">
        <span>{{ formatDDMMYYYY(item.date) }}</span>
      </template>
      <!-- user column -->
      <template v-slot:[`item.user`]="{ item }">
        <span>{{ item.user.fullName }} </span>
      </template>
      <!------------------------ Custom field rendering ------------------------>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Gestion de publications</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
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
                <v-container>
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
                          ></v-select> </v-col
                      ></v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="editedItem.startTime"
                            label="Heure Début"
                            prepend-icon="mdi-clock"
                          ></v-text-field> </v-col
                        ><v-col>
                          <v-text-field
                            v-model="editedItem.endTIme"
                            label="Heure Fin"
                            prepend-icon="mdi-clock"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col md="6">
                          <v-text-field
                            v-model="editedItem.cost"
                            label="Coût"
                            prepend-icon="mdi-currency-eur"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col lg="6" class="" justify-center>
                      <v-row justify="center">
                        <v-col lg="10">
                          <v-date-picker
                            v-model="editedItem.date"
                            color="green lighten-1"
                            locale="fr-FR"
                          ></v-date-picker>
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
                        v-model="editedItem.surname"
                        label="Nom"
                        prepend-icon="mdi-account"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.name"
                        label="Prénom"
                        prepend-icon="mdi-account"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.mail"
                        label="E-mail"
                        prepend-icon="mdi-email"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.number"
                        label="Numéro"
                        prepend-icon="mdi-phone"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
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
import DateHandler from "./../../helperFunctions/DateHandler";
//import { mapGetters } from 'vuex'
import { mapActions } from "vuex";

export default {
  name: "PublicationsList",
  mixins: [DateHandler],
  data() {
    return {
      // Form
      categories: ["Jardinage", "Animaux", "Ménagers"],
      // Form dialog
      dialog: false,
      dialogDelete: false,
      search: "",
      loadedPublications: [],
      slots: [], //["8-9h", "9-10h", "10-11h", ""],
      headers: [
        // { text: "ID", value: "id" },
        { text: "Catégorie", value: "categ" },
        { text: "Prestataire", value: "user" },
        //{ text: "Adresse", value: "adresse" },
        { text: "Crénaux", value: "slots" },
        { text: "Date", value: "date" },
        { text: "Coût", value: "cost" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        id: null,
        categ: "",
        user: "",
        //adresse: "",
        startTime: null,
        endTIme: null,
        date: null,
        cost: "",
      },
      actualItemBackup: {
        id: null,
        categ: "",
        user: "",
        //adresse: "",
        startTime: null,
        endTIme: null,
        date: null,
        cost: "",
      },
      defaultItem: {
        id: null,
        categ: "",
        user: "",
        //adresse: "",
        startTime: null,
        endTIme: null,
        slots: "",
        date: null,
        cost: "",
      },
      itemToDelete: {},
      selectMenuProps: {
        auto: true,
        overflowY: false,
        disableKeys: true,
        openOnClick: false,
        maxHeight: 304,
      },
      processing: false,
    };
  },
  methods: {
    ...mapActions(["fetchUsers", "fetchPublications"]),
    async save() {
      console.log("edited item", this.editedItem.date);
      
      this.processing = true;
      try {
        await this.$store.dispatch("savePublication", {
          publication: this.editedItem,
          backup: this.actualItemBackup,
        });
      } catch (err) {
        console.log("try-catch", err);
      }

      // reload
      await this.fetchPublications();

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
    /*
     * a function to create time slots from a list of hours
     */
    populateSlots() {
      var hours = [
        7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
      ];

      for (let i = 0; i < hours.length; i++) {
        var hour = hours[i];
        var hourPlusOne = hours[i + 1];

        if (hourPlusOne === undefined) {
          break;
        }

        var slot = String(hour) + "-" + String(hourPlusOne) + "h";
        this.slots.push(slot);
      }
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
  mounted() {
    this.fetchUsers({ admin: false });
    this.fetchPublications();
    this.populateSlots();
  },
};
</script>
