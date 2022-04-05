<template>
  <b-container class="not-found">
    <h3 class="mb-4">找不到頁面 ¯\_(ツ)_/¯</h3>
    <b-btn variant="brown" :to="{ name: 'Home' }">回到首頁</b-btn>
  </b-container>
</template>

<style lang="scss">
.not-found {
  flex-grow: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
</style>
