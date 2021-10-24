<template>
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
          <strong>1h</strong> d’aide apportée = <strong>60 Ramis</strong> reçus.
          <br />
          Une feuille d’échanges à remplir pour mise à jour du compte de Ramis.
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
</template>

<script>
export default {
    name: 'HowItWorksSection'
};
</script>