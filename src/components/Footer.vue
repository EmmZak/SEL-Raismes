<template>
  <v-container fluid>
    <v-row>
      <v-col col="12" class="pa-0">
        <v-footer dark padless>
          <v-card flat tile class="grey darken-3 white--text text-center">
            <v-card-text>
              <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
                <v-icon x-large>{{ icon }}</v-icon>
              </v-btn>
            </v-card-text>
            <v-card-text
              class="white--text pt-0"
            >Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin.</v-card-text>
            <v-divider></v-divider>
            <v-card-text class="white--text">
              {{ new Date().getFullYear() }} — Troc D'Heures Raismois
            </v-card-text>
          </v-card>
        </v-footer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Footer",

  data: () => ({
    icons: ["mdi-facebook", "mdi-instagram"],
  }),
};
</script>