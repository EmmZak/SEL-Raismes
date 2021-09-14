<template>
  <v-card class="card" elevation="5">
    <v-card-text>
      <v-row justify="center" align="center" class=" pa-0">
        <v-col></v-col>
        <v-col class="" lg="4">
          <v-avatar :size="avatarSize" class="" tile>
            <v-img
              :src="require(`@/assets/${categToImage[item.categ]}-300.jpg`)"
            ></v-img>
          </v-avatar>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <!-- 
  <v-card elevation="10" class="grey" >
    <v-row class="">
      <v-col class="space-between pt-0" cols="8" lg="8" md="9" sm="9" xs="9">
        <v-card-title
          class=" text-xl-h3 text-lg-h6 text-md-h3 text-sm-h3 text-h6"
        >
          <div class="title-font font-weight-bold">
            {{ item.categ }}
          </div>
          <div class="title-font font-weight-bold">
            {{ item.date }}
          </div>
        </v-card-title>
        {{ item.date }}
      </v-col> 
      <v-col class="red text-center" cols="4" lg="4" md="3" sm="3" xs="3">
        <v-avatar :size="avatarSize" tile>
          <v-img
            :src="require(`@/assets/${categToImage[item.categ]}-300.jpg`)"
          ></v-img>
        </v-avatar>
      </v-col>
    </v-row>
  </v-card> -->
</template>

<script>
export default {
  name: "PublicationCard",
  props: ["item"],
  data() {
    return {
      categToImage: {
        "Garde d'Animaux": "Animaux",
        "Aide en cuisine": "Cuisine",
        "Aide au jardinage": "Jardinage",
        "Coup de main ménager": "Ménagers",
      },
      //avatarSize: 0,
      dialog: false,
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
  },
  computed: {
    avatarSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 100;
        case "sm":
          return 100;
        case "md":
          return 125;
        case "lg":
          return 190;
        case "xl":
          return 200;
      }
      return null;
    },
  },
};
</script>

<style scoped>
.img {
  opacity: 100%;
}
.card {
  max-width: 640px;
  height: 220px;
  border-radius: 10px;

  /* opacity: 25%; */
  background: linear-gradient(
    150deg,
    rgb(255, 255, 255) 25%,
    rgb(255, 255, 255, 0)
  );
}
</style>