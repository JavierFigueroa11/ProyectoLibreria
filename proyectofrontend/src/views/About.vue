<template>
  <v-timeline :dense="$vuetify.breakpoint.smAndDown">
    <v-timeline-item
      color="purple lighten-2"
      fill-dot
      right
    >
      <v-card>
        <v-card-title class="purple lighten-2">
          <v-icon
            dark
            size="42"
            class="mr-4"
          >
            mdi-magnify
          </v-icon>
          <h2 class="display-1 white--text font-weight-light">2019-Premio IFLA</h2>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" md="10">
             La Federación Internacional de Asociaciones e Instituciones Bibliotecarias (IFLA) es el organismo internacional líder que representa los intereses de los servicios bibliotecarios y de información y sus usuarios. Es la voz mundial de la profesión bibliotecaria y de la información.
            </v-col>
            <v-col
              class="hidden-sm-and-down text-right"
              md="2"
            >
              <v-icon size="64">mdi-calendar-text</v-icon>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="amber accent-4"
      fill-dot
      left
      small
    >
      <v-card>
        <v-card-title class="amber accent-4 justify-end">
          <h2 class="display-1 mr-4 white--text font-weight-light">2017-Premio ABGRA</h2>
          <v-icon
            dark
            size="42"
          >mdi-home-outline</v-icon>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" md="8">
            Ser reconocido como un Centro de referencia en la gestión, organización, desarrollo, preservación y diseminación del nuevo conocimiento producido en la Universidad a través de la creación de colecciones digitales y electrónicas propias.            </v-col>
            <v-col cols="12" md="4">
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>
    <v-timeline-item
      color="red lighten-1"
      fill-dot
      left
      small
    >
      <v-card>
        <v-card-title class="red lighten-1 justify-end">
          <h2 class="display-1 mr-4 white--text font-weight-light">2010-Creacion de la Biblioteca</h2>
          <v-icon
            dark
            size="42"
          >
            mdi-account-multiple-outline
          </v-icon>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col class="hidden-sm-and-down" md="2">
              <v-icon size="64">mdi-server-network</v-icon>
            </v-col>
            <v-col cols="12" md="10">
              La "Biblioteca Javier Figueroa" se creo el 5 de Diciembre de 2010
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>