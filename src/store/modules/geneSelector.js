const state = () => ({
  showModal: false,
  selectIndex: null,
  element: null,
  type: null,
  rank: null,
  category: null,
  search: "",
});

const getters = {};

const actions = {};

const mutations = {
  openModal(state, value) {
    state.showModal = true;
    state.selectIndex = value;
  },
  setShowModal(state, value) {
    state.showModal = value;
  },
  setElement(state, value) {
    state.element = value;
  },
  setType(state, value) {
    state.type = value;
  },
  setRank(state, value) {
    state.rank = value;
  },
  setCategory(state, value) {
    state.category = value;
  },
  setSearch(state, value) {
    state.search = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
