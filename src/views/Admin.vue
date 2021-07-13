<template>
<v-card id="admin_panel">

  <v-btn @click="toHomePage()">Accueil</v-btn>

  <v-toolbar
    color="blue"
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
import AdminList from '../components/AdminList.vue'
import UsersList from '../components/UsersList.vue'
import PublicationsList from '../components/PublicationsList.vue'

export default {
    name: 'Admin',

    components: {
        AdminList,
        UsersList,
        PublicationsList
    },
    data() {
        return {
            currentSection: "Offres",
            sectionsList: [AdminList, UsersList, PublicationsList],
            sections: ["Admin", "Sélistes", "Publications"]
        };
    },
    mounted() {
    },
    methods: {
      toHomePage() {
        this.$router.push("/")
      }
    }
}
</script>

<style scoped>

#admin_panel {
  width: 90%;
  
  left: 5%;
}

</style>