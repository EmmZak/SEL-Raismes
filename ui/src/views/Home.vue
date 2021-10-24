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

    <HowItWorksSection />
    <EventsSection />
    <MapSection />

  </v-container>
</template>

<script>
import HowItWorksSection from "./../components/home/HowItWorksSection.vue";
import EventsSection from "./../components/home/EventsSection.vue";
import MapSection from "./../components/home/MapSection.vue";

export default {
  name: "Home",
  components: {
    HowItWorksSection,
    EventsSection,
    MapSection
  }
};
</script>

<style>
.title-font {
  font-family: "Open Sans", sans-serif;
}
</style>