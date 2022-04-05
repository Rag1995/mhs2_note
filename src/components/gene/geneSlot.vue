<template>
  <div class="gene-slot-wrap">
    <div class="gene-slot">
      <div class="gene-slot-insider" />

      <div :class="rankClass" />
      <div :class="elementClass" />
      <div :class="typeClass" />

      <b-btn
        :variant="active ? 'white' : 'body'"
        class="ani-flash"
        v-on="$listeners"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    empty: {
      type: Boolean,
      default: false,
    },
    element: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    rank: {
      type: String,
      default: "",
    },
  },
  computed: {
    rankClass() {
      return {
        [`gene-rank-${this.rank}`]: this.rank,
      };
    },
    elementClass() {
      return {
        "gene-element": this.element,
        [`bg-${this.element}`]: this.element,
      };
    },
    typeClass() {
      return {
        [`gene-type-${this.type}`]: this.type,
      };
    },
  },
};
</script>
