</<template>
  <div>
     <v-app>
       <v-container>
        <Nav></Nav>
        <Menus></Menus>
        <v-spacer></v-spacer>
        <v-card>
          <v-img
              src="https://workinside.es/wp-content/uploads/2018/06/Captura-online-library%C3%A7-750x410.jpg"
              height="400"
              weight= "400"
              class="grey darken-4"
            >
            </v-img>
        </v-card>
        </v-container>
    </v-app>
  </div>
</template>
<script>
// import { mapState, mapActions} from 'vuex'

export default {
  data() {
    return {
      headersPartner: [
        { text: "Name", value: "nombre" },
        { text: "Username", value: "username" }
      ],
      searchPartner: "",
      messageResponse: "",
      snackbar: false,
      timeout: 2000
    };
  },
  computed: {},
  methods: {},
  created() {}
};
</script>
