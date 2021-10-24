<template>
  <v-container class="justify-center gray" fluid>
    <v-row class="" justify="center">
      <v-col
        :class="{ 'ma-10  elevation-20 ': $vuetify.breakpoint.lg }"
        cols="12"
        lg="3"
      >
        <v-img
          max-width="600px"
          src="./../assets/sel-logo-500-min-opt.jpg"
        ></v-img>
      </v-col>
      <v-col :class="{ 'ma-10': $vuetify.breakpoint.lg }" lg="7">
        <v-card flat class="">
          <v-card-title class="text-lg-h4 text-md-h4 text-sm-h5 text-h6 pa-5">
            <div
              class="title-font font-weight-bold"
              style="
                word-wrap: break-word;
                overflow-wrap: break-word;
                word-break: break-word;
              "
            >
              Création d'un système d'échange local « Troc d’heures raismois » -
              Mai 2021
            </div>
          </v-card-title>

          <v-card-text :class="{ 'pt-0': $vuetify.breakpoint.lg }">
            <div class="text-lg-h5 text-md-h5 text-sm-h5 text-body-2 pa-2">
              <v-divider
                :class="{ 'mt-5 mb-5': $vuetify.breakpoint.lg }"
              ></v-divider>
              Une initiative locale qui prône avant tout les valeurs de partage,
              de solidarité et d'entraide, pour un mieux vivre ensemble. <br />
              <br />
              La journée du 6 mai 2021 était marquée par l'Assemblée Générale
              constitutive du Système d'Echange Local (SEL) « Troc d'heures
              raismois », ainsi que l'ont appelé les membres du Conseil
              d'administration : Vickie la présidente, Fatiha la trésorière,
              Florian le secrétaire, Chantal et Myriam, les administratrices.

              <v-divider
                :class="{ 'mt-5 mb-5': $vuetify.breakpoint.lg }"
              ></v-divider>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="pb-10" justify="center">
      <v-col class="" cols="12" lg="10">
        <div class="text-lg-h5 text-md-h5 text-sm-h5 text-body-2 pa-2">
          Le principe est simple : échanger <strong>gratuitement</strong> des
          services, des savoir-faire, des connaissances ou encore des biens.
          <br />
          <br />
          L’association est ouverte à tous les raismois(es) mais aussi aux
          habitant(e)s des autres communes. Il suffit d'adhérer pour un montant
          de <strong> 5€ </strong> par an pour avoir accès au catalogue
          d’échanges de services et de biens. <br />
          <br />
          Les adhérents, que l’on appelle des <strong>« selistes »</strong> se
          contactent entre eux pour organiser les échanges. Le temps passé à
          effectuer une tâche est comptabilisé en Ramis sur la base
          <strong>1 heure = 60 Ramis</strong>. Exemple : j’aide à faire une
          heure de jardinage, je comptabilise <strong>60 Ramis</strong> sur ma
          feuille d’échange que je donnerai à un autre adhérent pour qu’il
          m’aide à remplir mes papiers. <br />
          <br />
          Les services concernés sont uniquement <strong>ponctuels</strong> et
          de <strong>courte</strong> durée afin de ne pas être considérés comme
          du <strong>travail au noir</strong> . Les échanges peuvent être
          individuels ou collectifs (exemple : ateliers cuisine, couture,
          scrapbooking, apprentissage de jeux de société, etc.). <br />
          <br />
          Pour adhérer, il suffit de venir à une permanence (voir les dates dans
          la rubrique <strong>« événements à venir »</strong> en page d’accueil)
          avec une <strong>pièce d’identité</strong> et
          <strong>votre contrat</strong> ou attestation d’assurance
          <strong>Responsabilité Civile</strong> . Cela sert simplement à
          vérifier que vous êtes bien couvert(e) en cas d’accident survenant
          durant un échange.
        </div>
      </v-col>
    </v-row>

    <v-row v-if="false" justify="center">
      <v-col :class="{ 'ma-10': $vuetify.breakpoint.lg }" cols="12" lg="2">
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