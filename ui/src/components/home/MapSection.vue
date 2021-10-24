<template>
  <v-row justify="center">
    <v-col cols="12" class="deep-orange accent-2 d-flex justify-center pa-10">
      <div class="text-lg-h2 text-md-h3 text-sm-body-h4 text-h5">
        <div class="title-font white--text">Où sommes-nous ?</div>
      </div>
    </v-col>
    <v-col md="8">
      <div class="map-responsive red">
        <iframe
          style="border: 0"
          loading="lazy"
          :src="`https://www.google.com/maps/embed/v1/place?key=AIzaSyDgI1A9YSRRa4AVAZZE5VfFnokytTACUa0&q=${coor.x}, ${coor.y}`"
        >
        </iframe>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "MapSection",
  data() {
    return {
      coor: {
        x: 50.403774,
        y: 3.509751,
      },
      dialog: false,
      zoom: 12,
    };
  },
};
</script>

<style>
.map-responsive-old {
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
}

.map-responsive {
  position: relative;
  padding-bottom: 45%;
}

.map-responsive iframe {
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>