<template>
  <v-container class="login-form">
    <v-row>
      <v-col>
        <form elevation="5">
          <v-text-field v-model="email" label="Email" required></v-text-field>
          <v-text-field v-model="password" type="password" label="Password" required></v-text-field>

          <v-btn class="mr-4" @click="loginUser">Login</v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("Auth");
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["login", "getProfile"]),
    loginUser() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.login(user)
        .then(res => {
          if (res.data.success) {
            console.log("Login success");
            this.getProfile().then(res => {
              if (res.data.success) {
                this.$router.push({ name: "Dashboard" });
              }
            });
          } else {
            console.log("Login failed");
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
    .login-form {
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    form {
        width: 50vw;
        margin: 0 auto;
        padding: 50px;
        
    }
</style>