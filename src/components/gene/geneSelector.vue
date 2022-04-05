<template>
  <b-modal
    v-model="showModal"
    title="基因選單"
    header-bg-variant="wheat"
    header-border-variant="khaki"
    body-bg-variant="wheat"
    footer-border-variant="khaki"
    footer-bg-variant="wheat"
    centered
    size="xl"
    scrollable
    no-close-on-backdrop
  >
    <div class="border border-dark border-3 flex-grow-1 px-4 py-3 mb-3">
      <slickSelector
        v-model="element"
        :options="elementOpt"
        @input="getGenes()"
      />
      <slickSelector v-model="type" :options="typeOpt" @input="getGenes()" />
      <slickSelector v-model="rank" :options="rankOpt" @input="getGenes()" />
      <slickSelector
        v-model="category"
        :options="categoryOpt"
        @input="getGenes()"
      />

      <searchField v-model="search" @change="getGenes()" class="mt-3 mb-4" />

      <div
        class="d-flex flex-nowrap justify-content-center justify-content-lg-start align-items-stretch"
      >
        <pagination
          v-model="page"
          :per-page="perPage"
          :total-rows="totalRows"
          :limit="limit"
          class="m-0"
        />

        <geneListTotal :total="totalRows" class="d-none d-lg-flex ml-auto" />
      </div>

      <geneList
        v-model="selectGene"
        :list="geneList"
        :load="load"
        class="mb-3"
      />

      <div
        v-if="breakpoint !== 'lg' && breakpoint !== 'xl'"
        class="d-flex justify-content-center"
      >
        <pagination
          v-model="page"
          :per-page="perPage"
          :total-rows="totalRows"
        />
      </div>
    </div>

    <template #modal-footer>
      <b-btn variant="danger" @click="showModal = false">關閉</b-btn>
      <b-btn
        :variant="selectGene.No ? 'success' : 'khaki'"
        :disabled="!selectGene.No"
        @click="addGene()"
        >確認</b-btn
      >
    </template>
  </b-modal>
</template>

<script>
import { mapState } from "vuex";
import apiGene from "../../assets/js/api/gene";

export default {
  props: ["draggable"],
  data() {
    return {
      load: false,
      geneList: [],
      selectGene: {},
      page: 1,
      perPage: 1,
      totalRows: 0,
      elementOpt: [
        {
          variant: "brown",
          text: "全屬性",
          value: null,
        },
        {
          variant: "normal",
          img: require("../../assets/img/element/normal.png"),
          text: "無屬性",
          value: "normal",
        },
        {
          variant: "fire",
          img: require("../../assets/img/element/fire.png"),
          text: "火屬性",
          value: "fire",
        },
        {
          variant: "water",
          img: require("../../assets/img/element/water.png"),
          text: "水屬性",
          value: "water",
        },
        {
          variant: "thunder",
          img: require("../../assets/img/element/thunder.png"),
          text: "雷屬性",
          value: "thunder",
        },
        {
          variant: "ice",
          img: require("../../assets/img/element/ice.png"),
          text: "冰屬性",
          value: "ice",
        },
        {
          variant: "dragon",
          img: require("../../assets/img/element/dragon.png"),
          text: "龍屬性",
          value: "dragon",
        },
      ],
      typeOpt: [
        {
          variant: "brown",
          text: "全類型",
          value: null,
        },
        {
          variant: "no-type",
          text: "無",
          value: "no-type",
        },
        {
          variant: "power",
          img: require("../../assets/img/type/power.png"),
          text: "力量",
          value: "power",
        },
        {
          variant: "technical",
          img: require("../../assets/img/type/technical.png"),
          text: "技巧",
          value: "technical",
        },
        {
          variant: "speed",
          img: require("../../assets/img/type/speed.png"),
          text: "速度",
          value: "speed",
        },
      ],
      rankOpt: [
        {
          variant: "brown",
          text: "全階級",
          value: null,
        },
        {
          variant: "brown",
          text: "小",
          value: "S",
        },
        {
          variant: "brown",
          text: "中",
          value: "M",
        },
        {
          variant: "brown",
          text: "大",
          value: "L",
        },
        {
          variant: "brown",
          text: "特大",
          value: "XL",
        },
      ],
      categoryOpt: [
        {
          variant: "brown",
          text: "主/被動",
          value: null,
        },
        {
          variant: "brown",
          text: "主動",
          value: "主動",
        },
        {
          variant: "brown",
          text: "被動",
          value: "被動",
        },
      ],
    };
  },
  watch: {
    page() {
      this.getGenes();
    },
    showModal() {
      this.selectGene = {};
    },
  },
  computed: {
    ...mapState(["breakpoint"]),
    limit() {
      const limit = {
        xs: 3,
        sm: 5,
        md: 5,
        lg: 5,
        xl: 12,
      };
      return limit[this.breakpoint];
    },
    element: {
      get() {
        return this.$store.state.geneSelector.element;
      },
      set(val) {
        this.$store.commit("geneSelector/setElement", val);
      },
    },
    type: {
      get() {
        return this.$store.state.geneSelector.type;
      },
      set(val) {
        this.$store.commit("geneSelector/setType", val);
      },
    },
    rank: {
      get() {
        return this.$store.state.geneSelector.rank;
      },
      set(val) {
        this.$store.commit("geneSelector/setRank", val);
      },
    },
    category: {
      get() {
        return this.$store.state.geneSelector.category;
      },
      set(val) {
        this.$store.commit("geneSelector/setCategory", val);
      },
    },
    search: {
      get() {
        return this.$store.state.geneSelector.search;
      },
      set(val) {
        this.$store.commit("geneSelector/setSearch", val);
      },
    },
    query() {
      return {
        page: this.page,
        ...(this.element && { element: this.element }),
        ...(this.type && { type: this.type }),
        ...(this.rank && { rank: this.rank }),
        ...(this.category && { category: this.category }),
        search: this.search,
      };
    },
    ...mapState("geneSelector", {
      selectIndex: (state) => state.selectIndex,
    }),
    showModal: {
      get() {
        return this.$store.state.geneSelector.showModal;
      },
      set() {
        return this.$store.commit("geneSelector/setShowModal");
      },
    },
  },
  components: {
    slickSelector: () => import("../slick/slickSelector.vue"),
    searchField: () => import("../searchField.vue"),
    pagination: () => import("../pagination.vue"),
    geneList: () => import("../gene/geneList.vue"),
    geneListTotal: () => import("./geneListTotal.vue"),
  },
  mounted() {
    this.getGenes();
  },
  methods: {
    addGene() {
      this.$store.commit("bingoTable/addBingoGene", {
        index: this.selectIndex,
        item: { ...this.selectGene },
      });
      this.showModal = false;
    },
    async getGenes() {
      this.load = true;
      await apiGene
        .find(this.query)
        .then(({ data }) => {
          const { perPage, count, rows } = data;
          this.geneList = rows;
          this.perPage = perPage;
          this.totalRows = count;
        })
        .catch(() => {
          this.geneList = [];
          this.perPage = 1;
          this.totalRows = 0;
        });
      this.load = false;
    },
  },
};
</script>
