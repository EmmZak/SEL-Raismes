<template>

<nav >
  <v-toolbar>
    <!-- logo -->
    <v-img 
      contain
      src="./../assets/sel-logo-crop.jpg"
      max-width="100%"
      max-height="100%"
      width="0px"
      @click="toHomePage"
    ></v-img>
    <v-spacer></v-spacer>
    <!-- name -->
    <v-toolbar-title
      @click="toHomePage"
    >
      <span class="gradient-text text-h4">{{appTitle}}</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <!-- buttons -->
    <v-toolbar-items class="hidden-xs-only">
        
        <v-btn
          text
          to="/"
        >
          <v-icon left dark>mdi-home</v-icon>
          Accueil 
        </v-btn>
        <v-btn
          text
          to="/contact"
        >
          Contact
        </v-btn>
        <v-btn
          text
          to="/about"
        >
          à propos
        </v-btn>
        <v-btn
          text
          @click="emitAuthEvent"
          class="success"
        >
          <v-icon left dark>mdi-lock</v-icon>
          Espace Personnel
          <!-- {{ signInOutButtonText }} -->
        </v-btn>
      </v-toolbar-items>
  </v-toolbar>
</nav>

</template>

<script>
export default {
    name: "Header",
    data(){
      return {
        appTitle: "Troc D'Heures Raismois",
        sidebar: false
      }
    },
    methods: {
      // trigers event to parent component for auth dialog
      emitAuthEvent() {
        console.log("emitting")
        this.$emit('auth-event')
      },
      toHomePage() {
        if (this.$route.path != '/') {
          this.$router.push('/')
        }
      },
      toAdminPage() {
        this.$router.push("/admin")
      }
    },
    computed: {
      signInOutButtonText() {
        return this.$store.getters.actualUser.id == null 
          ? 'Espace Personnel'
          : 'Déconnexion'
      }
    }
}
</script>

<style scoped>

.gradient-text {
    background-color: #f3ec78;
    background-image: 
        linear-gradient(45deg, 
          #94C11E, 
          #F29209
          );
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent; 
}

</style>