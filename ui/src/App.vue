<template>
  <v-app>
    <!-- HeaderApp -->
    <!-- <HeaderApp v-if="!isAdminView" @auth-event="openAuthDialog" /> -->
    <HeaderApp v-if="!isAdminView" @auth-event="startAuthEvent" />
    <!-- <v-btn @click="test">test </v-btn> -->

    <Login :show="authDialog" @auth-event="endAuthEvent" />

    <!-- router -->
    <v-main>
      <router-view />
    </v-main>

    <!-- footer -->
    <Footer v-if="!isAdminView" />
  </v-app>
</template>

<script>
import HeaderApp from "./components/HeaderApp.vue";
import Footer from "./components/Footer.vue";
import Login from "./components/dialog/Login.vue";
// import { getUserFirebase } from "./services/account"

export default {
  name: "App",
  components: {
    Footer,
    HeaderApp,
    Login,
  },
  data: () => ({
    admin: false,
    authDialog: false,
  }),
  async created() {
    console.log("APP CREATED");
    document.title = "Troc D'Heures Raismois";

    // let user = this.$store.getters.user
    // if (user == null) {
    //   console.log("APP: user=", user)
    //   const currentPath = this.getCurrentPath();
    //   if (["/feed", "/users"].includes(currentPath)) {
    //     this.goToPath("/");
    //   }
    // }
  },
  async mounted() {
    let user = this.$store.getters.user;
    if (user == null) {
      console.log("APP: user=", user);
      const currentPath = this.getCurrentPath();
      if (["/feed", "/users"].includes(currentPath)) {
        //this.goToPath("/");
      }
    }
  },
  methods: {
    async startAuthEvent() {
      console.log("checking if connected");
      let authUser = this.$store.getters.user; //isConnected();
      console.log("isConnected authUser", authUser);
      if (authUser) {
        console.log("already logged");
        this.goToPath("/feed");
      } else {
        //this.authData.mail = "";
        //this.authData.password = "";
        this.authDialog = true;
      }
    },
    endAuthEvent() {
      this.authDialog = false;
    },
    test() {
      let storeUser = this.$store.getters.actualUser;
      console.log("storeUser", storeUser);
    },
  },
  computed: {
    actualUser() {
      console.log("actualUser", this.$store.getters.actualUser);
      return this.$store.getters.actualUser;
    },
    isAdminView() {
      //console.log("actualRoute", this.$route.name);
      return this.$route.name == "Admin";
    },
  },
};
</script>

<style>
.title-font {
  font-family: "Open Sans", sans-serif;
}
</style>