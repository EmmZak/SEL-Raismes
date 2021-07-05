<template>
  <v-btn @click="toAdminPage()">ADMIN</v-btn>
  
</template>

<script>

  export default {
    name: 'Home',

    components: {
    },
    methods: {
      toAdminPage() {
        this.$router.push("/admin")
      }
    }
    
  }
</script>
