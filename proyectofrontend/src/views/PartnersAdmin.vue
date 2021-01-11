<template>
  <div>
    <v-app>
      <v-container style="height: 100%" grid-list-md>
        <Nav></Nav>
        <Menus></Menus>
        <v-snackbar v-model="snackbar" :timeout="timeout" top color="success">
          {{ messageResponse }}
          <v-icon color="white" text @click="snackbar = false">fas fa-times-circle</v-icon>
        </v-snackbar>
        <v-data-table
          :headers="headersPartner"
          :items="this.partners"
          :search="searchPartner"
          class="elevation-1 mytable"
          no-data-text="No se encontraron socios"
          no-results-text="No se encontraron socios con los paramétros especificados"
          :footer-props="{
                'items-per-page-options': [],
                'items-per-page-text': null,
                'disable-items-per-page': true
            }"
        >
          <template v-slot:top>
            <v-toolbar flat color="#2296f3">
              <v-toolbar-title>Partners</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="searchPartner"
                color="white"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
                class="pt-0 mt-0"
              ></v-text-field>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      headersPartner: [
        { text: "Nombre", value: "nombre" },
        { text: "Username", value: "username" }
      ],
      searchPartner: "",
      messageResponse: "",
      snackbar: false,
      timeout: 2000
    };
  },
  computed: {
    ...mapState(["partners"])
  },
  methods: {
    ...mapActions(["getPartners"])
  },
  created() {
    this.getPartners();
  }
};
</script>