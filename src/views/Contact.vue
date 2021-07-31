<template>

<v-container class="pt-5">
  <v-row 
    align="center"
    justify="center"
  >
  <v-card elevation="10" width="50%">
    
    <v-card-title>
      <span class="text-h2">Contact</span>
    </v-card-title>

    <br>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col >
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
      <v-btn
        block 
        color="success  "
        @click="send()"
        large
      >
        Envoyer    
      </v-btn>
    </v-card-actions>
  </v-card>

  </v-row>

</v-container>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Contact',
  data() {
    return {
      
      subjects: ["Création compte", "Renseignements", "Annonce", "Demande de service"],
      subjectsMap: {
        "creation": "Création compte"
      },
      sender: "selraismes@gmail.com",
      AWS_LAMBDA_URL: "https://xk63di4om5.execute-api.us-east-2.amazonaws.com/default/NodeSendMail",
      valid: false,
      
      // mail params
      subject: "",
      subjectRules: [
        v => !!v || 'Veuillez choisir un sujét',
      ],
      name: "",
      nameRules: [
        v => !!v || 'Veuillez saisir un nom',
      ],
      email: "",
      emailRules: [
        v => !!v || 'Veuillez saisir votre mail',
        v => /.+@.+\..+/.test(v) || "Le mail n'est pas correct",
      ],
      number: "",
      message: "",
      messageRules: [
        v => v.length < 100 || 'Le message est très long',
      ],
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials" : true,
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      data: {
        message: this.message
      }
    }
  },
  mounted() {
    let subjectName = this.$route.query.subject
    this.subject = this.subjectsMap[subjectName]
  },
  methods: {
    async send() {
      await axios 
        .post(
          this.AWS_LAMBDA_URL, 
          {
            headers: this.headers
          },
          this.data
        )
        .then(res => console.log(res))
        .catch(err => console.log(err))
      // sendGrid service call
    }
  }
}
</script>