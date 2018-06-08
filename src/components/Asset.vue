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
              <section style="border: 0px solid red;width: 50%">
                <section style=" font-size: 3em;">
                 <span> {{totalCNY.toFixed(2)}} </span>  <span style="font-size: 12px">CNY</span>
                </section>

                <section style=" font-size: 2em;">
                  <span style="color: red">{{changePercent.toFixed(2)}}%</span>
                </section>

              </section>

              <section style="margin: 1px;border: 0px solid blue;width: 50%">
                <v-chart :data="totalSymbols" :height=150 :width=200 background-color="#252a31">
                  <v-scale y :options="yOptions" />
                  <v-tooltip disabled />
                  <v-pie :radius="1" series-field="name" />
                  <v-legend disabled />
                </v-chart>
              </section>

         </section>

            <section style="margin: 10px;opacity: 0.7;font-size: 1em;color: #FFFFFF;letter-spacing: 0;">
              <section>
                <span >累计投入<span>{{totalDay}}</span>天,收益约为<span>{{earning.toFixed(2)}}</span>CNY</span>
                <span style="margin-left: 1rem">币种:{{Object.keys(totalSymbols).length}}</span>
              </section>
            </section>
        </section>

      <section v-for="data of totalSymbols" class="blockBackground" style="margin: 5px;padding: 10px" @click="onClickSymbol(data.name)">
        <section style=" font-size: 1.5em; display: flex;flex-direction: row;justify-content: space-between;align-items:center">
          <span>{{data.name}}</span> <span> ≈ ¥{{ data.cny.toFixed(2)}}</span>
        </section>
        <section style="font-size: 1em;display: flex;flex-direction: row;justify-content: space-between;align-items:center">
          <span>{{data.name}}  <span style="color: grey">占{{(data.percent*100).toFixed(4)}}%</span></span>
          <span style="color: #EE5A5A;letter-spacing: -0.33px;"> ¥{{ data.addValue.toFixed(2)}}({{ (data.addPercent).toFixed(2)}}%)</span>
        </section>

        <section style=" height: 160px;width: 95%">
          <keep-alive>
          <chart-symbol-history :symbol="data.name">

          </chart-symbol-history>
          </keep-alive>
        </section>

      </section>

    </section>
</template>

<script>
import vfooter from './common/vfooter.vue'
import titleBar from './common/titleBar.vue'
import { url,initHome,getAvator } from '../data/fetchData'
import { mapActions ,mapState } from 'vuex'
import ChartSymbolHistory from '@/components/ChartSymbolHistory'
import { VChart, VLine, VArea, VTooltip, VLegend, VBar, VPie, VScale } from 'vux'


export default {
    name: 'Asset',
    components:{
        vfooter,
      titleBar,
      ChartSymbolHistory,
      VChart,
      VLine,
      VArea,
      VTooltip,
      VLegend,
      VBar,
      VPie,
      VScale
    },
  mounted () {
    this.userName = localStorage.getItem('user');
    this.initData();
  },
  data() {
        return{
          yOptions: {
              formatter (val) {
                return val * 100 + '%'
              }
          },

          totalDay: 0,
          changePercent: 0,
          totalCNY: 0,
          earning: 0,
          totalSymbols:[],
        }
    },
    methods:{
      onClickSymbol(symbol){
        console.log(symbol+" on click");
        this.$router.push({name:'symboldetail', params:{symbol:symbol}})
      },
      initData(){
        let userdata = this.$store.state.userdata;
        if (!userdata) return;

        let assets = userdata.assets || [];
        let ts = {};
        let allCNY = 0;
        let allCost = 0;
        let createTime = Date.now();
        for(let e of assets){
          let balance = e.balance || [];
          allCost += (e.cost || 0);
          if (createTime > e.createTime) createTime = e.createTime;

          for(let b of balance){
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

        this.totalCNY = allCNY;
        this.changePercent = (allCNY - allCost / allCost);
        this.earning = allCNY - allCost;
        this.totalDay = Math.ceil((Date.now() - createTime) / (3600*24*1000));

        let r = {};
        for(let e in ts){
          r[e] = {
            name:e,
            percent:ts[e].totalCNY / allCNY,
            cny: ts[e].totalCNY || 0,
            addValue: ts[e].totalCNY/((ts[e].percentChange24h) || 0 + 1),
            addPercent: ts[e].percentChange24h || 0
          };
        }

        this.cacheData = r;
        this.totalSymbols = Object.values(r).sort(function (a, b) {
          return  b.percent - a.percent;
        });

        return r;
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
