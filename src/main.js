import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import vClickOutside from "v-click-outside";
Vue.use(vClickOutside);

import { BootstrapVue } from "bootstrap-vue";
Vue.use(BootstrapVue, { breakpoints: [`xs`, "sm", "md", "lg", "xl", "xxl"] });

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("fa-icon", FontAwesomeIcon);
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleChevronLeft as fasCircleChevronLeft,
  faCircleChevronRight as fasCircleChevronRight,
  faAnglesLeft as fasAnglesLeft,
  faAnglesRight as fasAnglesRight,
  faAngleLeft as fasAngleLeft,
  faAngleRight as fasAngleRight,
  faEllipsis as fasEllipsis,
  faSearch as fasSearch,
  faTimes as fasTimes,
  faQuestion as fasQuestion,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  // slick
  fasCircleChevronLeft,
  fasCircleChevronRight,
  // pagination
  fasAnglesLeft,
  fasAnglesRight,
  fasAngleLeft,
  fasAngleRight,
  fasEllipsis,
  //
  fasSearch,
  fasTimes,
  fasQuestion
);

import "./assets/sass/_app.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
