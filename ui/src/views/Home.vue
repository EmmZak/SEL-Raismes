<template>
  <v-container fluid flat class="">
    <v-row>
      <v-col cols="12" lg="8" md="12" justify-center>
        <v-img src="./../assets/home-page-min.jpg" class="rounded-lg"></v-img>
      </v-col>
      <v-col cols="12" lg="4" md="12" class="pl-0">
        <v-card flat class="">
          <v-card-title
            class="text-xl-h3 text-lg-h3 text-md-h3 text-sm-h3 text-h5"
          >
            <div class="title-font font-weight-bold">
              Troc D'Heures Raismois
            </div>
          </v-card-title>

          <v-card-text :class="{ 'pt-2': $vuetify.breakpoint.lg }">
            <v-divider class="pb-5"></v-divider>
            <div class="text-lg-subtitle-1 text-md-h5 text-sm-h5 text-body-2">
              Le Troc d'heures raismois est un
              <strong>Système d’Échanges Local (SEL)</strong> qui a pour objet
              de créer du lien social et de promouvoir des solidarités entre les
              individus grâce à des échanges multilatéraux de services
              (compétences, temps, savoirs...) et de biens, comptabilisés au
              moyen d'une unité d'échange symbolique, non convertible en Euros,
              appelée <strong>« Ramis »</strong>. <br />
              Les adhérents sont appelés <strong>« selistes »</strong>. <br />
              Les services sont ponctuels et de courte durée. Exemple : j’aide
              un seliste à faire son jardin pendant une heure, je reçois
              <strong>60 Ramis</strong> que je donnerai à un autre seliste pour
              qu’il m’aide à remplir mes papiers.
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <div></div>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" class="light-blue lighten-1 d-flex justify-center pa-10">
        <div class="text-lg-h2 text-md-h3 text-sm-body-h4 text-h5">
          <div class="title-font white--text">Comment ça fonctionne ?</div>
        </div>
      </v-col>
      <v-col cols="12" md="3" sm="3" xs="12" class="pt-5">
        <v-card flat class="" color="transparent">
          <v-card-title class="justify-center">
            <v-icon size="100" class="fas fa-user-circle"></v-icon>
            <i class="fas fa-camera"></i>
          </v-card-title>
          <v-card-title class="justify-center text-h5">
            1. Inscrivez-vous !
          </v-card-title>
          <v-card-text class="text-center text-body-1">
            Coût d'adhésion <strong>5€/an</strong>. <br />
            Ouvert à tous (Raismois + extérieurs). <br />
            Lors d’une permanence (avec originaux : pièce d’identité et contrat
            Assurance Responsabilité Civile).
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" sm="3" xs="12" class="pt-5">
        <v-card flat class="" color="transparent">
          <v-card-title class="justify-center">
            <v-icon size="100" class="fas fa-hand-holding-usd"></v-icon>
          </v-card-title>
          <v-card-title class="justify-center text-h5">
            2. Proposez vos services/biens
          </v-card-title>
          <v-card-text class="text-center text-body-1">
            Services individuels/collectifs à rendre/recevoir. <br />
            <strong>1h</strong> d’aide apportée =
            <strong>60 Ramis</strong> reçus. <br />
            Une feuille d’échanges à remplir pour mise à jour du compte de
            Ramis.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" sm="3" xs="12" class="pt-5">
        <v-card flat class="" color="transparent">
          <v-card-title class="justify-center">
            <v-icon size="100" class="fas fa-handshake"></v-icon>
          </v-card-title>
          <v-card-title class="justify-center text-h5">
            3. Recevez un autre service/bien
          </v-card-title>
          <v-card-text class="text-center text-body-1">
            Avec vos Ramis reçus, vous obtenez des services ou des biens.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-divider></v-divider> -->
    <v-row justify="center" class="pt-5 hidden-xs-only">
      <v-col cols="12" class="teal accent-4 d-flex justify-center pa-10">
        <div class="text-lg-h2 text-md-h3 text-sm-body-h4 text-h5">
          <div class="title-font white--text">Evénements à venir</div>
        </div>
      </v-col>
      <v-col md="8">
        <v-timeline width="50%">
          <v-timeline-item v-for="(event, i) in events" :key="i" fill-dot>
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
                <!-- <strong>{{event.type}}</strong> &nbsp; {{ formatISOonlydate(event.date) }} 
					de {{ event.start }} 
					à {{ event.end }} -->
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

    <v-row justify="center">
      <v-col cols="12" class="deep-orange accent-2 d-flex justify-center pa-10">
        <div class="text-lg-h2 text-md-h3 text-sm-body-h4 text-h5">
          <div class="title-font white--text">Où sommes-nous ?</div>
        </div>
      </v-col>
      <v-col md="8">
        <div class="map-responsive red">
          <iframe
            style="border: 0"
            loading="lazy"
            :src="`https://www.google.com/maps/embed/v1/place?key=AIzaSyDgI1A9YSRRa4AVAZZE5VfFnokytTACUa0&q=${coor.x}, ${coor.y}`"
          >
          </iframe>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import { mapActions } from "vuex";
// import { VRow, VCol, VContainer, VCard, VCardText, VCardTitle, VDivider } from 'vuetify/lib'
import { formatISOonlydate, formatISOdateToHours } from "./../store/globals";
import { getEvents } from "./../services/event"

export default {
  name: "Home",
  components: {
    //VRow, VCol, VContainer, VCard, VCardText, VCardTitle, VDivider
  },
  data() {
    return {
      formatISOdateToHours: formatISOdateToHours,
      formatISOonlydate: formatISOonlydate,
      // map
      coor: {
        x: 50.403774,
        y: 3.509751,
      },
      dialog: false,
      zoom: 12,
      // event section
      timelineColors: ["pink lighten-1", "blue lighten-1", "success"],
      events: [],
    };
  },
  methods: {
    //...mapActions(["fetchEvents"]),
    test() {
      console.log("this.events", this.events[0]);
      console.log("this.$store.getters.events", this.$store.getters.events);
    },
  },
  computed: {},
  async mounted() {
    console.log("HOME: fetching events");
    //await this.fetchEvents();
    let events = await getEvents()
    this.events = events.data
    console.log("HOME: events", this.events)
    console.log("HOME: fetched");

    //this.events = this.$store.getters.events;
    console.log("home.mounted.events", this.events);
  },
};
</script>

<style>
.title-font {
  font-family: "Open Sans", sans-serif;
}

.map-responsive-old {
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
}

.map-responsive {
  position: relative;
  padding-bottom: 45%;
}

.map-responsive iframe {
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>