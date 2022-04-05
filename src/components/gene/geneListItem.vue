<template>
  <b-card no-body class="gene-list-item px-3 py-2" v-on="$listeners">
    <div class="gene-list-item-icon">
      <gene-slot v-bind="$attrs" />
    </div>

    <div class="gene-list-item-content ml-2 overflow-hidden">
      <div class="h5 mb-1 text-ellipsis">{{ name }}</div>
      <div class="small text-ellipsis">{{ category }}：{{ skill }}</div>
    </div>

    <div class="gene-list-item-append">
      <div>
        <b-btn
          variant="brown"
          size="sm"
          class="icon-btn"
          @click="openGeneModal(No)"
        >
          <fa-icon icon="fa-solid fa-question" />
        </b-btn>
      </div>

      <small v-if="disabled" class="text-ellipsis">已選擇</small>
    </div>
  </b-card>
</template>

<script>
export default {
  props: ["No", "name", "skill", "category", "disabled"],
  components: {
    geneSlot: () => import("./geneSlot.vue"),
  },
  methods: {
    openGeneModal(No) {
      this.$store.commit("geneModal/openModal", No);
    },
  },
};
</script>
