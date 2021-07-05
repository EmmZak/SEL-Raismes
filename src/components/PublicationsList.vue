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
    <template v-slot:[`item.date`]="{ item }">
      <span>{{ formatDDMMYYYY(item.date) }}</span>
    </template>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
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
              Nouvelle Publication
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      :items="categories"
                      label="Catégorie"
                      v-model="editedItem.categ"
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      :items="users"
                      label="Séliste"
                      v-model="editedItem.user"
                      item-text="nom"
                      item-value="user"
                      return-object
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.adresse"
                      label="Adresse"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.slots"
                      label="Créneaux"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.cost"
                      label="Coût"
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
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h10">Vous êtes sûr de vouloir supprimer l'annonce ?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
//import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    name: "PublicationsList",
    mixins: [DateHandler],
    data() {
        return {
            // Form
            categories: ["Jardinage", "Animaux", "Ménagers"],
            // form dialog
            dialog: false,
            dialogDelete: false,
            search: "",
            loadedPublications: [],
            headers: [
              { text: "ID", value: "id" },
              { text: "Catégorie", value: "categ" },
              { text: "Prestataire", value: "user" },
              { text: "Adresse", value: "adresse" },
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
              adresse: "",
              slots: "",
              date: null,
              cost: "",
            },
            defaultItem: {
              id: null,
              categ: "",
              user: "",
              adresse: "",
              slots: "",
              date: null,
              cost: "",
            },
            itemToDelete: {}
        };
    },
    methods: {
      ...mapActions(["fetchUsers", "fetchPublications", "removePublication", "savePublication"]),
      save () {
        this.savePublication(this.editedItem)
        this.close()
      },
      // UPDATE
      editItem (item) {
        console.log("editItem.item", item)
        this.editedIndex = this.publications.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      // DELETE
      deleteItem (item) {
        console.log("deleteItem.item", item)
        this.itemToDelete = item
        this.editedIndex = this.publications.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        console.log("deleteItemCOndifrm")
        this.removePublication(this.itemToDelete)
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
        this.$store.getters.publications[0].user.get()
          .then((res) => {
            console.log("res", res.data())
          })
        
      }
    },
    computed: {
      users() {
        return this.$store.getters.users
      },
      publications() {
        return this.$store.getters.publications
      },
      formTitle () {
        return this.editedIndex === -1 ? 'Création Annonce' : 'Modification Annonce'
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
    mounted() {
      this.fetchPublications()
    }
}
</script>
