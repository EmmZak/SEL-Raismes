<template>
  <v-card>
    <v-card-title>
      <div class="text-h5">Informations personnelles</div>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col class="red" cols="2">
          <v-icon size="150">mdi-account</v-icon>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Account",
  props: ["user"],

  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>