import {
    debounce
} from "common/utils";

import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener:null
        }
    },
    mounted() {
        let newRefresh = debounce(this.$refs.scroll.refresh, 100)
        this.itemListenerMixin = () => {
            newRefresh()
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)
        
    },
}

export const backTopMixin = {
   data() {
       return {
        isShowBackTop: false,
       }
   },
   methods: {
       
    //回到顶部
     backClick() {
        this.$refs.scroll.scrollTo(0, 0);
      },
      
   },
   components:{
    BackTop
   }
}