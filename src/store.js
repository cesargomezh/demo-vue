import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    collections: []
  },
  mutations: {
    setCollection: (state, newCollection) => {
      state.collections = newCollection
    }
  },
  actions: {}
})
