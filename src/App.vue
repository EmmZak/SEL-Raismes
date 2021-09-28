<template>
  <v-app>
    <!-- HeaderApp -->
    <HeaderApp v-if="!isAdminView" @auth-event="openAuthDialog" />

    <!-- <v-btn @click="test">test </v-btn> -->
    <!-- auth dialog -->
    <v-dialog v-model="authDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-lg-h3 text-md-h3 text-sm-h3 text-h5">
          <div class="title-font pa-2">Identification</div>
        </v-card-title>

        <v-card-text>
          <v-form ref="loginForm">
            <v-row>
              <v-col>
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
            <v-row justify="space-around">
              <v-btn
                class="success"
                @click="signIn"
                :loading="authLoading"
                x-large
              >
                Se Connecter
              </v-btn>
              <v-btn class="primary" @click="createAccountRequest" x-large>
                Pas de compte ?
              </v-btn>
            </v-row>
            <v-row class="pa-5" justify="center">
              <v-col>
                <v-btn class="warning" x-large @click="visit">
                  Continuer en tant que visiteur
                </v-btn>
              </v-col>
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
//import { getAuth } from "firebase/auth";
import HeaderApp from "./components/HeaderApp.vue";
import Footer from "./components/Footer.vue";
import { emailRules, passwordRules } from './store/globals'
import { isConnected } from './store/firebaseService'

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
    passwordRules
  }),
  created() {
    console.log("APP CREATED");
    document.title = "Troc D'Heures Raismois";
    
  },
  async mounted() {
    console.log("APP MOUNTED");
  },
  methods: {
    async openAuthDialog() {
      console.log("opening auth dialog")
      let route = this.$route.name;
      if (route == "Feed" && isConnected() != null) {
        console.log("sign out")
        await this.signOut();
        console.log("signed out")
        return;
      }
      console.log("checking if connected")
      let authUser = isConnected();
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
        return
      }
      console.log("APPvue before signIN ");
      this.authLoading = true;

      try {
        let user = await this.$store.dispatch("signIn", this.authData);
        console.log("auth user", user)
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
      //let user = firebase.auth().currentUser
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