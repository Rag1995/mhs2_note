<template>
  <b-container>
    <b-card-title
      class="
        d-flex
        flex-lg-row
        align-items-lg-end
        flex-column
        align-items-start
      "
    >
      基因圖鑑
      <b-card-sub-title class="ml-lg-auto mt-lg-2 mt-2">
        感謝<org-auth />大大的整理，請到巴哈原文用力地ＧＰ支持！！
      </b-card-sub-title>
    </b-card-title>

    <hr />

    <b-row class="py-2">
      <b-col sm="6">
        <b-form-group label="屬性">
          <b-form-checkbox-group
            v-model="element"
            :options="elements"
          ></b-form-checkbox-group>
        </b-form-group>
      </b-col>

      <b-col sm="6">
        <b-form-group label="類型">
          <b-form-checkbox-group
            v-model="pattern"
            :options="patterns"
          ></b-form-checkbox-group>
        </b-form-group>
      </b-col>

      <b-col sm="6">
        <b-form-group label="隨行獸">
          <b-form-input v-model="monster" list="monsters-list"></b-form-input>
          <datalist id="monsters-list">
            <option v-for="(item, index) in monsters" :key="index">
              {{ item }}
            </option>
          </datalist>
        </b-form-group>
      </b-col>

      <b-col sm="6">
        <b-form-group label="基因">
          <b-form-input v-model="gene" list="genes-list"></b-form-input>
          <datalist id="genes-list">
            <option v-for="(item, index) in genes" :key="index">
              {{ item }}
            </option>
          </datalist>
        </b-form-group>
      </b-col>
    </b-row>

    <div class="gene-table mt-3 small">
      <b-table
        :fields="fields"
        :items="filterData"
        :current-page="currentPage"
        :per-page="perPage"
        fixed
        striped
        hover
        small
        responsive
      ></b-table>
    </div>

    <div>
      <b-pagination
        v-model="currentPage"
        :total-rows="filterData.length"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </b-container>
</template>

<script>
import "../assets/sass/_home.sass";

export default {
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      monster: "",
      gene: "",
      element: [],
      pattern: [],
      elements: ["無", "火", "水", "雷", "冰", "龍"],
      patterns: ["無", "力量", "技巧", "速度"],
    };
  },
  components: {
    "org-auth": () => import("../components/org-auth.vue"),
  },
  computed: {
    data() {
      return this.$store.state.data;
    },
    monsters() {
      return this.$store.state.monsters;
    },
    genes() {
      return this.$store.state.genes;
    },
    fields() {
      return [
        {
          key: "element",
          label: "屬性",
          sortable: true,
          thClass: "t-element",
          filter: (value) => {
            return this.element.length === 0
              ? true
              : this.element.indexOf(value) > -1;
          },
        },
        {
          key: "pattern",
          label: "類型",
          sortable: true,
          thClass: "t-pattern",
          filter: (value) => {
            return this.pattern.length === 0
              ? true
              : this.pattern.indexOf(value) > -1;
          },
        },
        {
          key: "gene",
          label: "基因名稱",
          sortable: true,
          thClass: "t-gene",
          filter: (value) => {
            return this.gene === "" ? true : value.indexOf(this.gene) > -1;
          },
        },
        {
          key: "type",
          label: "主/被動",
          sortable: true,
          thClass: "t-type",
        },
        {
          key: "skill",
          label: "技能名稱",
          sortable: true,
          thClass: "t-skill",
        },
        {
          key: "monster",
          label: "隨行獸",
          formatter: (value, key, item) => {
            return value + (item.rank !== null ? "(上位)" : "");
          },
          sortable: true,
          sortByFormatted: true,
          thClass: "t-monster",
          filter: (value) => {
            return this.monster === ""
              ? true
              : value.indexOf(this.monster) > -1;
          },
        },
        {
          key: "level",
          label: "等級",
          sortable: true,
          thClass: "t-level",
        },
        {
          key: "cost",
          label: "消耗",
          sortable: true,
          thClass: "t-cost",
        },
        {
          key: "description",
          label: "技能詳情",
          sortable: true,
          thClass: "t-description",
        },
      ];
    },
    filterData() {
      return this.data.filter((el) => {
        return this.customFilter(el);
      });
    },
  },
  methods: {
    customFilter(item) {
      return this.fields.reduce((acc, cur) => {
        const { key, filter } = cur;
        if (filter === undefined) {
          return acc && true;
        }
        return acc && filter(item[key]);
      }, true);
    },
  },
};
</script>

