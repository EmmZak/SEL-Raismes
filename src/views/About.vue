<template>
  <v-container class="justify-center gray" fluid>
    <v-row>
      <v-col>
        <v-card class="blue">
          <v-row>
            <v-col align="center" md='6'>
              <v-img width="65%" src="./../assets/sel-logo-big.jpg"></v-img>
            </v-col>
            <v-col>
              <v-card-title>
                {{ this.info }}
              </v-card-title>
            </v-col>
          </v-row>
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
    return {
      info:  `Le Troc d'heures raismois est un Système d’Échanges Local (SEL) 
              qui a pour objet de créer du lien et de promouvoir des solidarités 
              entre les individus grâce à des échanges multilatéraux de services 
              et de biens, comptabilisés au moyen de Ramis`
    };
  },
  methods: {},
};
</script>

<style>
</style>