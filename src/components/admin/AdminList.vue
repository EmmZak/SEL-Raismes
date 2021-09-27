<template>
  <v-card>
    <!-- Search -->
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Rechercher"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <!-- Table -->
    <v-data-table
      :headers="headers"
      :items="admins"
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
          <v-toolbar-title>Gestion d'administrateurs</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>

          <v-btn @click="toPDF(admins)" class="red white--text">
            <v-icon>mdi-file-pdf-box</v-icon>Exporter</v-btn
          >
          <v-spacer></v-spacer>
          <!-- User Form -->
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nouvel Admin
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-form ref="adminForm">
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.surname"
                        label="Nom"
                        prepend-icon="mdi-account"
                        :rules="requiredRules"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.name"
                        label="Prénom"
                        prepend-icon="mdi-account"
                        :rules="requiredRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.adresse"
                        label="Adresse"
                        prepend-icon="mdi-map-marker"
                        :rules="requiredRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-autocomplete
                        v-model="editedItem.town"
                        :items="towns"
                        label="Ville - Code Postal"
                        prepend-icon="mdi-home-city"
                        :item-text="(item) => item.name + ', ' + item.code"
                        :rules="requiredRules"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.mail"
                        label="E-mail"
                        prepend-icon="mdi-email"
                        :rules="emailRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.password"
                        label="Mot de passe"
                        prepend-icon="mdi-lock"
                        :rules="passwordRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.number"
                        label="Numéro"
                        prepend-icon="mdi-phone"
                        :rules="numberRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <!-- default sold is 60 Ramis -->
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.credit"
                        label="Solde"
                        prepend-icon="mdi-currency-eur"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <!-- registration error div -->
                  <v-row>
                    <v-col>
                      <div class="text-h5 pa-12 text-wrap hidden-md-and-up">
                        {{ registrationError }}
                      </div>
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
          <!-- User Form -->

          <!--  -->
          <!-- Confirm dialog -->
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h10"
                >Vous êtes sûr de vouloir supprimer l'admin ?</v-card-title
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
          <!-- END Confirm dialog -->
        </v-toolbar>
      </template>

      <!-- CRUD Actions -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <!-- END CRUD Actions -->

    <!-- Notification -->
    <v-snackbar v-model="showNotif" :timeout="notifTimeout">
      <v-icon>
        {{ notifIcon }}
      </v-icon>
      {{ notifText }}
    </v-snackbar></v-card
  >
  <!-- END Notification -->
</template>

<script>
import HelperFunctions from "./../../helperFunctions/HelperFunctions";
import { mapActions } from "vuex";
import {
  requiredRules,
  emailRules,
  numberRules,
  passwordRules,
  towns,
} from "./../../store/globals";

export default {
  name: "AdminList",
  mixins: [HelperFunctions],
  data() {
    return {
      // form
      requiredRules: requiredRules,
      emailRules: emailRules,
      numberRules: numberRules,
      passwordRules: passwordRules,
      towns: towns,
      // other
      registrationError: null,
      // Data tab
      notifSucess: false,
      showNotif: false,
      notifText: "",
      notifTimeout: 2000,
      search: "",
      notifIcon: null,
      notifIcons: {
        success: "mdi-check-circle",
        fail: "mdi-close-circle",
      },
      headers: [
        // { text: "ID", value: "id" },
        { text: "Nom", value: "surname" },
        { text: "Prénom", value: "name" },
        { text: "Mail", value: "mail" },
        { text: "Numéro", value: "number" },
        { text: "Adresse", value: "adresse" },
        { text: "Ville", value: "town" },
        { text: "Inscription", value: "date" },
        { text: "Crédit", value: "credit" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      // Form Dialog
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      actualItemBackup: {
        id: null,
        name: "",
        surname: "",
        adresse: "",
        town: null,
        number: "",
        mail: "",
        password: "",
        admin: true,
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
        admin: true,
      },
      defaultItem: {
        id: null,
        name: "",
        surname: "",
        adresse: "",
        town: null,
        number: "",
        mail: "",
        password: "",
        admin: true,
      },
      itemToDelete: {},
      // form
    };
  },
  methods: {
    ...mapActions(["fetchUsers"]),
    async save() {
      if (!this.$refs.adminForm.validate()) {
        return;
      }
      this.processing = true;
      console.log("before signup");
      try {
        console.log("edittedItem", this.editedItem);
        await this.$store.dispatch("signUpUser", {
          user: this.editedItem,
          backup: this.actualItemBackup,
        });
      } catch (err) {
        console.log("try-catch", err);
      }

      console.log("after signup");
      // reload
      await this.fetchUsers({ admin: true });

      this.processing = false;
      this.close();
    },
    // UPDATE
    editItem(item) {
      // backup
      this.actualItemBackup = { ...item };
      console.log("editItem.item", item);
      console.log("backup.item", this.actualItemBackup);

      this.editedIndex = this.admins.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    // DELETE
    deleteItem(item) {
      console.log("deleteItem.item", item);
      this.itemToDelete = item;
      this.editedIndex = this.admins.indexOf(item);
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
      await this.fetchUsers({ admin: true });

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
    notify(text, success) {
      this.showNotif = true;
      this.notifText = text;
      this.notifSucess = success;
      this.notifIcon = this.notifIcons.success;
    },
    test() {
      this.showNotif = true;
    },
  },
  computed: {
    admins() {
      return this.$store.getters.admins;
    },
    formTitle() {
      return this.editedIndex === -1 ? "Création Admin" : "Modification Admin";
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
    await this.fetchUsers({ admin: true });
  },
};
</script>
