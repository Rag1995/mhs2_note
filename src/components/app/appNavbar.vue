<template>
  <b-navbar
    id="app-navbar"
    toggleable="lg"
    tag="nav"
    class="flex-nowrap align-items-center"
  >
    <b-navbar-brand id="app-navbar-brand" :to="{ name: 'Home' }">
      <img
        :src="require('../../assets/img/Kulu_Ya_Ku_Icon.png')"
        class="mr-1"
      />
      <span class="text-ellipsis">萌夯物語筆記</span>
    </b-navbar-brand>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      gearSpin: false,
    };
  },
};
</script>
