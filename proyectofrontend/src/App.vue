<template>
  <v-app>
      <Principal></Principal>
    <div>
    <v-content>
      <router-view/>
    </v-content>
  </div>
  </v-app>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default{
    data() {
      return {
        drawer: false
      }
    },
    methods: {
      ...mapActions(['getPartners', 'getBooks', 'getLoans']),
    },
    computed: { // computed: se ejecutan cada vez que cambie alguna de sus dependencias
      ...mapState(['books', 'partners', 'loans']),
    },
    created() {
      this.getPartners();
      this.getBooks();
      this.getLoans();
    }
  }
</script>