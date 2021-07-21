<template>
  <v-container class="justify-center">
    <v-row 
      align="center"
      justify="center"
      
    >
      <v-col>
        <l-map
          :center="center"
          :zoom="zoom"
          ref="map"
          @update:zoom="zoomUpdated"
          @update:center="centerUpdated"
          style="height: 500px; width: 1000px"
        >
          <l-tile-layer :url="url"></l-tile-layer>

          <!-- marker -->
          <l-marker :lat-lng="marker.coordinates" @click="markerClick">
            <l-icon ref="icon">
              <v-icon class="red--text" x-large>
                mdi-map-marker
              </v-icon>
            </l-icon>
          </l-marker>
        </l-map>
      </v-col>
    </v-row>

    <!-- adress dialog -->
    <v-dialog
      v-model="dialog"
      max-width="600"
      style="position: fixed; z-index: 500"
    >
      <v-card>
        
        <v-toolbar
          color="primary"
          dark
        >
          Adresse du SEL
          <v-spacer></v-spacer>
          <v-btn icon @click="close()">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-row 
            align="center"
            justify="center"
          >
            <v-col class="text-center">
              <v-icon 
                size="200"
              > 
                mdi-map-marker
              </v-icon>
            </v-col>
            <v-col>
              <div class="text-h3 pa-12 text-wrap hidden-sm-and-down">
                Grand place, 59590 Raismes
              </div>
              <div class="text-h5 pa-12 text-wrap hidden-md-and-up">
                Grand place, 59590 Raismes
              </div>
            </v-col>
          </v-row>
        </v-card-text>

      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { LIcon, LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
  },
  data() {
    return {
      dialog: false,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      center: [50.403587663227206, 3.5099710163715776],
      marker: {
        coordinates: [50.403587663227206, 3.5099710163715776],
      },
      zoom: 12,
    };
  },
  methods: {
    close() {
      this.dialog = false
    },
    markerClick() {
      this.dialog = true
    },
    zoomUpdated(zoom) {
      this.zoom = zoom;
      console.log(this.markers);
    },
    centerUpdated(center) {
      this.center = center;
    },
  },
};
</script>

<style>
.map {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>