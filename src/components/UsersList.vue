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
      <v-toolbar
        flat
      >
        <!-- Header (search, new) -->
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>

        <!-- User Form -->
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
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
                      v-model="editedItem.nom"
                      label="Nom"
                      prepend-icon="mdi-account"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.prenom"
                      label="Prénom"
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
                      v-model="editedItem.number"
                      label="Numéro"
                      prepend-icon="mdi-phone"
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
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.credit"
                      label="Solde"
                      prepend-icon="mdi-currency-eur"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Annuler
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
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
            <v-card-title class="text-h10">Vous êtes sûr de vouloir supprimer le séliste ?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Confirm dialog -->
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</v-card>
</template>

<script>
import DateHandler from './../helperFunctions/DateHandler'
//import store from '@/store'
//import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    name: "UsersList",
    mixins: [DateHandler],
    data() {
        return {
            // Data tab
            search: "",
            headers: [
              { text: "ID", value: "id" },
              { text: "Nom", value: "nom" },
              { text: "Prénom", value: "prenom" },
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
            editedItem: {
              id: null,
              nom: "",
              prenom: "",
              fullName: "",
              adresse: "",
              number: "",
              mail: "",
              date: null,
              credit: "",
            },
            defaultItem: {
              id: null,
              nom: "",
              prenom: "",
              fullName: "",
              adresse: "",
              mail: "",
              number: "",
              date: null,
              credit: "",
            },
            itemToDelete: {}
        };
    },
    methods: {
      ...mapActions(["fetchUsers", "removeUser", "saveUser"]),
      save () {
        this.saveUser(this.editedItem)
        this.close()
      },
      // UPDATE
      editItem (item) {
        console.log("editItem.item", item)
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      // DELETE
      deleteItem (item) {
        console.log("deleteItem.item", item)
        this.itemToDelete = item
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        console.log("deleteItemCOndifrm")
        this.removeUser(this.itemToDelete)
        this.itemToDelete = {}
        this.closeDelete()
      },
      close() {
        this.dialog = false
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      },
      closeDelete () {
        // cancel deleting
        console.log("closeDelete")
        this.dialogDelete = false
        this.close()
      },
      test() {
        console.log("test.users", this.users[0])
      },
    },
    computed: {
      users() {
        return this.$store.getters.users
      },
      formTitle () {
        return this.editedIndex === -1 ? 'Création Séliste' : 'Modification Séliste'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    async mounted() {
      await this.fetchUsers()
    }
    
}
</script>
