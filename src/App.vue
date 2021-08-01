<template>
  <v-app>
    <!-- header -->
    <Header @auth-event="openAuthDialog" />
    
    <v-btn @click="test">test </v-btn>
    <!-- auth dialog -->
    <v-dialog v-model="authDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h4"> Identification </span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="authData.mail"
                  label="E-mail"
                  prepend-icon="mdi-email"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="authData.password"
                  label="Mot de passe"
                  prepend-icon="mdi-lock"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- error message -->
            <v-row v-if="authError != ''" >
              <v-card-title class="card-title">
                <span 
                  class="font-weight-light md red--text"
                > 
                  <v-icon>mdi-alert</v-icon> {{ authError }}
                </span>
              </v-card-title>
            </v-row>
            <v-row justify="space-around">
              <v-btn  
                class="success" 
                @click="signIn"
                :loading="authLoading"
              > 
                Se Connecter 
              </v-btn>
              <v-btn class="primary" @click="createAccountRequest">
                Pas de compte ?
              </v-btn>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- router -->
    <div>
      <v-main>
        <router-view />
      </v-main>
    </div>

    <!-- footer -->
    <Footer />
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",

  components: {
    Footer,
    Header,
  },
  data: () => ({
    authLoading: false,
    authDialog: false,
    authError: "",
    authErrorMap: {
      'auth/invalid-email': "Le mail saisi n'est pas valide",
      'auth/wrong-password': 'Mot de passe incorrect',
      'auth/user-not-found': "Le mail saisi n'existe pas",
      'auth/too-many-requests': 'Veuillez essayer plus tard'
    },
    authData: {
      mail: '',
      password: '',
    },
  }),
  methods: {
    openAuthDialog() {
      let storeUser = this.$store.getters.actualUser
      console.log("storeUser", storeUser)
      if (storeUser.id != null) {
        console.log("already logged")
        this.$router.push('/feed')
      } else {
        this.authData.mail = ''
        this.authData.password = '' 
        this.authDialog = true;
      }
    },
    async signIn() {
      console.log("APPvue before signIN ");
      this.authLoading = true;

      try {
        await this.$store.dispatch("signIn", this.authData)
        this.authDialog = false;
        this.$router.push('/feed')

      } catch (error) {
        console.log("App.vue.signIn.error", error)
        this.authError = this.authErrorMap[error.code]
      }
      this.authLoading = false;

      console.log("APPvue after signIN");
    },
    // if no account, go to contact page with create accoutn header
    createAccountRequest() {
      this.authDialog = false;
      this.$router.push({ path: "/contact", query: { subject: "creation" } });
    },
    test() {
      //let user = firebase.auth().currentUser
      let storeUser = this.$store.getters.actualUser
      //console.log("user", user)
      console.log("storeUser", storeUser)
    }
  },
  computed: {
    actualUser() {
      console.log("actualUser", this.$store.getters.actualUser);
      return this.$store.getters.actualUser;
    },
  },
};
</script>

<style scoped>
</style>