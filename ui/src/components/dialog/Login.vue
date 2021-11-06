<template>
  <!-- auth dialog -->
  <v-dialog
    v-model="authDialog"
    @click:outside="endAuthEvent"
    max-width="500px"
  >
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
            <v-col align="center" class="pa-2 red rounded">
              <div class="text-h6 white--text font-weight-bold">
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
</template>

<script>
export default {
  name: "Login",
  props: ["show"],
  data() {
    return {
      authLoading: false,
      //authDialog: this.show,
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
    };
  },
  computed: {
    authDialog: {
      get() {
        return this.show;
      },
      set() {
        console.log("AUTHDIALOG SET")
      },
    },
  },
  methods: {
    visit() {
      this.endAuthEvent();
      this.goToPath("/feed");
    },
    createAccountRequest() {
      this.endAuthEvent();
      this.goToPath("/contact");
      //this.$router.push({ path: "/contact", query: { subject: "creation" } });
    },
    async signIn() {
      if (!this.$refs.loginForm.validate()) {
        return;
      }
      console.log("APPvue before signIN ");
      this.authLoading = true;

      try {
        console.log("APP.singing IN");
        let user = await this.$store.dispatch("signIn", this.authData);
        console.log("auth user", user);
        this.endAuthEvent();
        this.goToPath("/feed");
      } catch (error) {
        console.log("App.vue.signIn.error", error);
        this.authError = this.authErrorMap[error.code];
      }
      this.authLoading = false;

      //await this.$store.dispatch("setVisitor", false);
      console.log("APPvue after signIN");
    },
    endAuthEvent() {
      // set authDialog to false in parent component
      this.$emit("auth-event");
    },
  },
};
</script>