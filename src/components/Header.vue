<template>

<nav >
  <v-toolbar>
    <!-- logo -->
    <v-img 
      contain
      src="./../assets/raismes-logo.png"
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
      <span class="mb-2 text-h4">SEL</span>
      <span class="font-weight-light mb-2 text-h4"> Raismes</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <!-- buttons -->
    <v-toolbar-items class="hidden-xs-only">
        <v-btn
          text
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path"
          :class="item.class"
        >
          <v-icon v-if="item.icon != ''" left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
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
        appTitle: 'SEL Raismes',
        sidebar: false,
        menuItems: [
            { title: 'Accueil', path: '/', icon: 'mdi-home' },
            { title: 'Contact', path: '/contact', icon: '' },
            { title: 'à propos', path: '/about', icon: '' },
            //{ title: 'Actualité', path: '/news', icon: '' },
            { title: 'Espace Personnel', path: '/feed', icon: 'mdi-lock', class: 'success'}
        ]
      }
    },
    methods: {
      toHomePage() {
        this.$router.push("/")
      },
      toAdminPage() {
        this.$router.push("/admin")
      }
    }
}
</script>

<style scoped>


</style>