<template>
  <v-app>
    <!-- HeaderApp -->
    <HeaderApp v-if="!isAdminView" @auth-event="openAuthDialog" />

    <!-- <v-btn @click="test">test </v-btn> -->
    <!-- auth dialog -->
    <v-dialog v-model="authDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-lg-h3 text-md-h3 text-sm-h3 text-h5">
          <div class="title-font pa-0">Identification</div>
        </v-card-title>

        <v-card-text>
          <!-- form -->
          <v-form ref="loginForm">
            <v-row class="">
              <v-col class="">
                <v-text-field
                  v-model="authData.mail"
                  :rules="emailRules"
                  label="E-mail"
                  prepend-icon="mdi-email"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="authData.password"
                  :rules="passwordRules"
                  label="Mot de passe"
                  prepend-icon="mdi-lock"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- error -->
            <v-row v-if="authError != ''" class="pa-2">
              <v-col align="center" class="pa-2 red lighten-4 rounded">
                <div class="text-h6 red--text font-weight-bold">
                  <div class="title-font">{{ authError }}</div>
                </div>
              </v-col>
            </v-row>
            <!-- buttons -->
            <v-row justify="space-around" class="">
              <v-col
                class=""
                align="center"
                xl="6"
                lg="6"
                md="6"
                sm="6"
                cols="12"
              >
                <v-btn
                  class="success"
                  @click="signIn"
                  :loading="authLoading"
                  x-large
                  block
                >
                  Se Connecter
                </v-btn>
              </v-col>
              <v-col
                class=""
                align="center"
                xl="6"
                lg="6"
                md="6"
                sm="6"
                cols="12"
              >
                <v-btn
                  class="primary"
                  @click="createAccountRequest"
                  x-large
                  block
                >
                  Pas de compte ?
                </v-btn></v-col
              >
            </v-row>
            <v-row class="pa-2" justify="center">
              <v-btn class="warning" x-large @click="visit" block>
                Visiter l'espace
              </v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- router -->
    <v-main>
      <router-view />
    </v-main>

    <!-- footer -->
    <Footer v-if="!isAdminView" />
  </v-app>
</template>

<script>
//import Header from "./components/Header.vue"
import HeaderApp from "./components/HeaderApp.vue";
import Footer from "./components/Footer.vue";
import { emailRules, passwordRules } from "./store/globals";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Footer,
    //Header,
    HeaderApp,
  },
  data: () => ({
    admin: false,
    authLoading: false,
    authDialog: false,
    authError: "",
    authErrorMap: {
      "auth/invalid-email": "Le mail saisi n'est pas valide",
      "auth/wrong-password": "Mot de passe incorrect",
      "auth/user-not-found": "Le mail saisi n'existe pas",
      "auth/too-many-requests": "Veuillez essayer plus tard",
    },
    authData: {
      mail: "", //"aymeric@robin.fr",
      password: "", //raismes",
    },
    // form
    emailRules: emailRules,
    passwordRules,
  }),
  async created() {
    console.log("APP CREATED");
    document.title = "Troc D'Heures Raismois";
	//await this.fetchCategories()
  },
  async mounted() {
    console.log("MOUNTED: init, fetching categories");
	//await this.fetchCategories()
  },
  methods: {
	...mapActions(["fetchCategories"]),
    async openAuthDialog() {
      console.log("opening auth dialog");
      let route = this.$route.name;
      if (route == "Feed"  /*&& signedIn*/) {
        console.log("sign out");
        await this.signOut();
        console.log("signed out");
        return;
      }
      console.log("checking if connected");
      let authUser = null//isConnected();
      console.log("isConnected authUser", authUser);
      if (authUser) {
        console.log("already logged");
        if (route != "Feed") {
          this.$router.push("/feed");
        }
      } else {
        //this.authData.mail = "";
        //this.authData.password = "";
        this.authDialog = true;
      }
    },
    async signIn() {
      if (!this.$refs.loginForm.validate()) {
        return;
      }
      console.log("APPvue before signIN ");
      this.authLoading = true;

      try {
        let user = await this.$store.dispatch("signIn", this.authData);
        console.log("auth user", user);
        this.authDialog = false;
        // if (this.$route.name != "Feed") {
        //   this.$router.push("/feed");
        // }
        this.$router.push("/feed");
      } catch (error) {
        console.log("App.vue.signIn.error", error);
        this.authError = this.authErrorMap[error.code];
      }
      this.authLoading = false;

      await this.$store.dispatch("setVisitor", false);
      console.log("APPvue after signIN");
    },
    async signOut() {
      try {
        await this.$store.dispatch("signOut");
        this.$router.push("/");
      } catch (error) {
        console.log("signout error", error);
      }
    },
    // if no account, go to contact page with create accoutn header
    createAccountRequest() {
      this.authDialog = false;
      this.$router.push({ path: "/contact", query: { subject: "creation" } });
    },
    // continue without sign in and up
    async visit() {
      await this.$store.dispatch("setVisitor", true);
      this.authDialog = false;
      if (this.$route.name != "Feed") {
        this.$router.push({ path: "/feed" });
      }
    },
    test() {
      let storeUser = this.$store.getters.actualUser;
      //console.log("user", user)
      console.log("storeUser", storeUser);
    },
  },
  computed: {
    actualUser() {
      console.log("actualUser", this.$store.getters.actualUser);
      return this.$store.getters.actualUser;
    },
    isAdminView() {
      console.log("actualRoute", this.$route.name);
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