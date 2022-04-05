<template>
  <b-modal
    v-model="showModal"
    header-bg-variant="wheat"
    header-border-variant="wheat"
    header-class="h5 mb-0"
    title="技能詳細"
    footer-bg-variant="wheat"
    footer-border-variant="wheat"
    footer-class="justify-content-center pb-4"
    body-bg-variant="wheat"
    body-class="pt-0"
    scrollable
    size="lg"
    content-class="gene-modal"
  >
    <div v-if="load" class="text-center">
      <b-spinner variant="brown" label="Spinning" />
    </div>
    <template v-else>
      <b-card no-body bg-variant="meringue" class="border-0 py-2 px-3">
        <div class="d-flex flex-nowrap align-items-center">
          <geneSlot
            v-bind="{
              element: gene.element,
              type: gene.type,
              rank: gene.rank,
            }"
            style="flex: 0 0 3rem"
          />
          <h5 class="ml-2 mb-0 flex-grow-1">
            {{ gene.category }}：{{ gene.skill }}
          </h5>
        </div>

        <hr class="border-khaki" />

        <p>必要等級：{{ gene.level }}</p>
        <div class="d-flex flex-nowrap justify-content-between">
          <p class="mr-4">{{ gene.description }}</p>
          <geneKinship :value="gene.kinship_cost" class="align-self-end" />
        </div>
      </b-card>

      <div v-if="(gene.monsters || []).length > 0" class="mt-3">
        <div>可擁有的隨行獸</div>

        <div class="monster-list">
          <div v-for="{ No, name_tw, icon, egg } in gene.monsters" :key="No">
            <b-card
              no-body
              bg-variant="meringue"
              class="border-0 py-2 px-3 monster-list-item"
            >
              <div class="monster-list-item-content">
                <div class="monster-icon">
                  <img :src="`${url}/public/icon/${icon}`" />
                </div>
                <div>{{ name_tw }}</div>
                <div class="monster-egg">
                  <img :src="`${url}/public/egg/${egg}`" />
                </div>
              </div>
            </b-card>
          </div>
        </div>
      </div>
    </template>

    <template #modal-footer>
      <b-btn variant="brown" @click="showModal = false">
        關閉視窗
      </b-btn>
    </template>
  </b-modal>
</template>

<script>
import { mapState } from "vuex";
import apiGene from "../../assets/js/api/gene";

export default {
  data() {
    return {
      url: process.env.VUE_APP_API_BASE_URL,
      load: false,
      gene: {},
    };
  },
  filters: {
    numberFormatter(v) {
      return v > 0 ? v : "-";
    },
  },
  components: {
    geneSlot: () => import("./geneSlot.vue"),
    geneKinship: () => import("./geneKinship.vue"),
  },
  watch: {
    No(val) {
      this.getGene(val);
    },
  },
  computed: {
    ...mapState("geneModal", {
      No: (state) => state.No,
    }),
    showModal: {
      get() {
        return this.$store.state.geneModal.showModal;
      },
      set() {
        return this.$store.commit("geneModal/setShowModal");
      },
    },
  },
  methods: {
    async getGene(No) {
      this.load = true;
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
      await apiGene
        .findByNo(No)
        .then(({ data }) => {
          this.gene = data;
        })
        .catch(() => {
          this.gene = {};
        });
      this.load = false;
    },
  },
};
</script>
