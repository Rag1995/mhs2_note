import Vue from 'vue'
import Vuex from 'vuex'

import data from "../assets/data/data.json"
import monsters from "../assets/data/monsters.json"
import genes from "../assets/data/genes.json"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: data,
    monsters: monsters,
    genes: genes
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
