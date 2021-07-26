<template>

<v-container class="pt-10">
  <v-row 
    align="center"
    justify="center"
  >
  <v-card elevation="10" width="50%">
    <br>
    <v-card-title>
      <span class="text-h2">Contact</span>
    </v-card-title>

    <br>

    <v-card-text>
      <v-container>
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
      valid: false,
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
      mailHeaders: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      },
      mailData: {
        "personalizations": [
                {
                  "to": [
                      {
                        "email": "selraismes@gmail.com",
                        "name": "To Name"
                      }
                  ],
                  "subject": "Contact Sel Raismes"
                }
            ],
        "content": [
          {
              "type": "text/plain",
              "value": "Heya!"
          }
        ],
        "from": {
            "email": this.email,
            "name": this.name
          },
        "reply_to": {
            "email": this.email,
            "name": this.name
        }
      }
    }
  },
  methods: {
    send() {
      axios 
        .post("https://api.sendgrid.com/v2/mail/send", this.mailHeaders, this.mailData)
        .then(res => console.log(res))
        .catch(err => console.log(err))
      // sendGrid service call
    }
  }
}
</script>