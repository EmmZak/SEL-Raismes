<template>
  <v-container fluid>
    <v-row>
      <v-col col="12" class="pa-0">
        <v-footer dark padless>
          <v-row>
            <v-col justify="center" class="pa-10">
              <v-row class="" justify="center">
                <v-col md="5">
                  <div>
                    {{ new Date().getFullYear() }} — Troc D'Heures Raismois
                  </div>
                </v-col>
              </v-row>
            </v-col>

            <v-col class="pa-10">
              <v-row justify="center">
                <v-col v-for="(item, i) in items" :key="i" md="1">
                  <v-btn icon :href="item.href" :target="item.target">
                    <v-icon dark md>{{ item.icon }}</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
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
      { icon: "mdi-information", href: "/about", target: "" },
    ],
  }),
};
</script>