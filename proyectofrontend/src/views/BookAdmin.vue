<template>
  <div>
    <v-app>
      <v-container style="height: 100%" grid-list-md>
        <Nav></Nav>
        <Menus></Menus>
        <v-snackbar v-model="snackbar" :timeout="timeout" top :color="color">
          {{ messageResponse }}
          <v-icon color="white" text @click="snackbar = false">fas fa-times-circle</v-icon>
        </v-snackbar>

        <v-data-table
          :headers="headers"
          :items="books"
          class="elevation-1 mytable"
          no-data-text="No se encontraron libros"
          :footer-props="{
                'items-per-page-options': [],
                'items-per-page-text': null,
                'disable-items-per-page': true
            }"
        >
          <template v-slot:top>
            <v-toolbar flat color="#2296f3">
              <v-toolbar-title>Books</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-dialog v-model="dialog" persistent max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="success" dark class="mb-2" v-on="on">Nuevo libro</v-btn>
                </template>

                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6" class="pb-1">
                          <v-text-field v-model="title" label="Titulo" :readonly="isReadonly" py-1></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="pb-1">
                          <v-text-field type="number" v-model="amount" label="Cantidad"></v-text-field>
                        </v-col>
                        <label v-if="error" class="ml-2 red--text">{{ message }}</label>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="validFields">Guardar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="confirm" persistent max-width="450">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{titleConfirm}}</span>
                  </v-card-title>
                  <v-card-text>{{aboutConfirm}}</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="confirm = false">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="actionConfirm">Aceptar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="info" persistent max-width="450">
                <v-card>
                  <v-card-title class="headline">Info</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-text-field v-model="total" label="Total"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field v-model="lended" label="Prestados"></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field v-model="availables" label="Disponibles"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="info = false">OK</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">fas fa-edit</v-icon>
            <v-icon small class="mr-2" @click="setItemDelete(item)">fas fa-trash</v-icon>
            <v-icon small @click="loadInfo(item)">fas fa-info-circle</v-icon>
          </template>
        </v-data-table>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  // el id del prestamo lo obtengo del datatable
  data() {
    return {
      dialog: false,
      confirm: false,
      info: false,
      total: "",
      lended: "",
      availables: "",
      isReadonly: false,
      error: false,
      message: "",
      snackbar: false,
      timeout: 2000,
      messageResponse: "",
      color: "",
      headers: [
        { text: "Titulo", value: "titulo" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Acciones", value: "action" }
      ],
      booksLocal: [],
      title: "",
      amount: "",
      editedItem: {
        id_libro: "",
        titulo: "",
        cantidad: ""
      },
      itemDelete: ""
    };
  },
  computed: {
    ...mapState(["books"]),
    formTitle() {
      return this.editedItem.id_libro === "" ? "Nuevo libro" : "Editar libro";
    },
    aboutConfirm() {
      return this.dialog === true
        ? "Esta seguro que desea actualizar la cantidad de ejmplares de " +
            this.title +
            "?"
        : "Esta seguro que desea eliminar " + this.itemDelete.titulo + "?";
    },
    titleConfirm() {
      return this.dialog === true
        ? "Actualizar cantidad de ejmplares"
        : "Eliminar libro";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    ...mapActions(["getBooks"]),
    ...mapMutations(["setBooks"]),
    // setear la info del libro que se quiere eliminar y activa el dialog para confirmar operacion
    setItemDelete(item) {
      this.itemDelete = item;
      this.confirm = true;
    },
    // cargar la informacion de las cantidas prestadas y disponibles
    loadInfo(item) {
      this.getAmountCopiesAvailables(item);
      this.info = true;
    },
    // cuando se clickea save en update se pide que confirme la operacion, si solo esta agregando no
    saveBook() {
      if (this.editedItem.id_libro != "") {
        this.confirm = true;
      } else {
        this.save();
      }
    },
    // valida que los campos no sean vacíos
    validFields() {
      if (this.title === "" || this.amount === "") {
        this.error = true;
        this.message = "Complete todos los campos";
      } else {
        this.saveBook();
      }
    },
    addBook() {
      this.$axios
        .post("http://localhost:5555/libros", {
          titulo: this.title,
          cantidad: parseInt(this.amount)
        })
        .then(() => {
          this.getBooks();
        })
        .catch(e => {
          console.log(e);
        });
    },
    changeAmountCopies() {
      this.$axios
        .put("http://localhost:5555/libros/" + this.editedItem.id_libro, {
          cantidad: parseInt(this.amount)
        })
        .then(data => {
          this.getBooks();
          this.snackbar = true;
          this.messageResponse = data.data;
          this.color = "success";
        })
        .catch(e => {
          this.snackbar = true;
          this.messageResponse = e.response.data;
          this.colo = "error";
        });
    },
    getAmountCopiesAvailables(item) {
      this.$axios
        .get("http://localhost:5555/libros/" + item.id_libro)
        .then(data => {
          this.total = item.cantidad;
          this.lended = item.cantidad - data.data;
          this.availables = data.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteBook(idLibro) {
      this.$axios
        .delete("http://localhost:5555/libros/" + idLibro)
        .then(() => {
          if((this.books).length == 1){
              this.setBooks([]);
          }else {
              this.getBooks();
          }
          this.messageResponse = "Libro eliminado correctamente";
          this.snackbar = true;
          this.color = "success";
        })
        .catch(e => {
          this.messageResponse = e.response.data;
          this.snackbar = true;
          this.color = "error";
        });
    },
    // al presionar update book, se cargan los campos y se guarda el id del libro
    editItem(item) {
      this.title = item.titulo;
      this.amount = item.cantidad;
      this.editedItem.id_libro = item.id_libro;
      this.isReadonly = true;
      this.dialog = true;
    },

    deleteItem(item) {
      this.deleteBook(item.id_libro);
    },

    close() {
      this.isReadonly = false;
      this.error = false;
      this.dialog = false;
      setTimeout(() => {
        this.editedItem.id_libro = "";
        this.title = "";
        this.amount = "";
      }, 300);
    },

    save() {
      if (this.editedItem.id_libro) {
        this.editedItem.titulo = this.title;
        this.editedItem.cantidad = this.amount;
        this.changeAmountCopies();
        this.confirm = false;
      } else {
        this.addBook();
      }
      this.close();
    },
    actionConfirm() {
      if (this.dialog === true) {
        this.save();
      } else {
        this.deleteItem(this.itemDelete);
        this.confirm = false;
      }
    }
  },
  created() {
    this.booksLocal = this.books;
  }
};
</script>

<style scope>
.margins {
  margin-top: 20px;
}
.mytable table tr {
  background-color: #42a5f5;
  border-bottom: none;
}
.mytable table th {
  background-color: #2296f3;
}
table tr:hover {
  color: red;
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
</style>