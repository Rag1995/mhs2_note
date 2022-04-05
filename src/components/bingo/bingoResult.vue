<template>
  <bingoResultContainer :size="size">
    <template v-for="{ slotName, list } in listWithSlotName" :slot="slotName">
      <bingoResultIcon
        v-for="(item, index) in list"
        :key="`${slotName}-${index}`"
        :value="item"
      />
    </template>
  </bingoResultContainer>
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
  computed: {
    listWithSlotName() {
      const totalSize = 4 * (this.size + 1);
      const list = new Array(totalSize).fill(null).map((el, index) => {
        return {
          slotName: this.getSlotName(index),
          value: this.list[index] || null,
        };
      });
      return this.groupBy(list, "slotName");
    },
  },
  components: {
    bingoResultContainer: () => import("./bingoResultContainer.vue"),
    bingoResultIcon: () => import("./bingoResultIcon.vue"),
  },
  methods: {
    getSlotName(index) {
      const m = this.size + 1,
        a = 0,
        b = m,
        c = 2 * m,
        d = 3 * m;
      if (index === a) return "top-right";
      if (index === b) return "right-bottom";
      if (index === c) return "bottom-left";
      if (index === d) return "left-top";
      if (a < index && index < b) return "right";
      if (b < index && index < c) return "bottom";
      if (c < index && index < d) return "left";
      if (d < index) return "top";
    },
    groupBy(rows) {
      return [
        ...rows
          .reduce((acc, { slotName, value }) => {
            const item = acc.get(slotName) || { slotName, list: [] };
            item.list.push(value);
            return acc.set(slotName, item);
          }, new Map())
          .values(),
      ];
    },
  },
};
</script>
