<template>
  <v-app>

    <!-- header -->
    <Header />

    <v-main>
      <router-view/>
    </v-main>

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
    //
  }),
};
</script>
