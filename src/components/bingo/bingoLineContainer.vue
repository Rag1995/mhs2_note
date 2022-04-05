<template>
  <div class="gene-bingo-table-line">
    <div
      class="gene-bingo-table-line-rows"
      :style="{
        gridTemplateRows: mainGridTemplate,
      }"
    >
      <slot name="row" />
    </div>

    <div
      class="gene-bingo-table-line-cols"
      :style="{
        gridTemplateColumns: mainGridTemplate,
      }"
    >
      <slot name="col" />
    </div>

    <div class="gene-bingo-table-line-slash">
      <slot name="slash-RL" />
    </div>

    <div class="gene-bingo-table-line-slash">
      <slot name="slash-LR" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: { type: Number },
  },
  computed: {
    mainGridTemplate() {
      return `repeat(${this.size}, 1fr)`;
    },
  },
};
</script>
