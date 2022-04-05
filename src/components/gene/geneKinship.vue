<template>
  <div class="gene-kinship-wrap">
    <div class="gene-kinship" :style="_style">
      <div class="gene-kinship-overlay"></div>
    </div>

    <div class="gene-kinship-content" style="width: 5rem;">
      <span class="text-right">{{ value }}</span>
      <span class="text-center">/</span>
      <span class="text-left">100</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      dark: "#143436",
      light: "#0BF5FF",
    };
  },
  computed: {
    _style() {
      return {
        background: `linear-gradient(to top, ${this.light} 0%, ${this.light} ${this.value}%, ${this.dark} ${this.value}%, ${this.dark} 100%)`,
      };
    },
  },
};
</script>
