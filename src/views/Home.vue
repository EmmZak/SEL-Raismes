<template>

<div>
  <!-- Carousel -->
  <v-carousel
    cycle
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(item,i) in carousel_images"
      :key="i"
      :src="item.src"
      :interval="interval"
    ></v-carousel-item>
  </v-carousel>

  <!-- fb -->
  fb view
  <div style="width: 100px;">
    <!-- Page plugin's width will be 180px -->
    <div class="fb-page" data-href="https://m.facebook.com/Troc-dheures-raismois-108325714810910/" data-width="320"></div>
  </div>
  done
</div>


</template>
src/
<script>

export default {
  name: 'Home',

  data() {
    return {
      interval: 1000,
      carousel_images: [
        { src: "https://www.ville-raismes.fr/fileadmin/_processed_/4/7/csm_Banniere_ete2021-web-low_bbf2947368.jpg" },
        { src: "https://www.portes-haut-doubs.com/sites/portes-haut-doubs.com/files/Vivre_au_quotidien/S_investir_dans_une_association/association.jpg" },
        { src: "https://www.ionos.fr/startupguide/fileadmin/StartupGuide/Teaser/group-of-people-t.jpg" }
      ]
    }
  },
  components: {
    
  },
  methods: {

  },
  computed: {
  },
  mounted() {
  }
  
}
</script>

<style scoped>

</style>