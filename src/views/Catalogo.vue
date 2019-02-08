<template>
  <v-layout justify-center>
    <vue-element-loading :active="isLoading" :is-full-screen="true">
      <img src="https://mitienda.moda/img/loader.126f8cbb.gif" />
    </vue-element-loading>
    <v-flex xs12 sm12>
      <v-card>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex
              lg4
              md6
              sm6
              xs12
              v-for="(item, index) in collections"
              :key="index"
            >
              <v-card>
                <v-carousel
                  hide-delimiters
                  :cycle="false"
                  :hide-controls="item.images.length <= 1"
                >
                  <v-carousel-item
                    v-for="(pic, i) in item.images"
                    :key="i"
                    :src="pic"
                  ></v-carousel-item>
                </v-carousel>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import VueElementLoading from 'vue-element-loading'

export default {
  data: () => ({
    isLoading: false
  }),
  components: { VueElementLoading },

  computed: {
    ...mapState(['collections'])
  }
}
</script>
<style>
.v-carousel .v-btn .v-icon {
  color: rgba(0, 0, 0, 0.4);
}
</style>
