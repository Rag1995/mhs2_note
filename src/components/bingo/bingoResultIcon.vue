<template>
  <div :class="_class" />
</template>

<script>
export default {
  props: ["value"],
  computed: {
    _class() {
      return {
        [`gene-bingo-table-result-icon-${this.value}`]: this.value,
      };
    },
  },
};
</script>
