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
                </v-btn></v-col>
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
                  de {{ event.start }} à {{ event.end }}
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
  </v-row>
</template>

<script>
import { getEvents } from "./../../services/event";
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
      dialog: false,
    };
  },
  methods: {
    // todo crud
  },
  async mounted() {
    let events = await getEvents();
    console.log("HOME: events", events.data);
    this.events = events.data;
  },
};
</script>