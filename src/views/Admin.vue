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
</v-card>

</template>

<script>
import Users from './../components/Users.vue'
import Publications from './../components/Publications.vue'

export default {
    name: 'Admin',

    components: {
        Users,
        Publications
    },
    data() {
        return {
            currentSection: "Offres",
            sectionsList: [Users, Publications],
            sections: ["Users", "Publications"]
        };
    },
    mounted() {
    },
    methods: {
      
    }
}
</script>
