<template>
  <div>
    <v-app>
      <v-container fluid pa-0>
        <v-snackbar v-model="snackbar" :timeout="timeout" top :color="colorSnack">
          {{ messageResponse }}
          <v-icon color="white" text @click="snackbar = false">fas fa-times-circle</v-icon>
        </v-snackbar>
        <div class="limiter imagen-login">
          <div class="container-login100">
            <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54" p-l-55>
              <form class="login100-form validate-form">
                <span class="login100-form-title p-b-30">Iniciar sesión</span>

                <v-text-field
                  full-width
                  single-line
                  label="Username"
                  color="yellow accent-2"
                  prepend-inner-icon="mdi-account-outline"
                  mb-0
                  v-model="username"
                  :rules="usernameRules"
                  @keyup.enter="auth"
                  required
                ></v-text-field>

                <v-text-field
                  :append-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                  :type="show1 ? 'text' : 'password'"
                  full-width
                  single-line
                  label="Contraseña"
                  color="yellow accent-2"
                  prepend-inner-icon="mdi-lock-outline"
                  @click:append="show1 = !show1"
                  v-model="password"
                  :rules="passwordRules"
                  @keyup.enter="auth"
                  required
                ></v-text-field>

                <div class="text-center m-t-20">
                  <v-btn
                    rounded
                    color="yellow accent-2"
                    @click="auth"
                    class="login100-form-btn"
                    dark
                  >Iniciar</v-btn>
                </div>
<br>
                <div class="flex-col-c p-t-50">
                  <p class="ma-1">
                    ¿Aún no tienes una cuenta?
                    <v-btn
                      rounded
                      color="black"
                      class="subheading mx-3 white--text"
                      to="/signin"
                    >Crear cuenta</v-btn>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      myColor: "white",
      borderActive: "none",
      timeout: 2000,
      colorSnack: "",
      snackbar: false,
      messageResponse: "",
      show1: false,
      usernameRules: [v => !!v || "Completar nombre de usuario"],
      passwordRules: [v => !!v || "Completar la contraseña"]
    };
  },
  methods: {
    auth() {
      this.$axios
        .post("http://localhost:5555/login", {
          username: this.username,
          password: this.password
        })
        .then(data => {
          console.log(data);
          this.setName(this.username);
          if (this.username == "admin") {
            this.$router.push("home_admin");
          } else {
            this.$router.push("home_user");
          }
        })
        .catch(e => {
          this.messageResponse = e.response.data;
          this.snackbar = true;
          this.colorSnack = "error";
          console.log("Incorrect credentials");
        });
    },
    ...mapActions(["getName"]),
    ...mapMutations(["setName"])
  },
  computed: {
    ...mapState(["name"])
  }
};
</script>
<style scope>

/* Utilidades*/
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

body,
html {
  height: 100%;
}

p {
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0px;
}

/* Login */
.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-login100 {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.wrap-login100 {
  width: 500px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
}

/* Form */
.login100-form {
  width: 100%;
}
.login100-form-title {
  display: block;
  font-size: 39px;
  color: #333333;
  line-height: 1.2;
  text-align: center;
}

/* Responsive */
@media (max-width: 576px) {
  .wrap-login100 {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
