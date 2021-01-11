<template>
  <div>
    <v-app>
      <v-container grid-list-md>
        <Nav></Nav>
        <Menus></Menus>
        <v-snackbar v-model="snackbar" :timeout="timeout" top color="success">
          {{ messageResponse }}
          <v-icon color="white" text @click="snackbar = false">fas fa-times-circle</v-icon>
        </v-snackbar>

        <v-data-table
          :headers="headers"
          :items="loans"
          class="elevation-1 mytable"
          :no-data-text="noDataMessage"
          :footer-props="{
                'items-per-page-options': [],
                'items-per-page-text': null,
                'disable-items-per-page': true 
            }"
        >
          <template v-slot:top>
            <v-toolbar flat color="#2296f3">
              <v-toolbar-title>Préstamos</v-toolbar-title>

              <v-spacer></v-spacer>
              <v-col cols="12" md="3" sm="2">
                <v-select
                  class="mt-4"
                  v-model="defaultSelected"
                  item-color="blue darken-1"
                  color="white"
                  v-on:change="changeSelect"
                  :items="itemsSelect"
                ></v-select>
              </v-col>

              <v-col cols="12" md="3" sm="2">
                <v-autocomplete
                  v-model="selectedPartner"
                  class="mt-3"
                  item-color="blue darken-1"
                  color="white"
                  :items="itemsPartners"
                  placeholder="Socio"
                  dense
                  item-text="nombre"
                  v-on:change="changeSelect"
                  clearable
                  return-object
                ></v-autocomplete>
              </v-col>

              <v-dialog v-model="confirm" persistent max-width="450">
                <v-card>
                  <v-card-title>
                    <span class="headline">Eliminar préstamo</span>
                  </v-card-title>
                  <v-card-text>¿Esta seguro que desea eliminar el préstamo?</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="confirm = false">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteLoan(itemDelete)">Aceptar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <v-icon small @click="setItemDelete(item)">fas fa-trash</v-icon>
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
      /* constantes y mensajes */
      todosLosPrestamos: "Todos los préstamos",
      msgNoPrestamos: "No se encontraron préstamos",
      msgNoPrestamosVencidos: "No se encontraron préstamos vencidos",

      headers: [
        { text: "Libro", value: "titulo" },
        { text: "Socio", value: "nombre_socio" },
        { text: "Fecha de vencimiento", value: "fecha_vto" },
        { text: "Acciones", value: "action" }
      ],
      expiredLoans: [],
      defaultSelected: "Todos los préstamos",
      itemsSelect: ["Todos los préstamos", "Préstamos vencidos"],
      snackbar: false,
      timeout: 2000,
      messageResponse: "",
      confirm: false,
      itemDelete: "",
      selectedPartner: undefined,
      itemsPartners: [],
      searchPartner: "",
      noDataMessage: "No se encontraron préstamos"
    };
  },
  computed: {
    ...mapState(["partners", "books", "loans"])
  },
  methods: {
    ...mapMutations(["setLoans"]),
    ...mapActions(["getBooks", "getPartners", "getLoans"]),
    getExpiredLoans() {
      this.$axios
        .get("http://localhost:5555/prestamos_vencidos")
        .then(data => {
          this.expiredLoans = data.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getLoansUser(idSocio, updatePartner) {
      this.$axios
        .get("http://localhost:5555/prestamos/" + idSocio)
        .then(data => {
          if (!updatePartner) {
            this.setLoans(data.data);
          }
        })
        .catch(() => {
          for (let i = 0; i < this.itemsPartners.length; i++) {
            if (this.itemsPartners[i].id == idSocio) {
              this.itemsPartners.splice(i, 1);
              i--;
            }
          }
          this.selectedPartner = undefined;
          if (this.defaultSelected == this.todosLosPrestamos) {
            this.getLoans();
            this.noDataMessage = this.msgNoPrestamos;
          } else {
            this.setLoans(this.expiredLoans);
            this.noDataMessage = this.msgNoPrestamosVencidos;
          }
        });
    },
    deleteLoan(item) {
      this.$axios
        .delete("http://localhost:5555/prestamos/" + item.id_prestamo)
        .then(() => {
          let index;
          // let auxExpiredLoans = JSON.parse(JSON.stringify(this.expiredLoans));
          index = this.loans.indexOf(item);
          this.loans.splice(index, 1);
          this.setLoans(this.loans);

          index = this.expiredLoans
            .map(function(e) {
              return e.id_prestamo;
            })
            .indexOf(item.id_prestamo);

          if (index != -1) {
            this.expiredLoans.splice(index, 1);
            // this.expiredLoans = auxExpiredLoans;
          }
          this.getLoansUser(item.id_socio, true);
          this.messageResponse = "Prestamo eliminado";
          this.snackbar = true;
          this.confirm = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    /* al cambiar el select o el autocomplete se actualiza la informacion en la tabla */
    changeSelect() {
      if (this.defaultSelected == this.todosLosPrestamos) {
        if (this.selectedPartner != undefined) {
          this.getLoansUser(this.selectedPartner.id, false);
          this.noDataMessage =
            this.msgNoPrestamos + " para " + this.selectedPartner.nombre;
        } else {
          this.getLoans();
          this.noDataMessage = this.msgNoPrestamos;
        }
      } else {
        if (this.selectedPartner != undefined) {
          this.setLoans(this.expiredLoansUser(this.selectedPartner.id));
          this.noDataMessage =
            this.msgNoPrestamosVencidos +
            " para " +
            this.selectedPartner.nombre;
        } else {
          this.setLoans(this.expiredLoans);
          this.noDataMessage = this.msgNoPrestamosVencidos;
        }
      }
    },
    /* funcion que recibe el id del socio y busca sus prestamos vencidos en 'expiredLoans' */
    expiredLoansUser(idSocio) {
      let expiredLoanUser = [];
      for (let el of this.expiredLoans) {
        if (el.id_socio == idSocio) {
          expiredLoanUser.push(el);
        }
      }
      return expiredLoanUser;
    },
    /* carga socios que poseen prestamos para mostrarlos en el autocomplete */
    loadPartnersWithLoans() {
      let partnersWithLoans = [];
      for (let l of this.loans) {
        for (let p of this.partners) {
          if (l.id_socio == p.id) {
            partnersWithLoans.push(p);
          }
        }
      }
      return partnersWithLoans;
    },
    /* setea el prestamo a eliminar y abre la ventana de confirmacion */
    setItemDelete(item) {
      this.itemDelete = item;
      this.confirm = true;
    }
  },
  created() {
    // cargar todos los prestamos al iniciar la pag
    this.getLoans();
    // obtener los prestamos vencidos y setearlos en 'expiredLoans'
    this.getExpiredLoans();
    // obtener los socios que tienen prestamos, para luego filtrar por estos
    this.itemsPartners = this.loadPartnersWithLoans();
  }
};
</script>