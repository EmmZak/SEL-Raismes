<template>
  <v-app>

    <!-- header -->
    <Header @auth-event="auth" /> 

    <!-- auth dialog -->
    <v-dialog
      v-model="authDialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h4"> Identification </span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="authMail"
                  label="E-mail"
                  prepend-icon="mdi-email"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="authPass"
                  label="Mot de passe"
                  prepend-icon="mdi-lock"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="space-around">
              <v-btn
                class="success"
              >
                Se Connecter
              </v-btn>
              <v-btn
                class="primary"
                @click="createAccountRequest"
              >
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
        <router-view/>
      </v-main>
    </div>

    <!-- footer -->
    <Footer/>

  </v-app>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',

  components: {
    Footer, 
    Header
  },
  data: () => ({
    authDialog: false,
    authError: "",
    authMail: "",
    authPass: ""
  }),
  methods: {
    auth() {
      this.authDialog = true
    },
    // if no account, go to contact page with create accoutn header
    createAccountRequest() {
      this.authDialog = false
      this.$router.push({ path: '/contact', query: { subject: 'creation' } })
    }
  }
};
</script>

<style scoped>
  

</style>