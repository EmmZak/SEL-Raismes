<template>
  <v-card class="card" elevation="10">
    <v-card-text>
      <v-row justify="center" class="pa-0">
        <v-col>
          <v-row justify="space-between" class="pa-3">
            <div class="card_categ_title">
              {{ item.categ }}
            </div>
            <div class="card_date">
              {{ formatDDMMYYYY(item.date) }}
            </div>
          </v-row>
          <!-- service by -->
          <v-row class="pa-3 pt-0">
            <div class="card_by">Proposé par {{ item.user.name }}</div>
          </v-row>
          <!-- user info -->
          <v-row class="pt-3">
            <!-- number -->
            <v-col lg="12" class="d-flex align-center">
              <v-icon class="mail_number_icon" large>mdi-phone</v-icon>
              <div class="mail_number_text pl-4">
                {{ item.user.number }}
              </div>
            </v-col>
            <!-- mail -->
            <v-col lg="12" class="d-flex align-center">
              <v-icon class="mail_number_icon" large>mdi-email-outline</v-icon>
              <div class="mail_number_text pl-4">
                {{ item.user.mail }}
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="" lg="4">
          <v-avatar :size="avatarSize" class="" tile>
            <v-img
              class="id"
              :src="require(`@/assets/${categToImage[item.categ]}-300.jpg`)"
            ></v-img>
          </v-avatar>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import DateHandler from "./../helperFunctions/DateHandler";

export default {
  name: "PublicationCard",
  props: ["item"],
  mixins: [DateHandler],
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
.card {
  max-width: 640px;
  height: 220px;
  border-radius: 10px;

  /* opacity: 90%; */
  background: linear-gradient(
    150deg,
    rgb(255, 255, 255) 25%,
    rgb(255, 255, 255, 0)
  );
}

.card_categ_title {
  /* font-family: "Open Sans", sans-serif; */
  color: #404040;
  font-size: 26px;
}

#card_image {
  border-radius: 10px;
}

.card_date {
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
}

.card_by {
  font-family: "Open Sans", sans-serif;
  font-size: 14 px;
  color: #404040;
}

.mail_number_icon {
  color: #404040;
}

.mail_number_text {
  font-size: 20px;
  color: #404040;
}
</style>