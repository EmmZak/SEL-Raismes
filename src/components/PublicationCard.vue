<template>
  <div>
    <!-- test -->
    <v-card v-if="true" class="card" elevation="10">
      <v-card-text class="">
        <v-row class="">
          <!-- info main column -->
          <v-col class="pa-2" cols="8">
            <v-container class="fill-height pa-0">
              <!-- info main row -->
              <v-row class="no-gutters flex-column fill-height">
                <v-col cols="" class="pt-0">
                  <v-row class="no-gutters" align="center">
                    <v-col cols="8" class="">
                      <div class="card_categ_class">
                        {{ item.categ }}
                      </div>
                    </v-col>
                    <v-col cols="4" class="" align="right">
                      <div class="card_date_class">
                        {{ formatDDMMYYYY(item.date) }}
                      </div></v-col
                    >
                  </v-row>
                </v-col>
                <!-- by-hour col=12 -->
                <v-col cols="" class="">
                  <v-row class="no-gutters">
                    <v-col cols="8" class="">
                      <div class="card_by_user_class">
                        Proposé par {{ item.user.name }}
                      </div>
                    </v-col>
                    <v-col cols="4" class="" align="right">
                      <div
                        v-if="item.startTime && item.endTime"
                        class="card_hour_class"
                      >
                        {{ item.startTime }}h-{{ item.endTime }}h
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col></v-col>
                <v-col cols="" class="">
                  <v-row class="no-gutters" align="center">
                    <v-col cols="1" class="">
                      <v-icon class="" :size="iconSize">mdi-phone</v-icon>
                    </v-col>
                    <v-col cols="10" class="" align="left">
                      <div class="card_mail_number_class pl-5">
                        {{
                          item.user.number.replace(
                            /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
                            "$1 $2 $3 $4 $5"
                          )
                        }}
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="" class="">
                  <v-row class="no-gutters" align="center">
                    <v-col cols="1" class="">
                      <v-icon class="" :size="iconSize"
                        >mdi-email-outline</v-icon
                      >
                    </v-col>
                    <v-col cols="10" class="">
                      <div class="card_mail_number_class pl-5">
                        {{ item.user.mail }}
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
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
import HelperFunctions from "./../helperFunctions/HelperFunctions";

export default {
  name: "PublicationCard",
  props: ["item", "isVisitor"],
  mixins: [HelperFunctions],
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
    // item -> {className, coef}
    setFont(item) {
      let elements = document.getElementsByClassName(item.className);
      for (var i = 0; i < elements.length; i++) {
        var relFontsize = elements[i].offsetWidth * item.coef;
        elements[i].style.fontSize = relFontsize + "px";
        //elements[i].style.color = color;
      }
    },
    fitText() {
      console.log("fit text trigger");
      const class_coefs = [
        { className: "card_categ_class", coef: 0.115 },
        { className: "card_date_class", coef: 0.15 },
        { className: "card_by_user_class", coef: 0.075 },
        { className: "card_hour_class", coef: 0.13 },
        { className: "card_mail_number_class", coef: 0.06 },
      ];
      class_coefs.forEach((item) => {
        this.setFont(item);
      });
    },
    test() {
      console.log("resize trigger");
    },
  },
  destroyed() {
    window.removeEventListener("load", this.fitText);
  },
  mounted() {
    window.addEventListener("load", this.fitText());
    window.addEventListener("resize", this.fitText);
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
          return 40;
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

.card_categ_class {
  font-family: "Open Sans", sans-serif;
  color: #202020;
}

.card_date_class {
  font-family: "Open Sans", sans-serif;
  color: #606060;
}

.card_by_user_class {
  font-family: "Open Sans", sans-serif;
  color: #606060;
}

.card_hour_class {
  font-family: "Open Sans", sans-serif;
  color: #606060;
}

.card_mail_number_class {
  font-family: "Open Sans", sans-serif;
  color: #202020;
}

.card_icon_class {
  font-family: "Open Sans", sans-serif;
  color: #202020;
}
</style>