<template>
  <v-container id="admin_panel" fluid>
    <!-- side menu -->
    <v-navigation-drawer color="teal" dark app>
      <v-list dense nav>
        <!-- header -->
        <v-list-item two-line class="px-0">
          <v-list-item-avatar>
            <v-icon x-large>mdi-cog</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <span>Interface ADMIN</span>
            <v-list-item-subtitle>Troc D'Heures Raismois</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <!-- tabs -->
        <v-list-item
          v-for="(section, i) in sections"
          :key="i"
          link
          @click="changeSection(section.component)"
        >
          <v-list-item-icon>
            <v-icon>{{ section.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ section.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
      <v-list dense nav>
        <!-- buttons.home -->
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-web</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Site</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- buttons.feed -->
        <v-list-item link to="/feed">
          <v-list-item-icon>
            <v-icon>mdi-account-box</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Espace Personnel</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- buttons.logout -->
        <v-list-item @click="logout()">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Déconnexion</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <!-- section -->
    <v-card>
      <component v-bind:is="currentSection" />
    </v-card>

  </v-container>
</template>

<script>
import AdminList from "../components/AdminList.vue";
import UsersList from "../components/UsersList.vue";
import PublicationsList from "../components/PublicationsList.vue";
import RequestsList from "../components/RequestsList.vue";

export default {
  name: "Admin",

  components: {},
  data() {
    return {
      currentSection: AdminList,
      sectionsList: [AdminList, UsersList, PublicationsList, RequestsList],
      sectionss: ["Admin", "Sélistes", "Publications", "Demandes"],
      sections: [
        { title: "Admins", component: AdminList, icon: "mdi-account-check" },
        { title: "Sélistes", component: UsersList, icon: "mdi-account" },
        {
          title: "Publications",
          component: PublicationsList,
          icon: "mdi-format-list-bulleted-square",
        },
        {
          title: "Demandes",
          component: RequestsList,
          icon: "mdi-format-list-checkbox",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    changeSection(component) {
      this.currentSection = component;
    },
    toHomePage() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
</style>