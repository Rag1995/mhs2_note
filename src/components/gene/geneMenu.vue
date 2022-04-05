<template>
  <div v-click-outside="closeMenu" style="position: relative;">
    <slot name="activator" v-bind="slotProps" />
    <b-card
      v-if="show"
      bg-variant="meringue"
      no-body
      class="gene-menu shadow pt-3 px-3 pb-4"
    >
      <b-btn
        variant="success"
        block
        size="sm"
        class="text-nowrap"
        @click="openGeneModal(No)"
      >
        詳細
      </b-btn>

      <b-btn
        variant="primary"
        block
        size="sm"
        class="text-nowrap"
        @click="openGeneSelector(index)"
      >
        變更
      </b-btn>

      <b-btn
        variant="danger"
        block
        size="sm"
        class="text-nowrap"
        @click="removeGene(index)"
      >
        卸除
      </b-btn>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ["No", "index"],
  data() {
    return {
      show: false,
    };
  },
  computed: {
    slotProps() {
      return {
        on: {
          click: () => {
            this.show = !this.show;
          },
          dragenter: this.closeMenu,
        },
        attrs: {
          active: this.show,
        },
      };
    },
  },
  methods: {
    closeMenu() {
      this.show = false;
    },
    openGeneModal(No) {
      this.closeMenu();
      this.$store.commit("geneModal/openModal", No);
    },
    openGeneSelector(index) {
      this.closeMenu();
      this.$store.commit("geneSelector/openModal", index);
    },
    removeGene(index) {
      this.closeMenu();
      this.$store.commit("bingoTable/removeBingoGene", index);
    },
  },
};
</script>
