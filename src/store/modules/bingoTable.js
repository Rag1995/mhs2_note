const state = () => ({
  bingoGenes: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  bingoResult: [],
  bingoBonusList: [
    {
      img: require("../../assets/img/element/normal.png"),
      value: "normal",
    },
    {
      img: require("../../assets/img/element/fire.png"),
      value: "fire",
    },
    {
      img: require("../../assets/img/element/water.png"),
      value: "water",
    },
    {
      img: require("../../assets/img/element/thunder.png"),
      value: "thunder",
    },
    {
      img: require("../../assets/img/element/ice.png"),
      value: "ice",
    },
    {
      img: require("../../assets/img/element/dragon.png"),
      value: "dragon",
    },
    {
      img: require("../../assets/img/type/power.png"),
      value: "power",
    },
    {
      img: require("../../assets/img/type/technical.png"),
      value: "technical",
    },
    {
      img: require("../../assets/img/type/speed.png"),
      value: "speed",
    },
  ],
});

const getters = {
  bingoBonus: (state) => {
    const calcBingoBonus = (count) => {
      return 100 + Math.min(count, 2) * 5 + count * 5;
    };
    return state.bingoBonusList
      .map((item) => {
        const count = state.bingoResult.filter((el) => el === item.value)
          .length;
        return {
          ...item,
          count,
        };
      })
      .map((item) => ({ ...item, bonus: calcBingoBonus(item.count) }));
  },
};

const actions = {};

const mutations = {
  setBingoGenes(state, value) {
    state.bingoGenes = value;
  },
  addBingoGene(state, { index, item }) {
    state.bingoGenes.splice(index, 1, { ...item });
  },
  removeBingoGene(state, index) {
    state.bingoGenes.splice(index, 1, {});
  },
  setBingoResult(state, value) {
    state.bingoResult = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
