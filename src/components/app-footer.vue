<template>
  <b-container tag="footer" class="text-center">
    <hr class="my-1" />
    <div class="small pt-2 pb-3 footer-content">
      <div>請到巴哈支持原作者！<org-auth /></div>
      <div>
        Powered by
        <a href="https://github.com/Rag1995" target="_blank">Rag1995</a>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  components: {
    "org-auth": () => import("./org-auth.vue"),
  },
};
</script>
