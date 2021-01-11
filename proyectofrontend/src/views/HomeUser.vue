<template>
  <div class="imagen">
    <v-app>
      <Nav></Nav>
      <v-container grid-list-md>
        <v-snackbar v-model="snackbar" :timeout="timeout" top color="error">
          {{ messageResponse }}
          <v-icon color="white" text @click="snackbar = false">fas fa-times-circle</v-icon>
        </v-snackbar>

        <v-layout row wrap>
          <!-- Get all books  -->
          <v-flex md12 class="margins">
            <v-card>
              <v-card-title primary-title class="card font-weight-light">
                <v-icon color="white" class="margin-icon">fas fa-book</v-icon>Ours Books
              </v-card-title>
              <v-data-table
                :headers="listBooks"
                :items="allBooks"
                class="elevation-1 mytable"
                center
                :no-data-text="notBooks"
              >
                <template v-slot:[`item.cantidad`]="{ item }">
                  <v-chip :color="getColor(item.cantidad)" dark>
                    {{
                    item.cantidad
                    }}
                  </v-chip>
                </template>
              </v-data-table>
            </v-card>
          </v-flex>

          <!-- Post loan -->
          <v-flex class="margins">
            <v-card class="overflow-hidden" color="blue lighten-1" dark>
              <v-toolbar flat color="blue">
                <v-icon class="margin-icon">fas fa-book-reader</v-icon>
                <v-toolbar-title class="font-weight-light">Make a Loan
</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-3" fab small @click="isEditing = !isEditing">
                  <v-icon v-if="!isEditing">mdi-close</v-icon>
                  <v-icon v-else>mdi-pencil</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <!-- Autocomplete combobox to books in post loans-->
                <v-autocomplete
                  :disabled="!isEditing"
                  :items="showTitleBooks"
                  :filter="customFilter"
                  color="white"
                  item-text="name"
                  label="Libro"
                  v-model="book"
                  return-object
                ></v-autocomplete>
                <!-- Slider to amount days in post  loans-->
                <v-slider
                  :disabled="!isEditing"
                  v-model="cantidadDias"
                  :label="slideConfig.label"
                  :thumb-color="slideConfig.color"
                  thumb-label="always"
                  max="30"
                  min="1"
                  class="margins"
                ></v-slider>
              </v-card-text>

              <v-divider></v-divider>

              <!-- Confirm post loan -->
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="!isEditing" color="success" @click="controlLoan">Create Loans
o</v-btn>
              </v-card-actions>
              <v-dialog v-model="confirm" persistent max-width="450">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{titleConfirm}}</span>
                  </v-card-title>
                  <v-card-text>{{aboutConfirm}}</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="confirm = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="actionConfirm">Accept</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
          </v-flex>

          <!-- My loans -->
          <v-flex md12 class="margins">
            <v-card>
              <v-card-title primary-title class="card font-weight-light">
                <v-icon color="white" class="margin-icon">fas fa-tasks</v-icon>My Loans
              </v-card-title>
              <v-data-table
                :headers="listLoans"
                :items="myLoans"
                class="elevation-1 mytable"
                center
                :no-data-text="notLoans"
              >
                <template v-slot:[`item.fecha_vto`]="{ item }">
                  {{
                  formatDate(item.fecha_vto)
                  }}
                </template>
              </v-data-table>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      //
      myLoans: [],
      allBooks: [],

      // To show in data-tables with the query format
      listBooks: [
        { text: "Título", value: "titulo" },
        { text: "Ejemplares", value: "cantidad" }
      ],
      listLoans: [
        { text: "Libro", value: "titulo" },
        { text: "Fecha de vencimiento", value: "fecha_vto" }
      ],
      notBooks: "",
      notLoans: "",

      // To v-autocomplete
      book: {},
      cantidadDias: 0,
      showTitleBooks: [],

      // To slider
      slideConfig: { label: "Días", val: 15, color: "green" },

      // To edit the create loan
      isEditing: null,

      snackbar: false,
      messageResponse: "",
      timeout: 1000,

      confirm: false
    };
  },
  methods: {
    // Map Actions to refresh automatically the data in the web page
    ...mapActions(["getBooks", "getLoans"]),

    // Queries to the API
    getBooks() {
      this.$axios
        .get("http://localhost:5555/libros")
        .then(data => {
          this.allBooks = data.data;
          for (const i of this.allBooks) {
            this.showTitleBooks.push({ name: i.titulo, id: i.id_libro });
          }
          console.log(this.allBooks);
        })
        .catch(() => {
          this.notBooks = "No hay libros disponibles";
        });
    },
    getLoans() {
      this.$axios
        .get("http://localhost:5555/prestamos")
        .then(data => {
          this.myLoans = data.data;
          console.log(this.myLoans);
        })
        .catch(() => {
          this.notLoans = "No tienes préstamos";
        });
    },
    postLoans() {
      this.$axios
        .post("http://localhost:5555/prestamos", {
          idLibro: this.book.id,
          cantidadDias: this.cantidadDias
        })
        .then(data => {
          this.getLoans();
          console.log(data);
        })
        .catch(e => {
          this.messageResponse = e.response.data;
          this.snackbar = true;
          console.log("Incorrect loan");
        });
    },

    // Methods to autocomplete combobox
    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    controlLoan() {
      if (!this.book.id) {
        this.messageResponse = "Completar el campo libros";
        this.snackbar = true;
      } else {
        this.saveLoan();
      }
    },

    formatDate(millsec) {
      function pad(s) {
        return s < 10 ? "0" + s : s;
      }
      var d = new Date(millsec);
      return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(
        "/"
      );
    },

    // To chip in data-table of get all books
    getColor(cantidad) {
      if (cantidad < 2) return "red";
      else if (cantidad >= 2 && cantidad <= 4) return "orange";
      else return "green";
    },

    saveLoan() {
      if (this.book.id != "") {
        this.confirm = true;
      } else {
        this.save();
      }
    },
    save() {
      if (this.book) {
        this.confirm = false;
      } else {
        this.postLoans();
      }
    },
    actionConfirm() {
      this.postLoans();
      this.confirm = false;
      this.isEditing = !this.isEditing;
      this.cantidadDias = 15;
      this.book = {};
    }
  },
  computed: {
    // Map State to save the queries in the store
    ...mapState(["books", "loans"]),

    titleConfirm() {
      return "Confirmar préstamo";
    },
    aboutConfirm() {
      return "¿Estás seguro de realizar este préstamo?";
    }
  },

  // It does the queries when this view is created
  created() {
    this.getBooks();
    this.getLoans();
  }
};
</script>

<style scope>
.margins {
  margin-top: 20px;
}
.margins:first-child {
  margin-top: 70px;
}
.mytable table tr {
  background-color: #42a5f5;
  border-bottom: none;
}
.mytable table th {
  background-color: #2296f3;
}
td.text-start {
  color: white;
  font-weight: bold;
}
td.text-start:hover {
  color: white;
  font-weight: bold;
}
tr:hover {
  background-color: #326fc4 !important;
}
div.v-card__title.card {
  color: white;
}
th.text-start span {
  color: white;
}
.card {
  border-style: none;
  background-color: #2296f3;
}
.v-data-footer {
  background-color: #2296f3;
}
.margin-icon {
  margin-right: 7px;
}
</style>