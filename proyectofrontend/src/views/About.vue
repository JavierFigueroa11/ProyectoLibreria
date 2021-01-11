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
          <h2 class="display-1 white--text font-weight-light">2019-Award IFLA</h2>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" md="10">
             The International Federation of Library Associations and Institutions (IFLA) is the leading international body representing the interests of library and information services and their users. It is the global voice of the library and information profession.
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
          <h2 class="display-1 mr-4 white--text font-weight-light">2017-Award ABGRA</h2>
          <v-icon
            dark
            size="42"
          >mdi-home-outline</v-icon>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" md="8">
            To be recognized as a reference Center in the management, organization, development, preservation and dissemination of the new knowledge produced at the University through the creation of its own digital and electronic collections.</v-col>
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
          <h2 class="display-1 mr-4 white--text font-weight-light">2010-Library Creation</h2>
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
              The "Library Javier Figueroa" It was created on December 5, 2010
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>