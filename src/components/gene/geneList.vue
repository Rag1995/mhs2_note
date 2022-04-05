<template>
  <div class="gene-list">
    <geneListItem
      v-for="(item, index) in newList"
      :key="index"
      v-bind="item"
      @click="onClick(item)"
      :class="{
        selected: value.No === item.No,
        disabled: item.disabled,
      }"
    />

    <div v-if="load" class="text-center gene-list-load">
      <b-spinner variant="brown" label="Spinning" />
    </div>
    <div v-if="list.length === 0" class="gene-list-not-found py-5 text-center">
      <h4>查無資料 ¯\_(ツ)_/¯</h4>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    value: {},
    load: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState("bingoTable", {
      bingoGenes: (state) => state.bingoGenes,
    }),
    newList() {
      return this.list.map((item) => {
        return {
          ...item,
          disabled: this.bingoGenes.some(({ No }) => item.No === No),
        };
      });
    },
  },
  components: {
    geneListItem: () => import("./geneListItem.vue"),
  },
  methods: {
    onClick(item) {
      if (item.disabled) return;
      this.$emit("input", { ...item });
    },
  },
};
</script>
