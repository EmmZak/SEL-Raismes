<template>
  <v-container class="justify-center gray" fluid>
    <v-card class="red ">
      <v-row justify="center">
        <v-col>
          <v-img max-width="600px" src="./../assets/sel-logo-500-min.jpg"></v-img>
        </v-col>
        <v-col>
          <v-card flat>
            <v-card-title class="text-lg-h2 text-md-h3 text-sm-body-h4 text-h4">
              Troc D'Heures Raismois
            </v-card-title>
            <div>
              <v-card-text class="text-body-1">
                Le Troc d'heures raismois est un Système d’Échanges Local (SEL)
                qui a pour objet de créer du lien social et de promouvoir des
                solidarités entre les individus grâce à des échanges
                multilatéraux de services (compétences, temps, savoirs...) et de
                biens, comptabilisés au moyen d'une unité d'échange symbolique,
                non convertible en Euros, appelée « Ramis ». Il est ouvert à
                tous les raismois(es) et aux habitant(e)s des autres communes.
                Il suffit d'adhérer (5 € par an) pour avoir accès au catalogue
                d’échanges. Les adhérents se contactent entre eux pour organiser
                les échanges. Le temps passé à effectuer une tâche est
                comptabilisé en Ramis (1 heure = 60 Ramis). Exemple : j’aide un
                adhérent à faire son jardin pendant une heure, je reçois 60
                Ramis que je donnerai à un autre adhérent pour qu’il m’aide à
                faire mes démarches administratives. Les services concernés sont
                uniquement ponctuels et de courte durée pour éviter d'être
                assimilés à du travail au noir.
              </v-card-text>
            </div>
            <div></div>
          </v-card>
        </v-col>
      </v-row>

    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Example",
  components: {},
  data() {
    return {

      info: `Le Troc d'heures raismois est un Système d’Échanges Local (SEL) 
              qui a pour objet de créer du lien et de promouvoir des solidarités 
              entre les individus grâce à des échanges multilatéraux de services 
              et de biens, comptabilisés au moyen de Ramis`,
    };
  },
  methods: {},
};
</script>

<style>
</style>