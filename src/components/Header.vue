<template>

<nav>
  <v-toolbar>
    <v-spacer></v-spacer>
    <!-- name -->
    <v-toolbar-title>
      <span class="mb-2 text-h4">SEL</span>
      <span class="font-weight-light mb-2 text-h4"> Raismes</span>
    </v-toolbar-title>

    <!-- logo -->
    <v-img 
      contain
      src="./../assets/raismes-logo.png"
      max-width="100%"
      max-height="100%"
    ></v-img>

    <v-spacer></v-spacer>
    <!-- buttons -->
    <v-btn 
      color="success"
      elevation="3"
      to="/feed"
    >
      <v-icon>mdi-lock</v-icon>
      
      Espace Personnel
    </v-btn>
    <v-spacer></v-spacer>
  </v-toolbar>
</nav>

</template>

<script>
export default {
    name: "Header",
    data(){
      return {
        appTitle: 'SEL Raismes',
        sidebar: false,
        menuItems: [
            { title: 'Home', path: '/home', icon: 'home' },
            { title: 'Sign Up', path: '/signup', icon: 'face' },
            { title: 'Espace Personnel', path: '/feed', icon: 'lock' }
        ]
      }
    },
    methods: {
      toAdminPage() {
        this.$router.push("/admin")
      }
    }
}
</script>