<template>
  <v-app-bar app prominent class="white" height="84px">
    <!-- mobile navbar  -->
    <v-app-bar-nav-icon
      class="hidden-sm-and-up"
      x-large
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-navigation-drawer v-model="drawer" absolute app temporary>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" x-large></v-app-bar-nav-icon>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="./../assets/sel-logo.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Trod D'Heures Raismois</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-btn :class="item.color" text :to="item.to" class="text--center" width="100%" x-large >
            <v-icon left dark> {{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  
    <v-img
      contain
      src="./../assets/sel-logo-crop-min.jpg"
      
      width="150px"
      height="100%"
      @click="test"
    ></v-img>

    <v-spacer class="hidden-md-and-down"></v-spacer>

    <v-toolbar-title @click="toHomePage">
      <!-- 
      <div class="text-lg-h3 text-md-h4 text-sm-body-h5 gradient-text">
        {{ appTitle }}
      </div>  -->
      <div class="text-lg-h3 hidden-md-and-down gradient-text">
        {{ appTitle }}
      </div> 
    </v-toolbar-title>

    <v-spacer class="hidden-md-and-down"></v-spacer>

    <v-toolbar-items class="hidden-xs-only">
      <v-btn text to="/">
        <v-icon left dark>mdi-home</v-icon>
        <span class="">Accueil</span>
      </v-btn>
      <v-btn text to="/contact"> Contact </v-btn>
      <v-btn text to="/about"> à propos </v-btn>
      <v-btn text @click="emitAuthEvent" class="success">
        <v-icon left dark>mdi-lock</v-icon>
        Espace Personnel
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  name: "HeaderApp",
  data() {
    return {
      titleSize: 'text-lg-h2 text-md-h3 text-sm-body-h5',
      appTitle: "Troc D'Heures Raismois",
      drawer: false,
      group: null,
      items: [
        { to: "/", icon: "mdi-home", title: "Accueil", color: "" },
        {
          to: "/contact",
          icon: "mdi-card-account-phone",
          title: "Contact",
          color: "",
        },
        { to: "/about", icon: "mdi-information", title: "A Propos", color: "" },
        {
          to: "/feed",
          icon: "mdi-lock",
          title: "Espace Personnel",
          color: "success",
        },
      ],
    };
  },
  methods: {
    // trigers event to parent component for auth dialog
    emitAuthEvent() {
      console.log("emitting");
      this.$emit("auth-event");
    },
    toHomePage() {
      if (this.$route.path != "/") {
        this.$router.push("/");
      }
    },
    toAdminPage() {
      this.$router.push("/admin");
    },
    test() {
      console.log(this.$vuetify.breakpoint.name);
    },
  },
  computed: {
    signInOutButtonText() {
      return this.$store.getters.actualUser.id == null
        ? "Espace Personnel"
        : "Déconnexion";
    },
    NavBtnText() {
      let size = "";
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          size = "h6";
          break;
        case "sm":
          size = "h5";
          break;
        case "md":
          size = "h4";
          break;
        case "lg":
          size = "h3";
          break;
        case "xl":
          size = "h2";
          break;
      }

      return size;
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style scoped>

/deep/ .v-toolbar__content {
  padding-top: 0;
  padding-left: 30px;
  padding-right: 30px;
}

.gradient-text {
  background-color: #f3ec78;
  background-image: linear-gradient(45deg, #94c11e, #f29209);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>