<template>
  <v-row justify="center" class="pt-5 hidden-xs-only">
    <v-col cols="12" class="teal accent-4 d-flex justify-center pa-10">
      <div class="text-lg-h2 text-md-h3 text-sm-body-h4 text-h5">
        <div class="title-font white--text">Evénements à venir</div>
      </div>
    </v-col>
    <v-col md="8">
      <!-- new event button -->
      <v-btn class="primary" @click="dialog = true">
        <v-icon>mdi-plus</v-icon>
        <span>Nouvel evénement</span>
      </v-btn>
      <v-timeline width="50%">
        <v-timeline-item v-for="(event, i) in events" :key="i" fill-dot>
          <!-- crud actions -->
          <v-card elevation="0" class="pb-1">
            <v-row>
              <v-col>
                <v-btn class="primary" @click="editItem(event)">
                  <v-icon>mdi-pencil</v-icon>
                  <span>Modifier</span>
                </v-btn>
                <v-btn class="error" @click="deleteItem(event)">
                  <v-icon>mdi-delete</v-icon>
                  <span>Supprimer</span>
                </v-btn></v-col
              >
            </v-row>
          </v-card>
          <!-- event card -->
          <v-card :color="timelineColors[i % 3]" dark>
            <v-card-title class="title">
              <v-row class="pa-2" justify="space-between">
                <div>
                  <strong>{{ event.type }}</strong>
                </div>
                <div>
                  {{ formatISOonlydate(event.date) }}
                  de {{ event.startHour }}h{{ event.startMinute }} à
                  {{ event.endHour }}h{{ event.endMinute }}
                </div>
              </v-row>
            </v-card-title>

            <v-card-text class="white text--primary pa-5">
              <p style="white-space: pre-line">
                {{ event.text }}
              </p>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-col>
    <!-- dialog -->
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5"> Création d'un événement </span>
        </v-card-title>
        <v-card-text>
          <v-form ref="eventForm">
            <v-row class="">
              <v-col class="">
                <v-row class="">
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.type"
                      label="Nature de l'événement"
                      :rules="[(v) => !!v || 'Le type est obligatoire']"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- start -->
                <v-row class="" align="center">
                  <v-col cols="4">
                    <span class="text-h5">Début</span>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      :items="hourRange"
                      v-model="editedItem.startHour"
                      label="Heure"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      :items="minuteRange"
                      v-model="editedItem.startMinute"
                      label="Minute"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
                <!-- end -->
                <v-row class="" align="center">
                  <v-col cols="4">
                    <span class="text-h5">Fin</span>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      :items="hourRange"
                      v-model="editedItem.endHour"
                      label="Heure"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      :items="minuteRange"
                      v-model="editedItem.endMinute"
                      label="Minute"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
                <!-- desc -->
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="editedItem.text"
                      label="Description"
                      :rules="[(v) => !!v || 'La description est obligatoire']"
                      required
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="text-center">
                <v-date-picker
                  v-model="editedItem.date"
                  locale="fr-FR"
                  :rules="[(v) => !!v || 'La date est obligatoire']"
                ></v-date-picker>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Annuler </v-btn>
          <v-btn color="blue darken-1" text @click="save"> Enregistrer </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end dialog -->
    <!-- delete dialog -->
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h10"
          >Vous êtes sûr de vouloir supprimer l'événement ?</v-card-title
        >
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
  </v-row>
</template>

<script>
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "./../../services/event";
import { formatISOonlydate, formatISOdateToHours } from "./../../store/globals";

export default {
  name: "EventsSection",
  data() {
    return {
      formatISOdateToHours: formatISOdateToHours,
      formatISOonlydate: formatISOonlydate,
      timelineColors: ["pink lighten-1", "blue lighten-1", "success"],
      events: [],
      // form
      hourRange: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
      ],
      minuteRange: ["", "15", "30", "45"],
      dialog: false,
      deleteDialog: false,
      editedIndex: -1,
      editedItem: {
        id: null,
        type: "",
        date: "",
        startHour: "",
        startMinute: "",
        endHour: "",
        endMinute: "",
        text: "",
      },
      defaultItem: {
        id: null,
        type: "",
        date: "",
        startHour: "",
        startMinute: "",
        endHour: "",
        endMinute: "",
        text: "",
      },
      itemToDelete: {},
    };
  },
  methods: {
    async loadEvents() {
      let events = await getEvents();
      //console.log("HOME: events", events.data);
      this.events = events.data;
    },
    async save() {
      if (!this.$refs.eventForm.validate()) {
        return;
      }
      if (this.editedItem.date == "") {
        alert("La date est obligatoire");
        return;
      }
      console.log("this.editedItem", this.editedItem);

      if (this.editedItem.id) {
        console.log("updating event");
        await updateEvent(this.editedItem);
      } else {
        console.log("creating event");
        await createEvent(this.editedItem);
      }

      await this.loadEvents();
      this.close();
    },
    async editItem(item) {
      this.editedIndex = this.events.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },
    deleteItem(item) {
      console.log("deleteItem.item", item);
      this.itemToDelete = item;
      this.editedIndex = this.events.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.deleteDialog = true;
    },
    async deleteItemConfirm() {
      try {
        await deleteEvent(this.itemToDelete.id);
      } catch (err) {
        console.log(err);
      }

      await this.loadEvents();

      this.itemToDelete = {};
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    closeDelete() {
      this.deleteDialog = false;
      this.close();
    },
  },
  async mounted() {
    await this.loadEvents();
  },
};
</script>