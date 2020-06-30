<template>
  <v-container>
    <h1>Page Not Found</h1>
    <div v-if="user">
      <router-link to="/">Go back to dashboard</router-link>
    </div>
    <div v-else>
      <router-link :to="{name: 'Login'}">Go back to login</router-link>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "NotFound",
  computed: {
    user() {
      this.$store.getters["Auth/user"].id;
    }
  }
};
</script>

<style>
</style>