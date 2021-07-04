<template>
<v-card>
  <v-toolbar
    color="deep-purple accent-4"
    dark
    flat
  >

    <template v-slot:extension>
      <v-tabs
        v-model="currentSection"
        fixed-tabs
        slider-color="white"
      >
        <v-tab
          v-for="(section, i) in sections"
          :key="i"
        >
          {{ section }}
        </v-tab>

      </v-tabs>
    </template>
  </v-toolbar>

  <v-tabs-items v-model="currentSection">
    <v-tab-item
      v-for="(section, i) in sections"
      :key="i"
    >
      <v-card flat>
        <component v-bind:is="sectionsList[i]" />
      </v-card>
    </v-tab-item>
  </v-tabs-items>

  publications
  <Publications />

</v-card>


</template>

<script>
import Offres from './Offres.vue';
import Demandes from './Demandes.vue';
import Publications from './PublicationsList.vue';

export default {
    name: "Sections",

    components: {
      Offres,
      Demandes,
      Publications
    },

    data() {
        return {
            currentSection: "Offres",
            sectionsList: [Offres, Demandes],
            sections: ["Offres", "Demandes"]
        };
    },
    mounted() {
    },
    methods: {
      
    }
}
</script>

<style scoped>

#section {
    background-color: red;
}

</style>