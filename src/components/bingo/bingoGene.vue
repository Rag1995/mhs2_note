<template>
  <draggable
    :value="value"
    ghostClass="sortable-ghost"
    dragClass="sortable-drag"
    filter=".static"
    :group="{ put: true }"
    :move="handleMove"
    @start="handleDragStart"
    @end="handleDragEnd"
  >
    <div v-for="(item, index) in value" :key="index">
      <geneSlot
        v-if="isEmpty(item)"
        empty
        class="static"
        @click="openGeneSelector(index)"
      />
      <geneMenu v-else :No="item.No" :index="index">
        <template #activator="{ on, attrs }">
          <geneSlot
            v-on="on"
            v-bind="{
              ...attrs,
              rank: item.rank,
              element: item.element,
              type: item.type,
            }"
          />
        </template>
      </geneMenu>
    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      movingIndex: 0,
      futureIndex: 0,
    };
  },
  watch: {
    value: {
      handler(val) {
        this.$emit("input", val);
      },
      deep: true,
    },
  },
  components: {
    draggable,
    geneSlot: () => import("../gene/geneSlot.vue"),
    geneMenu: () => import("../gene/geneMenu.vue"),
  },
  methods: {
    openGeneSelector(index) {
      this.$store.commit("geneSelector/openModal", index);
    },
    isEmpty(item) {
      return Object.keys(item).length === 0;
    },
    handleDragStart(e) {
      const { oldIndex } = e;
      this.movingIndex = oldIndex;
      this.futureIndex = oldIndex;
    },
    handleMove(e) {
      this.movingIndex = e.draggedContext.index;
      this.futureIndex = e.relatedContext.index;
      return false;
    },
    handleDragEnd() {
      const list = [...this.value];
      if (this.movingIndex === this.futureIndex) return;
      const movingItem = { ...list[this.movingIndex] };
      const futureItem = { ...list[this.futureIndex] };
      list.splice(this.futureIndex, 1, { ...movingItem });
      list.splice(this.movingIndex, 1, { ...futureItem });
      this.updateList(list);
    },
    updateList(list) {
      this.$emit("input", list);
    },
  },
};
</script>
