<template>
  <v-container class="justify-center gray" fluid>
    <v-row class="" justify="center">
      <v-col
        :class="{ 'ma-10  elevation-20': $vuetify.breakpoint.lg }"
        cols="12"
        lg="3"
      >
        <v-img max-width="600px" src="./../assets/sel-logo-500-min-opt.jpg"></v-img>
      </v-col>
      <v-col :class="{ 'ma-10': $vuetify.breakpoint.lg }" lg="6">
        <v-card flat class="">
          <v-card-title class="text-lg-h4 text-md-h4 text-sm-h5 text-h6 pa-5">
            <div class="title-font font-weight-bold">
              Création d'un système d'échange local - Mai 2021
            </div>
          </v-card-title>

          <v-card-text :class="{ 'pt-10': $vuetify.breakpoint.lg }">
            <div class="text-lg-h5 text-md-h5 text-sm-h5 text-body-2 pa-2">
              <v-divider
                :class="{ 'mt-5 mb-5': $vuetify.breakpoint.lg }"
              ></v-divider>
              Une initiative locale qui prône avant tout les valeurs de partage,
              de solidarité et d'entraide, pour un mieux vivre ensemble. Le
              principe est simple : échanger gratuitement des services, des
              savoir-faire ou encore des biens.
              <v-divider
                :class="{ 'mt-5 mb-5': $vuetify.breakpoint.lg }"
              ></v-divider>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-0" justify="center">
      <v-col :class="{ 'ma-10': $vuetify.breakpoint.lg }" lg="6">
        <v-card flat class="">
          <v-card-title class="text-lg-h4 text-md-h4 text-sm-h5 text-h6 pa-5">
            <div class="title-font font-weight-bold">Conseil Général</div>
          </v-card-title>
          <v-card-text>
            <v-divider
              :class="{ 'mt-5 mb-5': $vuetify.breakpoint.lg }"
            ></v-divider>
            <div class="text-lg-h5 text-md-h5 text-sm-h5 text-body-2 pa-2">
              Le 6 Mai était marqué par l'installation d'un système d'échange
              local, le « Troc d'heures raismois » ainsi que l'ont appelé les
              membres du Conseil d'administration. Comme ils nous l'expliquent,
              le principe est simple : échanger gratuitement des services, des
              savoir-faire ou encore des biens. Le « Troc d'heures » sera ouvert
              à tous les raismois.e.s et aux habitants des autres communes. Il
              suffit d'adhérer pour avoir accès au catalogue de services. Les
              adhérents se contactent entre eux pour organiser les échanges.
            </div>
            <v-divider
              :class="{ 'mt-5 mb-5': $vuetify.breakpoint.lg }"
            ></v-divider>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col :class="{ 'ma-10': $vuetify.breakpoint.lg }" cols="12" lg="4">
        <v-img
          max-width="700px"
          src="./../assets/conseil.jpg"
          class="rounded elevation-20"
        ></v-img>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col
        :class="{ 'ma-10': $vuetify.breakpoint.lg }"
        cols="12"
        lg="2"
      >
        <v-row class="justify-center pt-5">
          <v-icon size="220">mdi-scale-balance</v-icon>
        </v-row>
      </v-col>
      <v-col :class="{ 'ma-10': $vuetify.breakpoint.lg }" colrs="12" lg="7">
        <v-card flat class="">
          <v-card-title class="text-lg-h4 text-md-h4 text-sm-h5 text-h6 pa-5">
            <div class="title-font font-weight-bold">Mentions Légales</div>
          </v-card-title>
          <v-card-text>
            <v-divider
              :class="{ 'mt-5 mb-5': $vuetify.breakpoint.lg }"
            ></v-divider>
            <div class="text-lg-h5 text-md-h5 text-sm-h5 text-body-2 pa-2">
              Les services concernés sont uniquement ponctuels et de courte
              durée pour éviter d'être assimilés à du travail au noir.
            </div>
            <v-divider
              :class="{ 'mt-5 mb-5': $vuetify.breakpoint.lg }"
            ></v-divider>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Example",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
</style>