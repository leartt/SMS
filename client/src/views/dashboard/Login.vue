<template>
  <div class="container">
    <div class="session">
      <div class="left"></div>
      <form class="log-in">
        <h4>
          School Management
          <span>SYSTEM</span>
        </h4>
        <span style="min-height: 50px; width: 100%">
          <p class="error-msg" v-if="error_message">{{error_message}}</p>
        </span>
        <div class="floating-label">
          <input placeholder="Email" type="email" v-model="email" required />
          <label for="email">Email:</label>
          <div class="icon">
            <span class="mdi mdi-account"></span>
          </div>
        </div>
        <div class="floating-label">
          <input
            v-model="password"
            placeholder="Password"
            type="password"
            required
            autocomplete="off"
          />
          <label for="password">Password:</label>
          <div class="icon">
            <span class="mdi mdi-lock"></span>
          </div>
        </div>
        <button class="login-btn" @click.prevent="loginUser">Log in</button>
      </form>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers("Auth");
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(["error_message"])
  },
  methods: {
    ...mapActions(["login", "getProfile"]),
    loginUser() {
      if(!document.querySelector('input[type="email"]').checkValidity()) {
        this.$store.commit('Auth/AUTH_ERROR', 'Please provide an email');
        return;
      }
      else if(!document.querySelector('input[type="password"]').checkValidity()) {
        this.$store.commit('Auth/AUTH_ERROR', 'Please provide a password');
        return;
      }
      const user = {
        email: this.email,
        password: this.password
      };
      this.login(user)
        .then(res => {
          if (res.data.success) {
            console.log("Login success");
            this.getProfile()
              .then(res => {
                if (res.data.success) {
                  this.$router.push({ name: "Dashboard" });
                }
              })
              .catch(err => console.log(err));
          } else {
            console.log("Login failed");
          }
        })
        .catch(err => console.log('error'));
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins");

/* Form */

.container {
  font-family: -apple-system, BlinkMacSystemFont, "San Francisco", Helvetica;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: start;
  align-items: flex-start;
  -webkit-box-pack: start;
  justify-content: flex-start;
}

h4 {
  font-size: 24px;
  font-weight: 600;
  color: #000;
  opacity: 0.85;
}

label {
  font-size: 12.5px;
  color: #000;
  opacity: 0.8;
  font-weight: 400;
}

form {
  padding: 40px 30px;
  background: #fefefe;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-align: start;
  align-items: flex-start;
  padding-bottom: 20px;
  width: 300px;
}
form h4 {
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.5);
}
form h4 span {
  color: black;
  font-weight: 700;
}

.error-msg {
  background: rgb(153, 13, 13);
  color: white;
  width: 100%;
  padding: 10px 5px;
  border-radius: 5px;
}

a.discrete {
  color: rgba(0, 0, 0, 0.4);
  font-size: 14px;
  border-bottom: solid 1px rgba(0, 0, 0, 0);
  padding-bottom: 4px;
  margin-left: auto;
  font-weight: 300;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  margin-top: 40px;
}
a.discrete:hover {
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
}

.login-btn {
  -webkit-appearance: none;
  width: auto;
  min-width: 100px;
  border-radius: 24px;
  text-align: center;
  padding: 15px 40px;
  margin-top: 5px;
  background-color: #b08bf8 !important;
  color: #fff;
  font-size: 14px;
  margin-left: auto;
  font-weight: 500;
  box-shadow: 0px 2px 6px -1px rgba(0, 0, 0, 0.13);
  border: none;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  outline: 0;
}
.login-btn:hover {
  -webkit-transform: translateY(-3px);
  transform: translateY(-3px);
  box-shadow: 0 2px 6px -1px rgba(182, 157, 230, 0.65);
}
.login-btn:hover:active {
  -webkit-transform: scale(0.99);
  transform: scale(0.99);
}

input {
  font-size: 16px;
  padding: 20px 0px;
  height: 56px;
  border: none;
  border-bottom: solid 1.5px rgba(0, 0, 0, 0.1);
  background: #fff;
  width: 280px;
  box-sizing: border-box;
  -webkit-transition: all 0.3s linear;
  transition: all 0.3s linear;
  color: #000;
  font-weight: 400;
  -webkit-appearance: none;
}
input:focus {
  border-bottom: solid 1.5px #b69de6;
  outline: 0;
  box-shadow: 0 2px 6px -8px rgba(77, 77, 77, 0.45);
}

.floating-label {
  position: relative;
  margin-bottom: 10px;
  width: 100%;
}
.floating-label label {
  position: absolute;
  top: calc(50% - 7px);
  left: 0;
  opacity: 0;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  padding-left: 44px;
}
.floating-label input {
  width: calc(100% - 44px);
  margin-left: auto;
  display: -webkit-box;
  display: flex;
}
.floating-label .icon {
  position: absolute;
  top: 1.5rem;
  left: 0;
  height: 56px;
  width: 44px;
  display: -webkit-box;
  display: flex;
}

.floating-label input:not(:placeholder-shown) {
  padding: 28px 0px 12px 0px;
}
.floating-label input:not(:placeholder-shown) + label {
  -webkit-transform: translateY(-10px);
  transform: translateY(-10px);
  opacity: 0.7;
}

.floating-label  input:focus:required:invalid + label + .icon {
  -webkit-animation-name: shake-shake;
  animation-name: shake-shake;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
}

.floating-label input:focus:required:invalid {
  border-bottom-color: rgb(202, 40, 40);
}
.floating-label input:required:valid {
  border-bottom-color: #b69de6;
}

@-webkit-keyframes shake-shake {
  0% {
    -webkit-transform: translateX(-3px);
    transform: translateX(-3px);
  }
  20% {
    -webkit-transform: translateX(3px);
    transform: translateX(3px);
  }
  40% {
    -webkit-transform: translateX(-3px);
    transform: translateX(-3px);
  }
  60% {
    -webkit-transform: translateX(3px);
    transform: translateX(3px);
  }
  80% {
    -webkit-transform: translateX(-3px);
    transform: translateX(-3px);
  }
  100% {
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
  }
}

@keyframes shake-shake {
  0% {
    -webkit-transform: translateX(-3px);
    transform: translateX(-3px);
  }
  20% {
    -webkit-transform: translateX(3px);
    transform: translateX(3px);
  }
  40% {
    -webkit-transform: translateX(-3px);
    transform: translateX(-3px);
  }
  60% {
    -webkit-transform: translateX(3px);
    transform: translateX(3px);
  }
  80% {
    -webkit-transform: translateX(-3px);
    transform: translateX(-3px);
  }
  100% {
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
  }
}
.session {
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  width: auto;
  height: auto;
  margin: auto auto;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 5px 10px 100px -50px rgba(0, 0, 0, 0.623),
    5px 10px 100px -50px rgba(0, 0, 0, 0.575);
}

.left {
  width: 220px;
  height: auto;
  min-height: 100%;
  position: relative;
  background-image: url('../../assets/notebook-compressor.jpg');
  background-size: cover;
  background-position: center;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.left svg {
  height: 40px;
  width: auto;
  margin: 20px;
}

@media (max-width: 650px) {
  .left {
    display: none;
  }
}

/* 
.login-form {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
form {
  width: 100vw;
  margin: 0 auto;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.email-input,
.password-input {
  width: 50%;
  margin: 0 auto;
}

.login-btn {
  max-width: 200px;
} */
</style>