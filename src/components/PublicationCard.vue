<template>
  <v-card class="card" elevation="10">
    <v-card-text>
      <v-row justify="center" class="pa-0">
        <v-col class="" cols="8" lg="8">
          <v-row
            justify="space-between"
            :class="{
              'pa-3 pr-1': $vuetify.breakpoint.lg,
              'pa-2 pt-1 pb-0': $vuetify.breakpoint.xs,
            }"
          >
            <v-col class="pa-0" cols="8">
              <div class="card_categ_title">
                {{ item.categ }}
              </div>
            </v-col>
            <v-col class="pa-0" align="right" cols="4">
              <div class="card_date">
                {{ formatDDMMYYYY(item.date) }}
              </div>
            </v-col>
            <!-- <div class="card_categ_title">
              {{ item.categ }}
            </div>
            <div class="card_date">
              {{ formatDDMMYYYY(item.date) }}
            </div> -->
          </v-row>
          <!-- service by -->
          <v-row
            justify="space-between"
            :class="{
              'pa-3 pr-1 pt-0': $vuetify.breakpoint.lg,
              'pa-2 pt-0': $vuetify.breakpoint.xs,
            }"
          >
            <div class="card_by">Proposé par {{ item.user.name }}</div>
            <div class="card_by">{{ item.startTime }}h-{{ item.endTime }}h</div>
          </v-row>
          <!-- user info -->
          <v-row
            :class="{
              'pt-3': $vuetify.breakpoint.lg,
              'pa-0 pt-2': $vuetify.breakpoint.xs,
            }"
          >
            <!-- number -->
            <v-col
              lg="12"
              cols="12"
              :class="{
                'pt-3 d-flex align-center': $vuetify.breakpoint.lg,
                'pt-1 pb-1 pl-2 d-flex align-center': $vuetify.breakpoint.xs,
              }"
            >
              <v-icon class="mail_number_icon" :size="iconSize"
                >mdi-phone</v-icon
              >
              <div class="mail_number_text pl-3">
                {{
                  item.user.number.replace(
                    /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
                    "$1 $2 $3 $4 $5"
                  )
                }}
              </div>
            </v-col>
            <!-- mail -->
            <v-col
              lg="12"
              cols="12"
              :class="{
                'pt-1 d-flex align-center': $vuetify.breakpoint.lg,
                'pt-1 pb-1 pl-2 d-flex align-center': $vuetify.breakpoint.xs,
              }"
            >
              <v-icon class="mail_number_icon" :size="iconSize"
                >mdi-email-outline</v-icon
              >
              <div class="mail_number_text pl-3">
                {{ item.user.mail }}
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="pa-1" cols="4" lg="4">
          <v-img
            :src="require(`@/assets/${categToImage[item.categ]}-300.jpg`)"
          ></v-img>
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
    iconSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 22;
        case "sm":
          return 28;
        case "md":
          return 32;
        case "lg":
          return 36;
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
  max-height: 220px;
  border-radius: 10px;

  /* opacity: 90%; */
  background: linear-gradient(
    150deg,
    rgb(255, 255, 255) 25%,
    rgb(255, 255, 255, 0)
  );
}

#card_image {
  border-radius: 10px;
}

.card_categ_title {
  /* font-family: "Open Sans", sans-serif; */
  color: #404040;
  font-size: 26px;
  /* font-size: 16px; */
}

.card_date {
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
  /* font-size: 12px; */
}

.card_by {
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  /* font-size: 10px; */
  color: #404040;
}

.mail_number_text {
  font-size: 17px;
  /* font-size: 13px; */
  color: #404040;
}

.mail_number_icon {
  color: #404040;
}
</style>