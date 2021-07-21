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
    }
  },
  methods: {
    send() {
      // sendGrid service call
    }
  }
}
</script>