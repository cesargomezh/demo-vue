<template>
  <v-layout justify-center>
    <vue-element-loading :active="isLoading" :is-full-screen="true">
      <img src="https://mitienda.moda/img/loader.126f8cbb.gif" />
    </vue-element-loading>
    <v-flex xs12 sm12>
      <v-card>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex lg4 md6 sm6 xs12 v-for="card in collection" :key="card.id">
              <v-card>
                <v-img
                  :src="card.src"
                  height="200px"
                  v-model="card.id"
                  @click="getCollection(card.id)"
                >
                  <v-container fill-height fluid pa-2>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
import VueElementLoading from 'vue-element-loading'
import { mapState, mapMutations } from 'vuex'

export default {
  data: () => ({
    collection: [
      {
        src: 'https://mitienda.moda/img/categories/78993358966.jpg',
        id: '78993358966'
      },
      {
        src: 'https://mitienda.moda/img/categories/78993719414.jpg',
        id: '78993719414'
      },
      {
        src: 'https://mitienda.moda/img/categories/79000338550.jpg',
        id: '79000338550'
      },
      {
        src: 'https://mitienda.moda/img/categories/79000404086.jpg',
        id: '79000404086'
      },
      {
        src: 'https://mitienda.moda/img/categories/80160456822.jpg',
        id: '80160456822'
      },
      {
        src: 'https://mitienda.moda/img/categories/79978496118.jpg',
        id: '79978496118'
      },
      {
        src: 'https://mitienda.moda/img/categories/83403341942.jpg',
        id: '83403341942'
      },
      {
        src: 'https://mitienda.moda/img/categories/83403440246.jpg',
        id: '83403440246'
      },
      {
        src: 'https://mitienda.moda/img/categories/83403636854.jpg',
        id: '83403636854'
      },
      {
        src: 'https://mitienda.moda/img/categories/83478380662.jpg',
        id: '83478380662'
      }
    ],
    isLoading: false
  }),
  components: { VueElementLoading },
  methods: {
    ...mapMutations(['setCollection']),
    getCollection(id) {
      this.isLoading = !this.isLoading
      axios({
        method: 'POST',
        url: 'https://octoplus.app/api/v1/shopity/collection',
        data: {
          collection_id: id,
          octoplus_token: 'f550a68b-21ff-4b33-aa04-bff68023acca'
        },
        headers: { 'content-type': 'application/json' }
      }).then(
        result => {
          this.isLoading = !this.isLoading
          console.log(result)
          this.setCollection(result.data.catalogItems)
          this.$router.push({ name: 'catalogo' })
        },
        error => {
          console.log(error)
          this.isLoading = !this.isLoading
        }
      )
    }
  },
  computed: {
    ...mapState(['collections'])
  }
}
</script>
