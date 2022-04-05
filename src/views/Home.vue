<template>
  <b-container fluid class="home">
    <div
      class="d-flex flex-wrap justify-content-center align-items-center"
      style="gap: 1.5rem"
    >
      <div style="flex: 0 1 450px">
        <bingoTable
          v-model="bingoGenes"
          @updateBonus="$store.commit('bingoTable/setBingoResult', $event)"
        />
      </div>

      <div style="flex: 0 1 350px">
        <bingoBonusTable />
      </div>
    </div>

    <geneSelector />
    <geneModal />
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
    bingoTable: () => import("../components/bingo/bingoTable.vue"),
    bingoBonusTable: () => import("../components/bingo/bingoBonusTable.vue"),
    geneModal: () => import("../components/gene/geneModal.vue"),
    geneSelector: () => import("../components/gene/geneSelector.vue"),
  },
  computed: {
    ...mapState(["breakpoint"]),
    bingoGenes: {
      get() {
        return this.$store.state.bingoTable.bingoGenes;
      },
      set(val) {
        this.$store.commit("bingoTable/setBingoGenes", val);
      },
    },
  },
};
</script>
