<template>
  <div class="detail-swiper">
    <swiper class="detail-swiper">
      <swiper-item v-for="(item, index) in topImages" :key="index" >
        <img :src="item" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  components: {
    Swiper,
    SwiperItem
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
.detail-swiper{
  height: 300px;
  
}
</style>