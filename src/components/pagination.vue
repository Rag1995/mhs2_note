<template>
  <b-pagination
    v-on="$listeners"
    v-bind="$attrs"
    :first-number="showFirstAndLast"
    :last-number="showFirstAndLast"
    first-class="first-btn"
    last-class="last-btn"
    prev-class="prev-btn"
    next-class="next-btn"
    ellipsis-class="ellipsis-btn"
    page-class="page-btn"
  >
    <template #first-text>
      <span>
        <fa-icon icon="fa-solid fa-angles-left" />
      </span>
    </template>

    <template #last-text>
      <span>
        <fa-icon icon="fa-solid fa-angles-right" />
      </span>
    </template>

    <template #prev-text>
      <span>
        <fa-icon icon="fa-solid fa-angle-left" />
      </span>
    </template>

    <template #next-text>
      <span>
        <fa-icon icon="fa-solid fa-angle-right" />
      </span>
    </template>

    <template #ellipsis-text>
      <span>
        <fa-icon icon="fa-solid fa-ellipsis" />
      </span>
    </template>

    <template #page="{ page }">
      {{ page }}
    </template>
  </b-pagination>
</template>

<style lang="scss" scoped></style>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["breakpoint"]),
    showFirstAndLast() {
      return this.breakpoint === "xs" ? false : true;
    },
  },
};
</script>
