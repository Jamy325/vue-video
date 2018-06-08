<template>
  <section>


      <section>
        <title-bar>
          <router-link to="/asset" slot="backBtn">
            <div class="icon-back"></div>
          </router-link>

          <h1 slot="title">
            资产明细-{{symbol}}
          </h1>

        </title-bar>
        <vfooter></vfooter>
      </section>



      <section class="blockBackground" style="padding-bottom: 5px;">

        <div style="width: 100%; height: 150px; border: 0px solid red">
          <chart-symbol-history :symbol="symbol"></chart-symbol-history>
        </div>

        <section style=" opacity: 0.7; font-size: 1.5em; margin-top:5px ;display: flex;flex-direction: row;justify-content: space-around;">
          <section>
            <section >
              <span>价值</span>
              <span>{{totalCNY.toFixed(2)}}</span>
            </section>

            <section>
              <span>收益</span>
              <span>{{earning.toFixed(2)}}</span>
            </section>
          </section>


          <section>
            <section>
              <span>成本</span>
              <span> - </span>
            </section>

            <section >
              <span>涨幅</span>
              <span>{{earning.toFixed(2)}}</span>
            </section>
          </section>
        </section>

      </section>


    <section style="display: flex;flex-direction: row;justify-content: space-between; font-size: 2em;margin: 10px; border: none; border-bottom: 1px solid #3b3b3b">
        <div>总量</div>
        <div style="margin-right: 10px">{{total.toFixed(2)}}</div>
    </section>


    <section v-for="d in parts" style="display: flex;flex-direction: row;justify-content: space-between; font-size: 1.5em;margin: 10px; border: none; border-bottom: 1px solid #3b3b3b">

      <section style="display: flex;flex-direction: column;justify-content: space-around;">
        <div>{{d.title}}</div>
        <div style="opacity: 0.5;font-size: 0.5em">{{d.type}}</div>
        <div>&nbsp</div>
      </section>

      <section style="display: flex;flex-direction: column;justify-content: space-around;">
        <div style="text-align: right; margin-right: 10px">{{d.total.toFixed(2)}}</div>
        <div style="text-align: right; margin-right: 10px;opacity: 0.5">占比{{ (100*d.percent).toFixed(2)}}%</div>
        <div style="text-align: right; margin-right: 10px;opacity: 0.5">价值{{d.totalCNY.toFixed(2)}}</div>
      </section>

    </section>

    <div style="height: 30px;width: 100%"> </div>

  </section>
</template>

<script>
import vfooter from './common/vfooter.vue'
import titleBar from './common/titleBar.vue'
import { url,initHome,getAvator } from '../data/fetchData'
import { mapActions ,mapState } from 'vuex'
import ChartSymbolHistory from '@/components/ChartSymbolHistory'
export default {
    name: 'symboldetail',
    components:{
        vfooter,
      titleBar,
      ChartSymbolHistory
    },
    data(){
        return  {
          symbol:'',
          total:0,
          totalCNY:0,
          earning:0,
          cost:0,
          addPercent:0,
          parts:[]
        }
    },

  computed:{
//    parts(){
//      return [
//        {
//            type:"blance api",
//            title:"我的B网",
//            total:100,
//            percent:10.15,
//            totalCNY:1234
//        },
//        {
//          type:"huobi api",
//          title:"我的huobi",
//          total:100,
//          percent:50.15,
//          totalCNY:34
//        }
//      ];
//    }

  },

  beforeRouteEnter(to, from, next) {
    next(function (vm) {
      vm.initData();
    });
  },

  beforeRouteUpdate (to, from, next) {
      this.initData();
     next();
    },
    methods:{
      initData(){
          let symbol = this.$route.params.symbol;
          this.symbol = symbol;

        let userdata = this.$store.state.userdata;
        if (!userdata) return;

        let assets = userdata.assets || [];
        let total = 0;
        let totalCNY = 0;
        let percentChange24h = 0;

        let parts = [];
        for(let e of assets) {
          let balance = e.balance || [];

            for(let b of balance){
                if (b.symbol == symbol){
                    total += b.total;
                    totalCNY += b.totalCNY;
                    percentChange24h = b.percentChange24h;
                  parts.push({type:e.bourse +" api", title:e.title,  total:b.total, percent:0, totalCNY: b.totalCNY});
                }
            }
        }

        this.total = total;
        this.totalCNY = totalCNY;
        this.addPercent = percentChange24h;
        this.earning = total * percentChange24h /(1+percentChange24h);

        for(var p of parts){
            p.percent = p.total / total;
        }

        this.parts = parts;
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .des{
    opacity: 0.5;
    font-family: PingFangSC-Regular;
    font-size: 0.1rem;
    color: #FFFFFF;
    letter-spacing: 0;
  }

</style>
