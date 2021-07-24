import Vue from 'vue'
import Vuex from 'vuex'

import org_data from "../assets/data/data.json"
import monsters from "../assets/data/monsters.json"
import genes from "../assets/data/genes.json"

const data = org_data.map((el, idx) => {
  return { index: idx, selected: false, ...el }
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: data,
    monsters: monsters,
    genes: genes
  },
  mutations: {
    updateData(state, value) {
      state.data = value;
    },
  },
  actions: {
  },
  modules: {
  }
})
