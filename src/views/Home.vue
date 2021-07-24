<template>
  <b-container fluid>
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

    <div class="py-2">
      <b-row>
        <b-col sm="6">
          <b-form-group label="屬性">
            <b-form-checkbox-group v-model="element">
              <b-form-checkbox v-for="ele in elements" :key="ele" :value="ele">
                {{ ele }}屬性
              </b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>

        <b-col sm="6">
          <b-form-group label="類型">
            <b-form-checkbox-group v-model="pattern" :options="patterns">
            </b-form-checkbox-group>
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

        <b-col sm="3">
          <b-button size="sm" variant="primary" block @click="selectByFilter()">
            全選(依篩選)
          </b-button>
        </b-col>

        <b-col sm="3" class="mt-3 mt-sm-0">
          <b-button size="sm" variant="danger" block @click="selectClear()">
            清空選擇
          </b-button>
        </b-col>

        <b-col sm="3" class="mt-3 mt-sm-0">
          <b-button v-b-modal.modal-monster size="sm" variant="success" block>
            基因清單(依魔物)
          </b-button>
        </b-col>
      </b-row>

      <b-modal
        id="modal-monster"
        title="基因清單(依魔物)"
        no-close-on-backdrop
        ok-only
        ok-title="關閉"
        ok-variant="secondary"
      >
        <div v-if="groupByMonster.length === 0">目前沒有選擇任何基因！</div>
        <b-list-group v-else>
          <b-list-group-item v-for="(item, i) in groupByMonster" :key="i">
            <div class="text-primary">{{ item.monster }}</div>
            <hr />
            <div>
              <div v-for="(gene, j) in item.genes" :key="j">
                {{ gene.element }}屬性 / {{ gene.pattern }} / {{ gene.gene }}
              </div>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-modal>
    </div>

    <div class="gene-table mt-3 small">
      <b-table
        :fields="fields"
        :items="filterData"
        :current-page="currentPage"
        :per-page="perPage"
        @row-clicked="onRowSelected"
        fixed
        striped
        hover
        small
        responsive
      >
        <template #cell(selected)="{ item }">
          <b-form-group>
            <b-form-checkbox v-model="data[item.index].selected" />
          </b-form-group>
        </template>
      </b-table>
    </div>

    <div>
      <b-pagination
        v-model="currentPage"
        :total-rows="filterData.length"
        :per-page="perPage"
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
    data: {
      get() {
        return this.$store.state.data;
      },
      set(value) {
        this.$store.commit("updateData", value);
      },
    },
    monsters() {
      return this.$store.state.monsters;
    },
    genes() {
      return this.$store.state.genes;
    },
    groupByMonster() {
      let obj = {};
      this.data
        .filter((el) => el.selected)
        .forEach((el) => {
          const { element, pattern, gene, skill, monster_list, rank } = el;
          monster_list.forEach((m) => {
            const monster = m + (rank === null ? "" : "(上位)");
            if (obj[monster] === undefined) {
              obj[monster] = { monster: monster, genes: [] };
            }
            obj[monster].genes.push({
              element: element,
              pattern: pattern,
              gene: gene,
              skill: skill,
            });
          });
        });
      return Object.values(obj).sort((a, b) => {
        return a.genes.length < b.genes.length ? 1 : -1;
      });
    },
    fields() {
      return [
        {
          key: "selected",
          label: "#",
          thClass: "t-selected",
        },
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
      ];
    },
    filterData() {
      return this.data
        .filter((el) => {
          return this.customFilter(el);
        })
        .map((el) => {
          return { ...el, _rowVariant: el.selected ? "selected" : "" };
        });
    },
  },
  methods: {
    onRowSelected(items) {
      const { selected, index } = items;
      this.data[index].selected = !selected;
    },
    selectByFilter() {
      this.filterData.forEach((el) => {
        this.onRowSelected(el);
      });
    },
    selectClear() {
      this.data = this.data.map((el) => {
        el.selected = false;
        return el;
      });
    },
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

