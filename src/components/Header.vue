<template>
    <v-card>
        <p>header</p>
        <v-btn @click="toAdminPage()">ADMIN</v-btn> 
    </v-card>
</template>

<script>
export default {
    name: "Header",

    data: () => ({
        
    }),
    methods: {
      toAdminPage() {
        this.$router.push("/admin")
      }
    }
}
</script>