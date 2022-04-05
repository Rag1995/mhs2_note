<template>
  <div class="gene-bingo-table" :style="tableStyle">
    <bingoLine :size="size" :list="bingoResult" />

    <bingoResult :size="size" :list="bingoResult" />

    <div class="gene-bingo-table-main-bg" :style="mainStyle">
      <geneSlot v-for="i in totalSize" :key="i" empty />
    </div>

    <bingoGene
      :value="value"
      @input="$emit('input', $event)"
      class="gene-bingo-table-main"
      :style="mainStyle"
    />
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 3,
      validator: (v) => v > 0 && Number.isInteger(v),
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    bingoGene: () => import("./bingoGene.vue"),
    geneSlot: () => import("../gene/geneSlot.vue"),
    bingoResult: () => import("./bingoResult.vue"),
    bingoLine: () => import("./bingoLine.vue"),
  },
  watch: {
    bingoResult: {
      handler(val) {
        this.$emit("updateBonus", [...val]);
      },
      immediate: true,
    },
  },
  computed: {
    bingoResult() {
      const lines = [...this.mapLines("type"), ...this.mapLines("element")];
      return lines.map((line) => {
        return this.checkBingo(line);
      });
    },
    totalSize() {
      return Math.pow(this.size, 2);
    },
    mainGridTemplate() {
      return `repeat(${this.size}, 1fr)`;
    },
    tableStyle() {
      const gridTemplate = `[a] 0.5fr [b]  ${this.mainGridTemplate} [c] 0.5fr [d]`;
      return {
        gridTemplateRows: gridTemplate,
        gridTemplateColumns: gridTemplate,
      };
    },
    mainStyle() {
      return {
        gridTemplateRows: this.mainGridTemplate,
        gridTemplateColumns: this.mainGridTemplate,
      };
    },
  },
  methods: {
    checkBingo(list) {
      const mySet = new Set(list);
      if (mySet.has(null) || mySet.has("no-type")) return null;
      if (mySet.size === 1 || (mySet.size === 2 && mySet.has("rainbow"))) {
        return list.filter((el) => el !== "rainbow")[0];
      }
      return null;
    },
    mapLines(key) {
      return [
        this.mapSlashRightToLeft(),
        ...this.mapRows(),
        this.mapSlashLeftToRight(),
        ...this.mapCols(),
      ].map((line) => line.map((el) => el[key] || null));
    },
    mapRows() {
      return new Array(this.size).fill(null).map((el, row) => {
        const item = [];
        for (let col = 0; col < this.size; col++) {
          item.push({ ...this.value[this.size * row + col] } || {});
        }
        return item;
      });
    },
    mapCols() {
      return new Array(this.size).fill([]).map((el, col) => {
        const item = [];
        for (let row = 0; row < this.size; row++) {
          item.push({ ...this.value[this.size * row + col] } || {});
        }
        return item;
      });
    },
    mapSlashRightToLeft() {
      const item = [];
      for (let i = 0; i < this.size; i++) {
        item.push({ ...this.value[(this.size - 1) * (i + 1)] } || {});
      }
      return item;
    },
    mapSlashLeftToRight() {
      const item = [];
      for (let i = 0; i < this.size; i++) {
        item.push({ ...this.value[(this.size + 1) * i] } || {});
      }
      return item;
    },
  },
};
</script>
