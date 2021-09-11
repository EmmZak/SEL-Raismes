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
      :items="users"
      :search="search"
      class="elevation-1"
    >
      <!-- date column -->
      <template v-slot:[`item.date`]="{ item }">
        <span>{{ formatDDMMYYYY(item.date) }}</span>
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <!-- Header (search, new) -->
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <!-- User Form -->
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click="test()">test</v-btn>
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nouveau Séliste
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
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
                        v-model="editedItem.adresse"
                        label="Adresse"
                        prepend-icon="mdi-map-marker"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-autocomplete
                        v-model="editedItem.town"
                        :items="$store.getters.towns"
                        label="Ville - Code Postal"
                        prepend-icon="mdi-home-city"
                        :item-text="(item) => item.town + ', ' + item.code"
                      ></v-autocomplete>
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
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.password"
                        label="Mot de passe"
                        prepend-icon="mdi-lock"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.number"
                        label="Numéro"
                        prepend-icon="mdi-phone"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <!-- default sold is 60 Ramis
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.credit"
                        label="Solde"
                        prepend-icon="mdi-currency-eur"
                      ></v-text-field>
                    </v-col>
                  </v-row>  -->
                  <!-- registration error div -->
                  <v-row>
                    <v-col>
                      <div class="text-h5 pa-12 text-wrap hidden-md-and-up">
                        {{ registrationError }}
                      </div>
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
          <!-- User Form -->
          <!--  -->
          <!-- Confirm dialog -->
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h10"
                >Vous êtes sûr de vouloir supprimer le séliste ?</v-card-title
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
          <!-- Confirm dialog -->
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
import DateHandler from "./../helperFunctions/DateHandler";
//import store from '@/store'
//import { mapGetters } from 'vuex'
import { mapActions } from "vuex";

export default {
  name: "UsersList",
  mixins: [DateHandler],
  data() {
    return {
      // Data tab
      search: "",
      headers: [
        // { text: "ID", value: "id" },
        { text: "Nom - Prénom", value: "fullName" },
        { text: "Mail", value: "mail" },
        { text: "Numéro", value: "number" },
        { text: "Adresse", value: "adresse" },
        { text: "Inscription", value: "date" },
        { text: "Crédit", value: "credit" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      // Form Dialog
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      // while updating, this'll check if any field has changed or not
      actualItemBackup: {
        id: null,
        name: "",
        surname: "",
        adresse: "",
        town: null,
        number: "",
        mail: "",
        password: "",
        date: null,
        credit: "",
        admin: false,
      },
      editedItem: {
        id: null,
        name: "",
        surname: "",
        adresse: "",
        town: null,
        number: "",
        mail: "",
        password: "",
        date: null,
        credit: "",
        admin: false,
      },
      defaultItem: {
        id: null,
        name: "",
        surname: "",
        adresse: "",
        town: null,
        mail: "",
        password: "",
        number: "",
        date: null,
        credit: "",
        admin: false,
      },
      itemToDelete: {},
      // registration
      errorCodeMap: {
        "auth/invalid-email": "Format du mail incorrect",
        "auth/email-already-in-use": "",
      },
      processing: false,
      registrationError: "",
    };
  },
  methods: {
    ...mapActions(["fetchUsers"]),
    async save() {
      this.processing = true;
      console.log("before signup");
      try {
        await this.$store.dispatch("signUpUser", {
          user: this.editedItem,
          backup: this.actualItemBackup,
        });
      } catch (err) {
        console.log("try-catch", err);
      }

      console.log("after signup");
      // reload
      await this.fetchUsers({ admin: false });

      this.processing = false;
      this.close();
    },
    // UPDATE
    editItem(item) {
      // backup
      this.actualItemBackup = { ...item };
      console.log("editItem.item", item);
      console.log("backup.item", this.actualItemBackup);

      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    // DELETE
    deleteItem(item) {
      console.log("deleteItem.item", item);
      this.itemToDelete = item;
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      console.log("deleteItemCOndifrm");

      console.log("before delete");
      try {
        await this.$store.dispatch("deleteUser", this.itemToDelete);
      } catch (err) {
        console.log("try-catch", err);
      }

      console.log("after delete");

      // reload
      await this.fetchUsers({ admin: false });

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
      console.log("closeDelete");
      this.dialogDelete = false;
      this.close();
    },
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    formTitle() {
      return this.editedIndex === -1
        ? "Création Séliste"
        : "Modification Séliste";
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
    await this.fetchUsers({ admin: false });
  },
};
</script>
