<template>
  <v-container class="pt-16" fluid>
    <v-row justify="center" class="">
      <!-- info section -->
      <v-col cols="12" xs="6" md="4">
        <v-card elevation="0" class="pa-5">
          <v-card-title
            class="d-none d-sm-flex text-lg-h3 text-md-h3 text-sm-h3 text-h5"
          >
            <div class="title-font font-weight-bold">Contactez-nous</div>
          </v-card-title>
          <v-card-title
            class="
              d-flex d-sm-none
              blue
              text-lg-h3 text-md-h3 text-sm-h3 text-h5
            "
          >
            <div class="title-font font-weight-bold white--text">
              Contactez-nous
            </div>
          </v-card-title>
          <br />
          <v-card-title class="text-h5">
            Mairie Annexe De Sabatier <br />
            Rue Léopold Dussart <br />
            59590 <br />
            Raismes
          </v-card-title>
          <v-card-title class="text-h5 blue--text text-decoration-underline">
            trocdheuresraismois@gmail.com
          </v-card-title>
          <v-card-title class="text-h5"> 03-27-25-54-89 </v-card-title>
        </v-card>
      </v-col>

      <!--  -->
      <v-col cols="12" xs="12" md="5">
        <v-card v-if="!sentSucceess" elevation="0" class="pa-5 red-xs-only">
          <v-card-title
            class="d-none d-sm-flex text-lg-h3 text-md-h3 text-sm-h3 text-h5"
          >
            <div class="title-font font-weight-bold">
              Envoyez-nous un message
            </div>
          </v-card-title>
          <v-card-title
            class="
              d-flex d-sm-none
              green
              text-lg-h3 text-md-h3 text-sm-h3 text-h5
            "
          >
            <div class="title-font font-weight-bold white--text">
              Envoyez-nous un message
            </div>
          </v-card-title>
          <!-- form -->
          <v-card-text class="pl-0">
            <v-form class="pt-5" ref="contactForm" v-model="valid">
              <v-row>
                <v-col>
                  <v-select
                    :items="subjects"
                    label="Sujét"
                    v-model="subject"
                    :rules="subjectRules"
                    prepend-icon="mdi-help"
                    required
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" lg="6">
                  <v-text-field
                    v-model="surname"
                    :rules="nameRules"
                    label="Nom"
                    prepend-icon="mdi-account"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6">
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Prénom"
                    prepend-icon="mdi-account"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" lg="6">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    prepend-icon="mdi-email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6">
                  <v-text-field
                    v-model="number"
                    :rules="numberRules"
                    label="Numéro"
                    prepend-icon="mdi-phone"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pb-0">
                  <v-textarea
                    v-model="message"
                    :rules="messageRules"
                    label="Message ..."
                    prepend-icon="mdi-message"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn block class="success pt-0" @click="send()" large>
              Envoyer
            </v-btn>
          </v-card-actions>
        </v-card>
        <!-- else -->
        <v-card v-else> else </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Contact",
  data() {
    return {
      sentSucceess: false,
      valid: false,
      subjects: [
        "Création compte",
        "Renseignements",
        "Annonce",
        "Demande de service",
      ],
      AWS_LAMBDA_URL:
        "https://a5qvtjd4al.execute-api.us-east-2.amazonaws.com/default/pythonMail",
      // mail params
      subject: "",
      subjectRules: [(v) => !!v || "Veuillez choisir un sujét"],
      name: "",
      nameRules: [(v) => !!v || "Veuillez saisir un nom/prénom"],
      surname: "",
      email: "",
      emailRules: [
        (v) => !!v || "Veuillez saisir votre mail",
        (v) => /.+@.+\..+/.test(v) || "Le mail n'est pas correct",
      ],
      number: "",
      numberRules: [
        //(v) => !!v || "Veuillez saisir votre numéro",
        (v) => v.length == 10 || "Le numéro n'est pas correct",
        (v) => !isNaN(v) || "Seuls les chiffres sont autorisés",
      ],
      message: "",
      messageRules: [(v) => v.length < 100 || "Le message est très long"],
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      data: {
        message: this.message,
      },
    };
  },
  mounted() {
    let subjectName = this.$route.query.subject;
    this.subject = this.subjectsMap[subjectName];
  },
  methods: {
    async send() {
      if (this.$refs.contactForm.validate()) {
        console.log("sending request ");
      }
      await axios
        .get(this.AWS_LAMBDA_URL)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      /*
      await axios
        .get(this.AWS_LAMBDA_URL, this.headers, {
          mail_from: "emmanuelzakaryan@gmail.com",
          reply_to: "emmanuelzakaryan@gmail.com",
          subject: "Inscription",
          body: "bonjor, \naws lambda",
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err)); */
      //this.sentSucceess = true
    },
  },
};
</script>

<style>
.title-font {
  font-family: "Open Sans", sans-serif;
}
</style>