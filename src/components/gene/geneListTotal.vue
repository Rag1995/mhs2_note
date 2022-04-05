<template>
  <div class="gene-list-total bg-brown text-light overflow-hidden">
    <div class="gene-shape bg-light mr-2" style="height: 1em" />
    <span class="text-ellipsis"> 搜尋結果：{{ total }} 個</span>
  </div>
</template>

<script>
export default {
  props: ["total"],
};
</script>
