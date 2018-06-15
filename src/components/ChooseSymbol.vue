<template>
    <section>
      <title-bar>
        <router-link to="/ChooseBourse" slot="backBtn">
          <div class="icon-back"></div>
        </router-link>

        <h1 slot="title">
          选择交易对({{this.$route.params.bourse}})
        </h1>

      </title-bar>

      <section style="margin: 2px;padding: 2px" class="blockBackground">

        <cell v-for="s in symbolList[this.$route.params.bourse]" :title="s" :is-link="true" :key="s" @click.native="onClick(s)"></cell>


      </section>

    </section>
</template>

<script>
import vfooter from './common/vfooter.vue'
import titleBar from './common/titleBar.vue'
import { ajax_postAddMarket } from '../data/fetchData'
import { mapActions ,mapState } from 'vuex'
import { Tab, TabItem,Swiper,SwiperItem,XInput, Selector,Cell, Group, XTextarea,Flexbox, FlexboxItem,XTable,XButton} from 'vux'

export default {
    name: 'ChooseSymbol',
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
          bourse:'',
          symbols:[]
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
      },
      ...mapState(['symbolList'])
    },
    created () {
      this.loadSymbolData();
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        //'$route': 'initData'
    },
    methods:{
        onClick(symbol){
          let bourse = this.$route.params.bourse || "";
          console.log(`${bourse}=>${symbol}`);

          ajax_postAddMarket({bourse:bourse, symbol:symbol}).then((data)=>{
            this.$router.push("/market");
          }).catch(e=>{
            this.$vux.toast.show({
              text: e.message ? e.message : e.error,
              type:'cancel',
              width:'15em'
            });
          });
        },
      loadSymbolData(){
        let bourse = this.$route.params.bourse || "";
        if (bourse){
          this.bounce = bourse;
          let self = this;
          this.$store.dispatch("loadSymbolList",{bourse}).then(()=>{

          }).catch(e=>{
            self.$vux.toast.show({
              text: e.message ? e.message : e.error,
              type:'cancel',
              width:'15em'
            });
          });
        }
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '~vux/src/styles/1px.less';

</style>
