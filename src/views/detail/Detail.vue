<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="pars"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="coment"></detail-comment-info>
      <goods-list :goods="recomments" ref="recomment"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";

import DetailBottomBar from "./childComps/DetailBottomBar";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecomment
} from "network/detail";

import DetailSwiper from "./childComps/DetailSwiper";

import DetailBaseInfo from "./childComps/DetailBaseInfo";

import DetailShopInfo from "./childComps/DetailShopInfo";

import Scroll from "components/common/scroll/Scroll";

import DetailGoodsInfo from "./childComps/DetailGoodsInfo";

import DetailParamInfo from "./childComps/DetailParamInfo";

import DetailCommentInfo from "./childComps/DetailCommentInfo";

import GoodsList from "components/content/goods/GoodsList";

import { itemListenerMixin, backTopMixin } from "common/mixin";

import { debounce } from "common/utils";

export default {
  name: "Detail",
  props: {},
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recomments: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  computed: {},
  created() {
    //保存传入的iid
    this.iid = this.$route.params.id;

    //根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result;
      //获取顶部的图片
      this.topImages = data.itemInfo.topImages;

      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      //保存商品的详细数据
      this.detailInfo = data.detailInfo;

      //获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // this.$nextTick(() => {
      //   /**
      //    * 根据最新的数据，对应的dom应该是已经被渲染出来的
      //    * 但是图片依然是没有加载完毕，（目前获取到offsetTop不包含其中的图片）
      //    * offsetTop值不对的时候，都是因为图片的问题
      //    */
      //   // this.themeTopYs = [];
      //   // this.themeTopYs.push(0);
      //   // this.themeTopYs.push(this.$refs.pars.$el.offsetTop);
      //   // this.themeTopYs.push(this.$refs.coment.$el.offsetTop);
      //   // this.themeTopYs.push(this.$refs.recomment.$el.offsetTop);
      //   // console.log(this.themeTopYs);
      // });
    });

    //请求推荐数据
    getRecomment().then(res => {
      this.recomments = res.data.list;
    });

    //给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.pars.$el.offsetTop);
      this.themeTopYs.push(this.$refs.coment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recomment.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(position) {
      //获取Y值
      const positionY = -position.y;

      //position中的y值和主体中的值进行对比
      let length = this.themeTopYs.length;
      // for (let i = 0; i < length; i++) {
      //   if (
      //     this.currentIndex !== i &&
      //     ((i < length - 1 &&
      //       positionY >= this.themeTopYs[i] &&
      //       positionY < this.themeTopYs[i + 1]) ||
      //       (i === length - 1 && positionY >= this.themeTopYs[i]))
      //   ) {
      //     this.currentIndex = i;
      //     // console.log(this.currentIndex);
      //     this.$refs.nav.currentIndex = this.currentIndex
      //   }
      // }
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    addToCart() {
      const product = {};
      product.image = this.topImage[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.realPrice
      product.iid = this.iid

      //将商品添加到购物车里面
      this.$store.commit('addCart',product)
    },

    //是否显示回到顶部
    contentScroll(position) {
      //1.判断我们的BackTop是否显示
      // position.y<1000
      this.isShowBackTop = -position.y > 1000;

      //2.决定TabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}
</style>