<template>
  <div class="gene-bingo-table-result">
    <div
      class="gene-bingo-table-result-top"
      :style="{
        gridTemplateColumns: mainGridTemplate,
      }"
    >
      <slot name="top" />
    </div>

    <div
      class="gene-bingo-table-result-right"
      :style="{
        gridTemplateRows: mainGridTemplate,
      }"
    >
      <slot name="right" />
    </div>

    <div
      class="gene-bingo-table-result-bottom"
      :style="{
        gridTemplateColumns: mainGridTemplate,
      }"
    >
      <slot name="bottom" />
    </div>

    <div
      class="gene-bingo-table-result-left"
      :style="{
        gridTemplateRows: mainGridTemplate,
      }"
    >
      <slot name="left" />
    </div>

    <div class="gene-bingo-table-result-top-right">
      <slot name="top-right" />
    </div>
    <div class="gene-bingo-table-result-right-bottom">
      <slot name="right-bottom" />
    </div>
    <div class="gene-bingo-table-result-bottom-left">
      <slot name="bottom-left" />
    </div>
    <div class="gene-bingo-table-result-left-top">
      <slot name="left-top" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["size"],
  computed: {
    mainGridTemplate() {
      return `repeat(${this.size}, 1fr)`;
    },
  },
};
</script>
