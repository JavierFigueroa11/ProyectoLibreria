<template>
  <div>
    <v-app>
      <v-container fluid pa-0 class="contenedor">
        <v-snackbar v-model="snackbar" :timeout="timeout" top :color="colorSnack">
          {{ messageResponse }}
          <v-icon color="white" text @click="snackbar = false">fas fa-times-circle</v-icon>
        </v-snackbar>
        <v-layout row wrap class="capa-envolvente">
          <v-flex xs12 sm4 id="sign-in-text-wrapper">
            <v-layout column align-center justify-center fill-height pa-3>
              <div class="login-wrapper text-xs-center mb-3">
                <div class="display-1 font-weight-black mb-3">Vamos a leer algo!</div>
                <span class="subheading"></span>
              </div>
              <v-btn
                rounded
                large
                dark
                ripple
                id="sign-in"
                @click="sendLogin"
                class="subheading mx-3 white--text"
              >Iniciar sesión</v-btn>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm8 id="sign-up-envoltorio" class="active">
            <v-layout column align-center justify-center pa-3 mt-5>
              <v-flex xs12 mb-3 mt-5>
                <div class="login-wrapper text-xs-center">
                  <div class="display-1 font-weight-black">Crear cuenta</div>
                </div>
              </v-flex>

              <v-flex xs12>
                <v-form ref="form">
                  <v-text-field
                    full-width
                    single-line
                    label="Nombre"
                    color="yellow accent-2"
                    prepend-inner-icon="mdi-account-box"
                    v-model="name"
                    :rules="nameRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    full-width
                    single-line
                    label="Username"
                    color="yellow accent-2"
                    prepend-inner-icon="mdi-account-outline"
                    v-model="username"
                    :rules="usernameRules"
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
                    required
                  ></v-text-field>
                  <v-text-field
                    :append-icon="show2 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                    :type="show2 ? 'text' : 'password'"
                    full-width
                    single-line
                    label="Confirmar contraseña"
                    color="yellow accent-2"
                    prepend-inner-icon="mdi-lock-outline"
                    @click:append="show2 = !show2"
                    v-model="confirmPassword"
                    :rules="confirmRules"
                    required
                  ></v-text-field>
                </v-form>
              </v-flex>
              <div class="mt-5">
                <v-btn
                  rounded
                  large
                  dark
                  ripple
                  color="black"
                  id="sign-up"
                  @click="sendUser"
                  height="50"
                >Registrarse</v-btn>
              </div>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      show2: false,
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      messageResponse: "",
      timeout: 2000,
      colorSnack: "",
      snackbar: false,
      nameRules: [
        v => !!v || "Completar nombre",
        v =>
          (v && v.length >= 3 && v.length <= 40) ||
          "Nombre debe tener entre 3 a 40 caracteres"
      ],
      usernameRules: [
        v => !!v || "Completar nombre de usuario",
        v =>
          (v && v.length >= 3 && v.length <= 16) ||
          "Nombre de usuario debe tener entre 3 a 16 caracteres"
      ],
      passwordRules: [v => !!v || "Completar la contraseña"],
      confirmRules: [
        v => !!v || "Completar la confirmación de contraseña",
        v => v === this.password || "Las contraseñas no coinciden"
      ]
    };
  },
  methods: {
    sendUser() {
      if (this.$refs.form.validate()) {
        this.$axios
          .post("http://localhost:5555/usuarios", {
            nombre: this.name,
            username: this.username,
            password: this.password,
            rol: "s"
          })
          .then(data => {
            console.log(data);
            this.messageResponse = "Usuario creado correctamente!";
            this.snackbar = true;
            this.colorSnack = "success";
          })
          .catch(e => {
            this.messageResponse = e.response.data;
            this.snackbar = true;
            this.colorSnack = "error";
            console.log("Incorrect credentials");
          });
      }
    },
    sendLogin() {
      this.$router.push("/");
    }
  }
};
</script>


<style scope>
.contenedor {
  background-image: linear-gradient(
      rgb(229, 255, 0),
      rgb(229, 255, 0)
    )
}

.envoltorio {
  min-width: 50%;
}

.capa-envolvente {
  height: 100vh;
}

.active {
  background-color: white;
  color: #FFFF00;
}

#sign-in {
  width: 60%;
}

#sign-up {
  min-width: 25%;
}

.envoltorio .v-input__control > .v-input__slot {
  background: rgba(244, 248, 247, 1);
}

.envoltorio .v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 0px;
  height: 0px;
}
</style>