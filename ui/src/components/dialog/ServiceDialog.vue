<template>
  <div>
    <v-dialog
      v-model="serviceDialog"
      @click:outside="endCrudEvent"
      max-width="800px"
    >
      <v-card>
        <!-- {{ service }} -->
        <!-- form -->
        <v-card-text>
          <v-form ref="publicationFormFeed">
            <v-row class="pa-0">
              <v-col>
                <v-row>
                  <v-col class="">
                    <v-card-title class="pl-0">
                      <span class="text-h4">Création Publication dialog</span>
                    </v-card-title>
                  </v-col> </v-row
                ><v-row>
                  <v-col>
                    <v-select
                      :items="categories"
                      item-text="name"
                      label="Catégorie"
                      v-model="propService.category"
                      prepend-icon="mdi-shape"
                      :rules="requiredRules"
                      outlined
                      dense
                    ></v-select>
                  </v-col>
                  <v-col>
                    <v-textarea
                      v-model="propService.description"
                      label="Description ..."
                      prepend-icon="mdi-info"
                      outlined
                      dense
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
                <v-col>
                  <v-autocomplete
                    :items="selectUsers"
                    v-model="propService.userId"
                    label="Séliste"
                    prepend-icon="mdi-account"
                    :item-text="
                      (user) =>
                        `${user.name}, ${user.surname}, ${user.mail}, ${
                          user.number
                        }, ${user.town}, ${getTownName(user.town)}`
                    "
                    item-value="id"
                    :rules="requiredRules"
                    outlined
                    dense
                  ></v-autocomplete>
                </v-col>
              </v-col>
            </v-row>
            <!-- Field notation
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
                  </v-row> -->
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Annuler </v-btn>
          <v-btn color="blue darken-1" text @click="save"> Enregistrer </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- delete dialog -->
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h10"
          >Vous êtes sûr de vouloir supprimer l'annonce ?</v-card-title
        >
        <!-- itemToDelete {{ itemToDelete }} -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm"
            >OUI</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { saveService, deleteService } from "./../../services/service";

export default {
  name: "ServiceDialog",
  props: ["show", "users", "service"],
  data() {
    return {
      deleteDialog: false,
      itemToDelete: {},
    };
  },
  methods: {
    async save() {
      if (!this.$refs.publicationFormFeed.validate()) {
        return;
      }
      console.log("ServiceDIALOG.save this.service", this.propService);

      try {
        await saveService(this.propService);
      } catch (err) {
        console.log("dialog.save.err", err);
      }

      this.endCrudEvent();
    },
    deleteItem(service) {
      console.log("DELETE ITEM fired, this.service", service);
      this.itemToDelete = {...service};
      console.log("this.itemToDelete", this.itemToDelete)
      this.deleteDialog = true;
    },
    async deleteItemConfirm() {
      console.log("ServiceDIALOG.deleteItemConfirm", this.itemToDelete);
      try {
        console.log("ServiceDIALOG.deleteItemConfirm", this.itemToDelete);
        await deleteService(this.itemToDelete.id);
      } catch (err) {
        console.log(err);
      }
      this.closeDelete()
    },
    close() {
      this.endCrudEvent();
    },
    closeDelete() {
      this.itemToDelete = {}
      this.deleteDialog = false;
      this.endCrudEvent();
    },
    endCrudEvent() {
      // set authDialog to false in parent component
      this.$emit("crud-event");
    },
  },
  mounted() {
    //console.log("service", this.service);
  },
  computed: {
    serviceDialog: {
      get() {
        return this.show;
      },
      set() {},
    },
    selectUsers: {
      get() {
        return this.users;
      },
    },
    propService: {
      get() {
        //console.log("computed.sevice.get", this.service);
        return this.service;
      },
      set(value) {
        this.service = value
      }
    },
  },
};
</script>