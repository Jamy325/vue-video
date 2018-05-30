<template>
    <section>
      <title-bar>

        <h1 slot="title">
          资产统计
        </h1>

        <router-link to="/assetlist" slot="nextBtn">
          <div class="icon-next"></div>
        </router-link>
      </title-bar>

    <vfooter></vfooter>
      <section class="blockBackground" style="padding-bottom: 5px">
        <section style="display:flex;flex-direction: row; margin: 5px;padding: 5px">
              <section style="border: 0px solid red;width: 55%">
                <section style=" font-size: 0.8rem;">
                 <span>1234</span>  <span style="font-size: 0.4rem">CNY</span>
                </section>

                <section style=" font-size: 0.5rem;">
                  <span style="color: red">-7.1235%</span>  <span style="font-size: 0.1rem">约为5BTC</span>
                </section>

              </section>

              <section style="margin: 5px;border: 0px solid blue;width: 45%">

              </section>
            </section>

            <section style="margin: 10px;opacity: 0.7;font-size: 0.2rem;color: #FFFFFF;letter-spacing: 0;">
              <section><span >累计投入<span>25</span>天,收益约为<span>212</span>CNY</span>
                <span style="margin-left: 2rem">币种:{{Object.keys(totalSymbols).length}}</span></section>
            </section>
        </section>

      <section v-for="(data, symbol) in totalSymbols" class="blockBackground" style="margin: 5px;padding: 10px" @click="onClickSymbol(symbol)">
        <section style=" font-size: 0.5rem; display: flex;flex-direction: row;justify-content: space-between;align-items:center">
          <span>{{symbol}}</span> <span> ≈ ¥{{ data.cny}}</span>
        </section>
        <section style="font-size: 0.2rem;display: flex;flex-direction: row;justify-content: space-between;align-items:center">
          <span>{{symbol}}  <span style="color: grey">占{{data.percent}}%</span></span>
          <span style="color: #EE5A5A;letter-spacing: -0.33px;"> + ¥{{ data.addValue}}({{data.addPercent}}%)</span>
        </section>

        <section style="border: 1px solid #ace; height: 2rem;width: 100%">

        </section>

      </section>

    </section>



</template>

<script>
import vfooter from './common/vfooter.vue'
import titleBar from './common/titleBar.vue'
import { url,initHome,getAvator } from '../data/fetchData'
import { mapActions ,mapState } from 'vuex'

export default {
    name: 'Asset',
    components:{
        vfooter,
      titleBar
    },

    computed:{
      ...mapState({
        totalSymbols:function () {
          let userdata = this.$store.state.userdata;
          if (!userdata) return {
              btc:{
                percent:10,
                cny:100,
                addValue:123,
                addPercent:1234
              }
          };

          let assets = userdata.assets || [];
          let ts = {};
          let allCNY = 0;
          for(var e of assets){
              let balance = e.balance || [];
              for(var b in balance){
                  let s = b.symbol;
                  if (!ts[s]) {
                      ts[s] = b;
                  }else{
                      ts[s].total += b.total;
                      ts[s].totalCNY += b.totalCNY;
                  }

                allCNY += b.totalCNY;
              }
          }

          var r = {};
          for(var e in ts){
            r[e] = {
                percent:(ts[e].totalCNY * 100/ allCNY).toFixed(2),
              cny:ts.totalCNY,
              addValue:0,
              addPercent:b.percentChange24h
            };
          }

          return r;
        }
      })
    },
    created () {

    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        //'$route': 'initData'
    },
    methods:{
      onClickSymbol(symbol){
        console.log(symbol+" on click");
        this.$router.push({name:'symboldetail', params:{symbol:symbol}})
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
