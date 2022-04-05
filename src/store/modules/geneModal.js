const state = () => ({
  showModal: false,
  No: null,
});

const getters = {};

const actions = {};

const mutations = {
  openModal(state, value) {
    state.showModal = true;
    state.No = value;
  },
  setShowModal(state, value) {
    state.showModal = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
