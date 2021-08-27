<template>
  <v-container fluid>
    <v-row>
      <v-col col="12" class="pa-0">
        <v-footer dark padless>
          <v-row justify="center">
            <v-col justify="center">
              <v-row class="pa-10">
                <div>
                  {{ new Date().getFullYear() }} — Troc D'Heures Raismois
                </div>
              </v-row>
            </v-col>

            <v-col class="green"> 
              <v-img
                width="150"
                src="./../assets/sel-logo-crop-min-150.jpg"
              ></v-img>
              <div><strong>FR</strong></div>
            </v-col>

            <v-col>
              <v-row justify="center" class="pa-10">
                <v-col v-for="(item, i) in items" :key="i" md="1">
                  <v-btn icon :href="item.href" :target="item.target">
                    <v-icon dark md>{{ item.icon }}</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <!-- 
          <v-card flat tile class="grey darken-3 white--text text-center">
            <v-card-text>
              <v-btn v-for="(item, i) in icons" :key="i" class="mx-4 white--text" icon link :to="icons[i].to">
                <v-icon 
                  x-large
                >{{ item.icon }}</v-icon>
              </v-btn>
            </v-card-text>
            <v-card-text
              class="white--text pt-0"
            >Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin.</v-card-text>
            <v-divider></v-divider>
            <v-card-text class="white--text">
              {{ new Date().getFullYear() }} — Troc D'Heures Raismois
            </v-card-text>
          </v-card>  -->
        </v-footer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Footer",

  data: () => ({
    items: [
      {
        icon: "mdi-facebook",
        href: "https://www.facebook.com/Troc-dheures-raismois-108325714810910/",
        target: "_blank",
      },
      { icon: "mdi-email", href: "/contact", target: "" },
      { icon: "mdi-phone", href: "/contact", target: "" },
    ],
  }),
};
</script>