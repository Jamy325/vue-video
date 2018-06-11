<template>
    <section>
      <title-bar>
        <router-link to="/market" slot="backBtn">
          <div class="icon-back"></div>
        </router-link>

        <h1 slot="title">
          选择交易所
        </h1>

      </title-bar>

      <section style="background-color: #343132;margin: 2px;padding: 2px">

        <cell v-for="b in list" :title="b.label" :link="'/ChooseSymbol/'+b.value" :is-link="false" :key="b.value"> {{b.value}}</cell>


      </section>

    </section>
</template>

<script>
import vfooter from './common/vfooter.vue'
import titleBar from './common/titleBar.vue'
import { url,initHome,getAvator } from '../data/fetchData'
import { mapActions ,mapState } from 'vuex'
import { Tab, TabItem,Swiper,SwiperItem,XInput, Selector,Cell, Group, XTextarea,Flexbox, FlexboxItem,XTable,XButton} from 'vux'

export default {
    name: 'ChooseBourse',
    components:{
        vfooter,
      titleBar,
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      XInput,
      Selector,
      Cell,
      Group,
      XTextarea,
      Flexbox,
      FlexboxItem,
      XTable,
      XButton
    },
    data () {
        return {
          index:0,
          list:[
            {
              value:"binance", //交易所实际值(id)
              label:"币安" //交易所显示名称
            }, {

              value:"huobi", //交易所实际值(id)
              label:"火币" //交易所显示名称
            }
          ]
        }
    },
    computed:{
      backPath(){
        let params = this.$route.params;
        return "/OrderBook/"+ params.bourse+"/"+params.symbol;
      },
      nextPath(){
        let params = this.$route.params;
        return "/HistoryDelegate/"+ params.bourse+"/"+params.symbol;
      }
    },
    created () {

    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        //'$route': 'initData'
    },
    methods:{
        onClick(bourse){
          console.log("============"+bourse);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '~vux/src/styles/1px.less';

</style>
