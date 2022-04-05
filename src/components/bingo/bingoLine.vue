<template>
  <bingoLineContainer :size="size">
    <template v-for="{ slotName, lines } in listWithSlotName" :slot="slotName">
      <div
        v-for="(line, index) in lines"
        :key="`${slotName}-${index}`"
        :class="line"
      />
    </template>
  </bingoLineContainer>
</template>

<script>
export default {
  props: {
    size: { type: Number },
    list: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    bingoLineContainer: () => import("./bingoLineContainer.vue"),
  },
  computed: {
    listWithSlotName() {
      const list = this.list.map((item, index) => {
        return {
          slotName: this.getSlotName(index),
          line: this.getLine(index),
          category: this.getCategory(index),
          value: item,
        };
      });
      return this.groupBySlotName(list);
    },
  },
  methods: {
    getLine(index) {
      const m = (this.size + 1) * 2;
      return index % m;
    },
    getSlotName(index) {
      const m = this.size + 1,
        a = 0,
        b = m,
        c = 2 * m,
        d = 3 * m;
      if (index === a || index === c) return "slash-RL";
      if (index === b || index === d) return "slash-LR";
      if ((a < index && index < b) || (c < index && index < d)) return "row";
      if ((b < index && index < c) || d < index) return "col";
    },
    getCategory(index) {
      const m = (this.size + 1) * 2;
      if (index < m) return "type";
      return "element";
    },
    groupBySlotName(rows) {
      return [
        ...rows
          .reduce((acc, cur) => {
            const key = cur.slotName;
            const item = acc.get(key) || { slotName: cur.slotName, lines: [] };
            item.lines.push({ ...cur });
            return acc.set(key, item);
          }, new Map())
          .values(),
      ].map((item) => {
        item.lines = this.groupByLine(item.lines);
        return item;
      });
    },
    groupByLine(rows) {
      return [
        ...rows
          .reduce((acc, { slotName, line, category, value }) => {
            const item = acc.get(line) || {
              [`gene-bingo-table-line-${slotName}`]: true,
            };
            item[`${category}-bingo`] = value;
            return acc.set(line, item);
          }, new Map())
          .values(),
      ];
    },
  },
};
</script>
