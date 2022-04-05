import Vue from "vue";
import Vuex from "vuex";
import bingoTable from "./modules/bingoTable";
import geneModal from "./modules/geneModal";
import geneSelector from "./modules/geneSelector";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    breakpoint: "sm",
    load: false,
  },
  mutations: {
    onLoad(state) {
      state.load = true;
    },
    onReady(state) {
      state.load = false;
    },
    setBreakpoint(state, value) {
      state.breakpoint = value;
    },
  },
  actions: {},
  modules: {
    bingoTable,
    geneModal,
    geneSelector,
  },
});
