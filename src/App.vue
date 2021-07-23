<template>
  <div id="app">
    <app-navbar />

    <main>
      <router-view />
    </main>

    <app-footer />
  </div>
</template>

<script>
export default {
  components: {
    "app-navbar": () => import("./components/app-navbar.vue"),
    "app-footer": () => import("./components/app-footer.vue"),
  },
};
</script>
