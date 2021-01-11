<template>
<v-img>
    <v-flex my-4>
      <v-layout my-4 color="black">
      <v-carousel>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
        max-width="1290"
        max-height="500"
      >
      <v-col class="text-center" cols="12">
        <h1 class="yellow accent-2--text">"La Mejor Biblioteca Online de Argentina"</h1>
      </v-col>
      </v-carousel-item>
      </v-carousel>
      </v-layout>
    </v-flex>
</v-img>
</template>

<script>

export default {
  name: 'home',
  components: {
  },
  data () {
      return {
        items: [
          {
            src: 'https://diferencias.es/wp-content/uploads/2019/02/library-869061_1920-1-1024x683.jpg',
          },
          {
            src: 'https://images.adsttc.com/media/images/5be0/9070/08a5/e5e9/7500/00cc/newsletter/201311_NY_N147.jpg?1541443651',
          },
          {
            src: 'https://workinside.es/wp-content/uploads/2018/06/Captura-online-library%C3%A7-750x410.jpg',
          }
        ],
      }
    },
}
</script>
