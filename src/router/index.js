import Vue from "vue";
import VueRouter from "vue-router";
// import EmptyRouterView from "../views/EmptyRouterView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "*",
    name: "404NotFound",
    component: () => import("../views/404NotFound.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const requireAuth = to.matched.some((el) => el.meta.requireAuth);
  // 是否需要權限
  if (requireAuth) {
    if (token) {
      return next();
    }
    return next({ name: "Login" });
  }
  // // 已登入則不進入Login頁面
  // if (token && to.name==="Login") {
  //   next({ name: "Admin" });
  //   return;
  // }
  return next();
});

export default router;
