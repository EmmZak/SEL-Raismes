<template>
  <v-app-bar app prominent clipped-left class="white" height="84px">
    <!-- mobile navbar  -->
    <v-app-bar-nav-icon
      class="hidden-sm-and-up"
      x-large
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-navigation-drawer v-model="drawer" absolute app temporary>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        x-large
      ></v-app-bar-nav-icon>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="./../assets/sel-logo-crop-min-150.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Trod D'Heures Raismois</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-btn
            :class="item.color"
            text
            :to="item.to"
            class="justify-start"
            width="100%"
            x-large
          >
            <v-icon left dark> {{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-img
      contain
      src="./../assets/sel-logo-crop-min-150.jpg"
      width="150px"
      height="100%"
      @click="toHomePage"
    ></v-img>

    <v-spacer class="hidden-md-and-down"></v-spacer>

    <v-toolbar-title @click="toHomePage">
      <div class="text-lg-h3 hidden-md-and-down gradient-text">
        Troc D'Heures Raismois
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
        <div 
          v-text="this.$route.name == 'Feed' 
            && !this.$store.getters.visitor ? 'Déconnexion': 'Se Connecter'">
        </div>
      </v-btn>
      <!-- <v-btn @click="user()">user</v-btn> -->
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>

export default {
  name: "HeaderApp",
  data() {
    return {
      out: "Log Out",
      drawer: false,
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
    user() {
      
    },
    // trigers event to parent component for auth dialog
    emitAuthEvent() {
      console.log("emitting with route ", this.$route.name);
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
    isVisitor() {
      //return this.$store.getters.visitor
      return false
      //return isConnected()==null
    },
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