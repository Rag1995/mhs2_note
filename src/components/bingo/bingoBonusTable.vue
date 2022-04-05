<template>
  <b-card bg-variant="meringue" class="bingo-bonus-table">
    <b-table
      borderless
      hover
      small
      table-variant="body"
      :tbody-tr-class="rowClass"
      :fields="fields"
      :items="bingoBonus"
      class="mb-0"
    >
      <template #cell(count)="{ item }">
        <div class="bingo-bonus-count">
          <img :src="item.img" />
          <div>
            <fa-icon icon="fa-solid fa-xmark" class="mx-2" />
          </div>
          {{ item.count }}
        </div>
      </template>

      <template #cell(bonus)="{item}">{{ item.bonus }} %</template>
    </b-table>
  </b-card>
</template>

<style lang="scss" scoped>
.bingo-bonus-count {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  img {
    height: 1.2em;
    object-fit: contain;
  }
}
</style>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: "count",
          label: "賓果加成數",
          class: "border-right border-brown border-2 px-3",
        },
        { key: "bonus", label: "傷害倍率", class: "px-3" },
      ],
    };
  },
  computed: {
    bingoBonus() {
      return this.$store.getters["bingoTable/bingoBonus"];
    },
  },
  methods: {
    rowClass(item, type) {
      if (!item || type !== "row") return;
      const _class = {
        "border-top": true,
        "text-khaki": item.count === 0,
        "text-brown": item.count > 0,
      };
      if (item.value === "normal" || item.value === "power") {
        return {
          ..._class,
          "border-2 border-brown": true,
        };
      }
      return {
        ..._class,
        "border-khaki": true,
      };
    },
  },
};
</script>
