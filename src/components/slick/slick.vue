<template>
  <div class="mb-2">
    <VueSlickCarousel v-bind="slickOptions">
      <template #prevArrow>
        <div>
          <b-btn variant="body" class="border-0 p-0 text-brown">
            <fa-icon icon="fa-solid fa-circle-chevron-left" />
          </b-btn>
        </div>
      </template>

      <template #nextArrow>
        <div>
          <b-btn variant="body" class="border-0 p-0 text-brown">
            <fa-icon icon="fa-solid fa-circle-chevron-right" />
          </b-btn>
        </div>
      </template>

      <slot />
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";

export default {
  data() {
    return {
      slickOptions: {
        arrows: true,
        dots: false,
        infinite: false,
        focusOnSelect: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 360,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 260,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
  components: { VueSlickCarousel },
};
</script>
