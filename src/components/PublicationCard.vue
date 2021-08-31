<template>
  <v-card elevation="10">
    <v-row>
      <v-col class="">
        <v-card-title v-text="item.categ" class=""> </v-card-title>
      </v-col>
      <v-col class="purple">
        <v-avatar v-show="$vuetify.breakpoint.lgAndUp" size="150" tile>
          <v-img :src="require(`@/assets/${item.categ}-300.jpg`)"></v-img>
        </v-avatar>
        <v-avatar v-show="$vuetify.breakpoint.xsOnly" size="100" tile>
          <v-img :src="require(`@/assets/${item.categ}-300.jpg`)"></v-img>
        </v-avatar>
      </v-col>
    </v-row>
  </v-card>
  <!-- 
  <div>
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card>
          <v-img :src="require(`@/assets/${item.categ}-300.jpg`)"></v-img>

          <v-row justify="space-around">
            <v-card-title class="card-title">
              <span class="font-weight-light md"> {{ item.categ }} </span>
            </v-card-title>

            <v-card-title class="card-cost">
              <span class="amber--text accent-3"> $ {{ item.cost }} </span>
            </v-card-title>
          </v-row>

          <v-card-title class="card-slots-text">
            <span class="font-weight-light"> Disponibilités </span>
          </v-card-title>
          <v-divider></v-divider>

          <v-bottom-navigation>
            <v-btn>
              <span>Recents</span>
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>

            <v-btn>
              <span>Favorites</span>
              <v-icon>mdi-phone</v-icon>
            </v-btn>

          </v-bottom-navigation>

          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn @click="open()"> En savoir plus </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-card>
      </template>
    </v-hover>
    
    <v-dialog v-model="dialog" max-width="700px">
      <v-container>
        <v-toolbar color="blue lighten-1">
          <v-btn icon @click="close()">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-row dense>
          <v-col cols="12">
            <v-card elevation="20">
              <v-responsive :aspect-ratio="4 / 2">
                <v-row>
                  <v-col class="pt-5 pl-9 pr-0">
                    <v-row cols="12" justify="space-between">
                      <v-card-title
                        class="text-h4"
                        v-text="item.categ"
                      ></v-card-title>
                      <v-card-title class="text-h4">
                        <span class="amber--text accent-3">
                          $ {{ item.cost }}
                        </span>
                      </v-card-title>
                    </v-row>

                    
                    <v-row>
                      <v-col class="pt-0">
                        <v-card elevation="5" flat>
                          <v-card-title class="text-h6"
                            >Disponibilités</v-card-title
                          >
                          <v-card-actions>
                            <v-row justify="space-around" align="center">
                              <v-col
                                v-for="(slot, i) in item.slots"
                                :key="i"
                                cols="3"
                                class="green"
                              >
                                <v-chip medium>
                                  {{ slot }}
                                </v-chip>
                              </v-col>
                            </v-row>
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
                    
                    <v-row>
                      <v-col>
                        <v-card elevation="10" class="">
                          <v-row md="12">
                            <v-col md="7">
                              <v-row>
                                <v-card-subtitle class="pl-6 text-h5"
                                  >Séliste</v-card-subtitle
                                >
                              </v-row>
                              <v-row>
                                <v-card-subtitle
                                  class="pl-6 text-h7"
                                  v-text="item.user.fullName"
                                ></v-card-subtitle>
                              </v-row>
                            </v-col>
                            <v-col class="text-center" md="5">
                              <v-img>
                                <v-icon size="100">mdi-account</v-icon>
                              </v-img>
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-col>
                    </v-row>
                    
                  </v-col>
                  
                  <v-col class="pt-7">
                    <v-avatar size="300" tile>
                      <v-img
                        :src="require(`@/assets/${item.categ}-300.jpg`)"
                      ></v-img>
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-responsive>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
  </div>  -->
</template>

<script>
export default {
  name: "PublicationCard",
  props: ["item"],
  data() {
    return {
      //avatarSize: 0,
      dialog: false,
    };
  },
  methods: {
    avatarSizeTTT() {
      let display = this.$vuetify.breakpoint.name;
      switch (display) {
        case this.$vuetify.breakpoint.lg:
          return 150;
        case this.$vuetify.breakpoint.md:
          return 100;
        case this.$vuetify.breakpoint.xs:
          return 50;
      }
    },
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
  },
  computed: {
  },
};
</script>

<style scoped>
.pub_card {
  max-width: 200px;
}

/* Hover */
.hover-card-container {
  max-width: 70%;
}

/* User */
.card-account-icon-hover {
  font-size: 7em;
}
.card-user-name-hover {
  /* font-size: 2em; */
}
.pub-card-image-hover {
  /* max-width: 50%	; */
}
</style>