<template>
  <b-overlay ref="app" id="app" :show="load" rounded="sm">
    <appNavbar />

    <main>
      <router-view />
    </main>

    <appFooter />
  </b-overlay>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      ro: null,
    };
  },
  components: {
    appNavbar: () => import("./components/app/appNavbar.vue"),
    appFooter: () => import("./components/app/appFooter.vue"),
  },
  created() {
    console.log(process.env.VUE_APP_API_BASE_URL);
  },
  computed: {
    ...mapState(["load"]),
  },
  mounted() {
    this.createResizeObs();
  },
  beforeDestroy() {
    this.destroyResizeObs();
  },
  methods: {
    createResizeObs() {
      this.ro = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          this.onResize(entry);
        });
      });
      this.ro.observe(this.$refs.app.$el);
    },
    destroyResizeObs() {
      this.ro.unobserve(this.$refs.app.$el);
    },
    onResize(entry) {
      const { width } = entry.contentRect;
      const breakpoint = this.getBreakpoint(width);
      this.$store.commit("setBreakpoint", breakpoint);
    },
    getBreakpoint(width) {
      // if (width >= 1800) return "xxl";
      if (width >= 1200) return "xl";
      if (width >= 992) return "lg";
      if (width >= 768) return "md";
      if (width >= 576) return "sm";
      return "xs";
    },
  },
};
</script>
