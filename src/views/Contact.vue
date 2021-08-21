<template>
  <v-container class="pt-16" fluid>
    <v-row justify="center">
      <!-- info section -->
      <v-col md="4">
        <v-card elevation="0">
          <!-- title -->
          <v-card-title>
            <span class="text-h4 font-weight-bold">Contactez-nous</span>
          </v-card-title>
          <!-- adresse -->
          <br />
          <v-card-title class="text-h5">
            Mairie Annexe De Sabatier <br />
            Rue Léopold Dussart <br />
            59590 <br />
            Raismes
          </v-card-title>
          <!-- mail -->
          <v-card-title class="text-h5 blue--text text-decoration-underline">
            trocdheuresraismois@gmail.com
          </v-card-title>
          <!-- number -->
          <v-card-title class="text-h5"> 03-27-25-54-89 </v-card-title>
        </v-card>
      </v-col>
      <!-- form section -->
      <v-col md="4">
        <v-card elevation="0" class="pa-0">
          <!-- title -->
          <v-card-title>
            <span class="text-h4 font-weight-bold"
              >Envoyez-nous un message</span
            >
          </v-card-title>
          <!-- fields -->
          <v-card-text class="pl-0">
            <v-container class="pa-0">
              <v-row>
                <v-col>
                  <v-select
                    :items="subjects"
                    label="Sujét"
                    v-model="subject"
                    :rules="subjectRules"
                    prepend-icon="mdi-help"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Nom - Prénom"
                    prepend-icon="mdi-account"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    prepend-icon="mdi-email"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="number"
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
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn block class="success pt-0" @click="send()" large>
              Envoyer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!--  
    <v-row align="center" justify="center">
      <v-card elevation="10" width="50%">
        <v-card-title>
          <span class="text-h2">Contact</span>
        </v-card-title>

        <br />

        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-select
                  :items="subjects"
                  label="Sujét"
                  v-model="subject"
                  :rules="subjectRules"
                  prepend-icon="mdi-help"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  label="Nom - Prénom"
                  prepend-icon="mdi-account"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  prepend-icon="mdi-email"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="number"
                  label="Numéro"
                  prepend-icon="mdi-phone"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  v-model="message"
                  :rules="messageRules"
                  label="Message ..."
                  prepend-icon="mdi-message"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn block color="success  " @click="send()" large> Envoyer </v-btn>
        </v-card-actions>
      </v-card>
    </v-row> -->

    <!-- map -->
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Contact",
  data() {
    return {
      adresse: "Grand place,<br/> 59590<br/> Raismes",
      subjects: [
        "Création compte",
        "Renseignements",
        "Annonce",
        "Demande de service",
      ],
      subjectsMap: {
        creation: "Création compte",
      },
      sender: "selraismes@gmail.com",
      AWS_LAMBDA_URL:
        "https://xk63di4om5.execute-api.us-east-2.amazonaws.com/default/NodeSendMail",
      valid: false,

      // mail params
      subject: "",
      subjectRules: [(v) => !!v || "Veuillez choisir un sujét"],
      name: "",
      nameRules: [(v) => !!v || "Veuillez saisir un nom"],
      email: "",
      emailRules: [
        (v) => !!v || "Veuillez saisir votre mail",
        (v) => /.+@.+\..+/.test(v) || "Le mail n'est pas correct",
      ],
      number: "",
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
      await axios
        .post(
          this.AWS_LAMBDA_URL,
          {
            headers: this.headers,
          },
          this.data
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      // sendGrid service call
    },
  },
};
</script>