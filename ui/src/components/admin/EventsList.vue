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
      :items="events"
      :search="search"
      class="elevation-1"
    >
      <!-- date column 
      <template v-slot:[`item.date`]="{ item }">
        <span>{{ formatDDMMYYYY(item.date) }}</span>
      </template> -->

      <template v-slot:top>
        <v-toolbar flat>
          <!-- Header (search, new) -->
          <v-toolbar-title>Gestion d'événements</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <!-- User Form -->
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click="test()">test</v-btn>
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nouvel événement
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-form>
                  <v-row>
                    <v-col>
                      <v-select
                        :items="types"
                        v-model="editedItem.type"
                        label="Type de l'événements"
                        required
                        prepend-icon="mdi-cog"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-textarea
                        v-model="editedItem.text"
                        label="Texte ..."
                        prepend-icon="mdi-message"
                        required
                      ></v-textarea>
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
                >Vous êtes sûr de vouloir supprimer l'événement ?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Annuler</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OUI</v-btn
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
//import { formatDDMMYYYY } from "./../../services/general"
import { mapActions } from "vuex";

export default {
  name: "EventsList",
  data() {
    return {
      types: ["Information", "Inscription", "Important"],
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
        { text: "Type", value: "type" },
        { text: "Contenu de l'événement", value: "text" },
		{ text: "Date", value: "date" },
		{ text: "Début", value: "start" },
		{ text: "Fin", value: "end" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      // Form Dialog
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      actualItemBackup: {
        id: null,
        type: "",
        text: "",
      },
      editedItem: {
        type: "",
        text: "",
      },
      defaultItem: {
        type: "",
        text: "",
      },
      itemToDelete: {},
    };
  },
  methods: {
    ...mapActions(["fetchEvents"]),
    async save() {
      this.processing = true;
      console.log("before signup");
      try {
        await this.$store.dispatch("saveEvent", {
          event: this.editedItem,
          backup: this.actualItemBackup,
        });
      } catch (err) {
        console.log("try-catch", err);
      }

      console.log("after save");
      // reload
      await this.fetchEvents();

      this.processing = false;
      this.close();
    },
    // UPDATE
    editItem(item) {
      // backup
      this.actualItemBackup = { ...item };
      console.log("editItem.item", item);
      console.log("backup.item", this.actualItemBackup);

      this.editedIndex = this.events.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    // DELETE
    deleteItem(item) {
      console.log("deleteItem.item", item);
      this.itemToDelete = item;
      this.editedIndex = this.events.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      console.log("deleteItemCOndifrm");
      console.log("before delete");

      try {
        await this.$store.dispatch("deleteEvent", this.itemToDelete);
      } catch (err) {
        console.log("try-catch", err);
      }

      console.log("after delete event");

      // reload
      await this.fetchEvents();

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
    events() {
      return this.$store.getters.events;
    },
    formTitle() {
      return this.editedIndex === -1 ? "Création d'un événement" : "Modification d'un événement";
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
    await this.fetchEvents();
  },
};
</script>
