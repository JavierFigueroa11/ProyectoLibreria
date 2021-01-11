<template>
  <div id="navega">
    <div id="menu">
      <div id="fijo">
        <v-toolbar dark color="black">
          <v-toolbar-title>Bienvenido <strong style="color:#FFFF00">{{this.$store.state.name}}</strong> a nuestra biblioteca online!</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click="logout" background-color="yellow accent-2">
            Salir
          </v-btn>
        </v-toolbar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$axios
        .post("http://localhost:5555/logout", {})
        .then(data => {
          console.log(data);
          this.$router.push("/");
        })
        .catch(() => {
          console.log("Error logout");
        });
    }
  }
};
</script>

<style scope>
.v-toolbar__content{
  margin-bottom: 50px;
  
}
#navega #menu #fijo {
  position: fixed;
  font-size: 11pt;
  text-align: center;
  top: 0px;
  left: 0px; 
  width: 100%;
  z-index: 1;
}
v-btn:hover {
  background-color: #FFFF00!important;
}
</style> 