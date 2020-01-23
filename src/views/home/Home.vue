<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { getHomeMultidata } from "network/home";

export default {
  name: "Home",
  props: [""],
  data() {
    return {
      banners: [],
      recommends: []
    };
  },
  components: {
    NavBar
  },
  created() {
    //请求多个数据
    getHomeMultidata().then(res => {
      //    this.result = res
      //这样相当于把他保存了  res不会被回收

      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  }
};
</script>

<style scoped>
.home-nav {
  background-color: pink;
  color: white;
}
</style>