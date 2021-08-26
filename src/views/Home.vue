<template>
  <v-container fluid flat class="">
    <v-row>
      <v-col cols="12" lg="8" md="12">
        <v-img src="./../assets/home-page.jpg" class="rounded-lg"></v-img>
      </v-col>
      <v-col cols="12" lg="4" md="12" class="pl-0">
        <v-card flat class="">
          <v-card-title class="text-lg-h3 text-md-h3 text-sm-h3 text-h5">
            <div class="title-font font-weight-bold">
              Troc D'Heures Raismois
            </div>
          </v-card-title>
          <div>
            <v-card-text class="">
              <div class="text-lg-h5 text-md-h5 text-sm-h5 text-body-2">
                <div class="title-font">
                  Le Troc d'heures raismois est un Système d’Échanges Local
                  (SEL) qui a pour objet de créer du lien et de promouvoir des
                  solidarités entre les individus grâce à des échanges
                  multilatéraux de services et de biens, comptabilisés au moyen
                  de Ramis
                </div>
              </div>
            </v-card-text>
          </div>
          <div></div>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="">
      <v-col cols="12" class="light-blue lighten-1 d-flex justify-center pa-10">
        <div class="text-lg-h2 text-md-h3 text-sm-body-h4 text-h5">
          <div class="title-font white--text">Comment ça fonctionne ?</div>
        </div>
      </v-col>
      <v-col
        v-for="(item, i) in mainPageIconInfos"
        :key="i"
        cols="12"
        md="3"
        sm="3"
        xs="12"
      >
        <v-card flat class="" color="transparent">
          <v-card-title class="justify-center">
            <v-icon size="70" :class="item.iconClass"></v-icon>
          </v-card-title>
          <v-card-title class="justify-center text-h5">
            {{ item.title }}
          </v-card-title>
          <v-card-text class="text-center text-body-1">
            {{ item.text }}
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
          <v-timeline-item
            v-for="(event, i) in events"
            :key="i"
            :icon="event.icon"
            fill-dot
          >
            <v-card :color="timelineColors[i % 3]" dark>
              <v-card-title class="title">{{ event.title }}</v-card-title>
              <v-card-text class="white text--primary pt-2">
                <p>
                  {{ event.text }}
                </p>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>

    <v-row class="" justify="center">
      <v-col cols="12" class="deep-orange accent-2 d-flex justify-center pa-10">
        <div class="text-lg-h2 text-md-h3 text-sm-body-h4 text-h5">
          <div class="title-font white--text">Où sommes-nous ?</div>
        </div>
      </v-col>
      <v-col md="8">
        <div class="map-responsive">
          <iframe
            style="border: 0"
            loading="lazy"
            allowfullscreen
            :src="`https://www.google.com/maps/embed/v1/place?key=AIzaSyDgI1A9YSRRa4AVAZZE5VfFnokytTACUa0&q=${coor.x}, ${coor.y}`"
          >
          </iframe>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
src/
<script>
import { mapActions } from "vuex";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      // map
      coor: {
        x: 50.403587663227206,
        y: 3.5099710163715776,
      },
      dialog: false,
      zoom: 12,
      // carousel
      interval: 1000,
      timelineColors: ["pink lighten-1", "blue lighten-1", "green accent-3"],
      carousel_images: [
        {
          src: "https://www.ville-raismes.fr/fileadmin/_processed_/4/7/csm_Banniere_ete2021-web-low_bbf2947368.jpg",
        },
        {
          src: "https://www.portes-haut-doubs.com/sites/portes-haut-doubs.com/files/Vivre_au_quotidien/S_investir_dans_une_association/association.jpg",
        },
        {
          src: "https://www.ionos.fr/startupguide/fileadmin/StartupGuide/Teaser/group-of-people-t.jpg",
        },
        {
          src: "https://scontent-cdg2-1.xx.fbcdn.net/v/t1.6435-9/198320773_109546518022163_6970041527137788969_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=e3f864&_nc_ohc=wQk4WPTnnp8AX9GR5kj&tn=x_opG47Ar91GS5wb&_nc_ht=scontent-cdg2-1.xx&oh=18157306bc70dafa2a54a480665646b9&oe=612F9E2B",
        },
      ],
      mainPageIconInfos: [
        {
          iconClass: "fas fa-user-circle",
          title: "1. Inscrivez-vous !",
          text: "Coût d'adhésion 5 euros par an. ",
        },
        {
          iconClass: "fas fa-hand-holding-usd",
          title: "2. Proposez vos services",
          text: "1h de travail vous apporte 60 RAMIS. Les services sont de nature occasionelle",
        },
        {
          iconClass: "fas fa-handshake",
          title: "3. Recevez un autre service",
          text: "Vous pouvez utlsider les Ramis obtenus en recevant des services",
        },
      ],
      events: [
        /*
        {
          color: "red lighten-2",
          icon: "mdi-information",
          text: "infromation er aze razr eaz a r az rerazrzrarzearaezrezar erzerz ez rezr e",
        },
        {
          color: "purple darken-1",
          icon: "mdi-calendar-clock",
          text: "infromation er aze razr eaz a r az rerazrzrarzearaezrezar erzerz ez rezr e",
        },
        {
          color: "green lighten-1",
          icon: "mdi-account-clock",
          text: "infromation er aze razr eaz a r az rerazrzrarzearaezrezar erzerz ez rezr e",
        },
        */
      ],
    };
  },
  methods: {
    ...mapActions(["fetchEvents"]),
    test() {
      console.log("this.events", this.events[0]);
      console.log("this.$store.getters.events", this.$store.getters.events);
    },
  },
  computed: {},
  async mounted() {
    await this.fetchEvents();

    this.events = this.$store.getters.events;
    console.log("home.mounted.events", this.events);
  },
};
</script>

<style>
.title-font {
  font-family: "Open Sans", sans-serif;
}

.map-responsive {
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
}

.map-responsive iframe {
  left: 0;
  top: 0;
  height: 75%;
  width: 100%;
  position: absolute;
}
</style>