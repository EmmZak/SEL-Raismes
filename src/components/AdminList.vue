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
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <!-- User Form -->
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click="test()">test</v-btn>
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nouvel Admin
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
                        v-model="editedItem.fullName"
                        label="Nom - Prénom"
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
import DateHandler from "./../helperFunctions/DateHandler";
import { mapActions } from "vuex";

export default {
  name: "AdminList",
  mixins: [DateHandler],
  data() {
    return {
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
        { text: "ID", value: "id" },
        { text: "Nom - Prénom", value: "fullName" },
        { text: "Mail", value: "mail" },
        { text: "Numéro", value: "number" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      // Form Dialog
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      actualItemBackup: {
        id: null,
        fullName: "",
        adresse: "",
        number: "",
        mail: "",
        password: "",
        date: null,
        credit: "",
      },
      editedItem: {
        id: null,
        fullName: "",
        number: "",
        mail: "",
        password: "",
      },
      defaultItem: {
        id: null,
        fullName: "",
        mail: "",
        number: "",
        password: "",
      },
      itemToDelete: {},
    };
  },
  methods: {
    ...mapActions(["fetchAdmins"]),
    async save() {
      this.processing = true;
      console.log("before signup");
      try {
        if (this.editedItem.id == null) {
          await this.$store.dispatch("signUpAdmin", this.editedItem);
        } else {
          await this.$store.dispatch("updateAdmin", {
            admin: this.editedItem,
            backup: this.actualItemBackup,
          });
        }
      } catch (err) {
        console.log("try-catch", err);
      }

      console.log("after signup");
      // reload
      await this.fetchAdmins();

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
        await this.$store.dispatch("deleteAdmin", this.itemToDelete);
      } catch (err) {
        console.log("try-catch", err);
      }

      console.log("after delete");

      // reload
      await this.fetchAdmins();

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
    await this.fetchAdmins();
  },
};
</script>
