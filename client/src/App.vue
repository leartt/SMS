<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      token: ''
    }
  },
  methods: {
    loggedIn() {
      if (this.$store.getters["Auth/isLoggedIn"]) {
        this.$store.dispatch("Auth/getProfile");
      }
    },
  },
  created() {
    this.loggedIn();
  },
  mounted() {
    if(localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }
  },
  watch: {
    token(newToken) {
      console.log('Token has changed')
    }
  }

};
</script>
