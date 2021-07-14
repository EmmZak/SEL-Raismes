<template>
  <v-app>

    <!-- header -->
    <Header />

    <!-- router -->
    <div>
      <v-main>
        <router-view/>
      </v-main>
    </div>

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

<style scoped>
  

</style>