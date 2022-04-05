<template>
  <b-input-group class="rounded-pill mb-3">
    <template #prepend>
      <b-input-group-text>
        <fa-icon icon="fa-solid fa-search" />
      </b-input-group-text>
    </template>

    <b-form-input
      placeholder="搜尋基因或技能"
      :value="value"
      @input="$emit('input', $event)"
      @change="$emit('change')"
    ></b-form-input>

    <template #append>
      <b-input-group-text class="text-light p-0 overflow-hidden">
        <b-button
          v-if="value.length > 0"
          size="sm"
          variant="white"
          class="icon-btn"
          @click="clear()"
        >
          <fa-icon icon="fa-solid fa-times" fixed-width />
        </b-button>
      </b-input-group-text>
    </template>
  </b-input-group>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    clear() {
      this.$emit("input", "");
      this.$emit("change");
    },
  },
};
</script>
