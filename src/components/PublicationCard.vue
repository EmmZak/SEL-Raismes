<template>
  <div>
    <!-- test -->
    <v-card class="card" elevation="10">
      <v-card-text class="">
        <v-row class="">
          <v-col class="grey">
            <v-card class="d-flex align-start flex-column pa-0 green" >
              <v-card class="mb-auto">start</v-card>
              <v-card class="">end</v-card>
            </v-card>
          </v-col>
          <v-col class="pa-1" cols="4" lg="4">
            <v-img
              :src="require(`@/assets/${categToImage[item.categ]}-300.jpg`)"
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!--  -->
    <v-card class="card" elevation="10">
      <v-card-text>
        <v-row justify="center" class="pa-">
          <v-col class="" cols="8" lg="8">
            <v-row
              justify="space-between"
              :class="{
                'pa-3 pr-1': $vuetify.breakpoint.lg,
                'pa-2 pt-1 pb-0': $vuetify.breakpoint.xs,
              }"
            >
              <v-col ref="categ" class="pa-0" cols="8">
                <div class="text-lg-h5 text-md-h5">
                  {{ item.categ }}
                </div>
                <!-- <div class="card_categ_title ">
                {{ item.categ }}
              </div> -->
              </v-col>
              <v-col class="pa-0" align="right" cols="4">
                <div class="text-lg-h6">
                  {{ formatDDMMYYYY(item.date) }}
                </div>
                <!-- <div class="card_date">
                {{ formatDDMMYYYY(item.date) }}
              </div> -->
              </v-col>
            </v-row>
            <!-- {{ categTitleSize }} -->
            <!-- service by -->
            <v-row
              justify="space-between"
              :class="{
                'pa-3 pr-1 pt-0': $vuetify.breakpoint.lg,
                'pa-2 pt-0': $vuetify.breakpoint.xs,
              }"
            >
              <div class="text-lg-subtitle-2 text-caption">
                Proposé par {{ item.user.name }}
              </div>
              <div class="text-lg-subtitle-2 text-caption">
                {{ item.startTime }}h-{{ item.endTime }}h
              </div>
              <!-- <div class="card_by">Proposé par {{ item.user.name }}</div>
            <div class="card_by">{{ item.startTime }}h-{{ item.endTime }}h</div> -->
            </v-row>
            <!-- user info row/col -->
            <v-row
              :class="{
                'pt-5': $vuetify.breakpoint.lg,
                'pa-0 pt-2': $vuetify.breakpoint.xs,
              }"
            >
              <v-col class="pa-2 pl-0 text-center" cols="2">
                <v-icon class="text-lg-h4" :size="iconSize">mdi-phone</v-icon>
              </v-col>
              <!-- <v-col class="pa-2 pl-0 text-center" cols="2">
              <v-icon class="mail_number_icon" :size="iconSize"
                >mdi-phone</v-icon
              >
            </v-col> -->
              <v-col class="pl-0" cols="10">
                <div class="text-lg-h6 text-caption pl-0">
                  {{
                    item.user.number.replace(
                      /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
                      "$1 $2 $3 $4 $5"
                    )
                  }}
                </div>
                <!-- <div class="mail_number_text pl-0">
                {{
                  item.user.number.replace(
                    /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
                    "$1 $2 $3 $4 $5"
                  )
                }}
              </div> -->
              </v-col>
              <v-col class="pa-2 pl-0 text-center" cols="2">
                <v-icon class="text-lg-h4" :size="iconSize"
                  >mdi-email-outline</v-icon
                >
                <!-- <v-icon class="mail_number_icon" :size="iconSize"
                >mdi-email-outline</v-icon
              > -->
              </v-col>
              <v-col class="pl-0" cols="10">
                <div class="text-lg-h6 text-caption pl-0">
                  {{ item.user.mail }}
                </div>
                <!-- <div class="mail_number_text pl-0">
                {{ item.user.mail }}
              </div> -->
              </v-col>
            </v-row>

            <!-- user info
          <v-row
            :class="{
              'pt-3': $vuetify.breakpoint.lg,
              'pa-0 pt-2': $vuetify.breakpoint.xs,
            }"
          >
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
          </v-row> -->
            <!-- user info -->
          </v-col>
          <v-col class="pa-1" cols="4" lg="4">
            <v-img
              :src="require(`@/assets/${categToImage[item.categ]}-300.jpg`)"
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
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
  mounted() {
    //console.log("MOUNTED")
  },
  computed: {
    categTitleSize() {
      console.log("this refs", this.$refs);
      return this.$refs.categ.clientWidth;
    },
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

  /* font-size: 26px; */
  /* font-size: 16px; */
  /* font-size: 4.5vw; */
  /* font-size: 1.5vw;  */
  /* font-size: 1.5vmin  */
  font-size: 1.5vmax;

  word-wrap: break-word;
}

.card_date {
  font-family: "Open Sans", sans-serif;
  /* font-size: 20px; */
  /* font-size: 12px; */
  font-size: 1vmax;
}

.card_by {
  font-family: "Open Sans", sans-serif;
  /* font-size: 14px; */
  /* font-size: 10px; */
  font-size: 1vmax;
  color: #404040;
}

.mail_number_text {
  /* font-size: 17px; */
  /* font-size: 13px; */
  /* font-size: 1vmax;  */
  font-size: 1vmax;
  color: #404040;
}

.mail_number_icon {
  font-size: 1vmax;
  color: #404040;
}
</style>