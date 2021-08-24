<template>
  <v-container fluid class="red">
    <v-card class="">
      <v-row>
        <v-col md="7">
          <v-img src="./../assets/home-page.jpg" class="rounded-lg"></v-img>
        </v-col>
        <v-col>
          <v-card flat>
            <v-card-title class="text-h2">Troc D'Heures Raismois</v-card-title>

            <div></div>
          </v-card>
        </v-col>
      </v-row>

      <!--  
      <v-card-title class="text-h3 justify-center">
        Troc d'heures raismois
      </v-card-title> -->
    </v-card>

    <v-row class="" align="center" justify="center">
      <v-col md="8">
        <div class="map-responsive">
          <iframe
            style="border: 0"
            loading="lazy"
            allowfullscreen
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDgI1A9YSRRa4AVAZZE5VfFnokytTACUa0&q=50.403587663227206, 3.5099710163715776"
          >
          </iframe>
        </div>
      </v-col>
    </v-row>

  </v-container>

  <!-- Carousel 
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
  </v-carousel> -->

  <!-- fb 
  fb view
  <div style="width: 100px;">
    <div class="fb-page" data-href="https://m.facebook.com/Troc-dheures-raismois-108325714810910/" data-width="320"></div>
  </div>
  done
  -->
</template>
src/
<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      // map
      dialog: false,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      center: [50.403587663227206, 3.5099710163715776],
      marker: {
        coordinates: [50.403587663227206, 3.5099710163715776],
      },
      zoom: 12,
      // carousel
      interval: 1000,
      carousel_images: [
        {
          src: "https://www.ville-raismes.fr/fileadmin/_processed_/4/7/csm_Banniere_ete2021-web-low_bbf2947368.jpg",
        },
        {
          src: "https://www.portes-haut-doubs.com/sites/portes-haut-doubs.com/files/Vivre_au_quotidien/S_investir_dans_une_association/association.jpg",
        },
        {
          src: "https://www.ionos.fr/startupguide/fileadmin/StartupGuide/Teaser/group-of-people-t.jpg",
        },
        {
          src: "https://scontent-cdg2-1.xx.fbcdn.net/v/t1.6435-9/198320773_109546518022163_6970041527137788969_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=e3f864&_nc_ohc=wQk4WPTnnp8AX9GR5kj&tn=x_opG47Ar91GS5wb&_nc_ht=scontent-cdg2-1.xx&oh=18157306bc70dafa2a54a480665646b9&oe=612F9E2B",
        },
      ],
    };
  },
  methods: {
    close() {
      this.dialog = false;
    },
    markerClick() {
      //this.dialog = true;
      window.open(
        "https://maps.google.com/?q=50.403522477580154,3.509962397737272"
      );
    },
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
  },
  computed: {},
  mounted() {},
};
</script>

<style>
.map-responsive {
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
}

.map-responsive iframe {
  left: 0;
  top: 0;
  height: 75%;
  width: 100%;
  position: absolute;
}
</style>