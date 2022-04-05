<template>
  <slick class="slick-selector mb-2">
    <div v-for="({ variant, img, text, value }, index) in options" :key="index">
      <b-btn
        block
        :variant="variant"
        class="text-nowrap"
        :class="{ active: selected === value }"
        @click="$emit('input', value)"
      >
        <template v-if="img">
          <img draggable="false" :src="img" class="mr-1" />
        </template>

        <div>{{ text }}</div>
      </b-btn>
    </div>
  </slick>
</template>

<script>
export default {
  model: {
    prop: "selected",
    event: "input",
  },
  props: {
    selected: {},
    options: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    slick: () => import("./slick.vue"),
  },
};
</script>
