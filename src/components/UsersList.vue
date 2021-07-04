<template>
  <v-data-table
    :headers="headers"
    :items="users"
    class="elevation-1"
  >
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


<v-btn @click=test>test</v-btn>
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
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.nom"
                      label="Nom"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.prenom"
                      label="Prénom"
                    ></v-text-field>
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
                      v-model="editedItem.number"
                      label="Numéro"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.date"
                      label="Inscription"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.credit"
                      label="Solde"
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
            <v-card-title class="text-h5">Vous êtes sûr de vouloir supprimer le séliste ?</v-card-title>
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
    <template v-slot:item.actions="{ item }">
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
  
</template>

<script>
import DateHandler from './../helperFunctions/DateHandler'
//import store from '@/store'
//import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    name: "UsersList",
    mixins: [DateHandler],
    users: [],
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            search: "",
            loadedUsers: [],
            headers: [
              { text: "Nom", value: "nom" },
              { text: "Prénom", value: "prenom" },
              { text: "Adresse", value: "adresse" },
              { text: "Numéro", value: "number" },
              { text: "Inscription", value: "date" },
              { text: "Crédit", value: "credit" },
              { text: "Actions", value: "actions", sortable: false },
            ],
            editedIndex: -1,
            editedItem: {
              id: "",
              nom: "",
              prenom: "",
              adresse: "",
              number: "",
              date: "",
              credit: "",
            },
            defaultItem: {
              id: "",
              nom: "",
              prenom: "",
              adresse: "",
              number: "",
              date: "",
              credit: "",
            }
        };
    },
    methods: {
      ...mapActions(["fetchUsers", "createUser", "updateUser", "removeUser", "saveUser"]),
      save () {
        this.saveUser(this.editedItem)
        this.close()
      },
      editItem (item) {
        console.log("editItem.item", item)
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        console.log("deleteItem.item", item)
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        console.log("deleteItemCOndifrm")
        //this.users.splice(this.editedIndex, 1)  
        //this.closeDelete()
        
      },
      close() {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      test() {
        console.log("test.users", this.users[0])
      }
    },
    computed: {
      //...mapGetters(["users"]),
      users() {
        console.log("store.state.users", this.$store.state.users)
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
    created() {
      this.fetchUsers()
    }
    
}
</script>
