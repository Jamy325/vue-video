<template>
  <section>


      <section>
        <title-bar>
          <router-link to="/assetlist" slot="backBtn">
            <div class="icon-back"></div>
          </router-link>

          <h1 slot="title">
            资产详情-{{title}}
          </h1>

          <router-link :to="'/assetedit/'+this.$route.params.bourse" slot="nextBtn">
            <div class="icon-edit"></div>
          </router-link>
        </title-bar>
        <vfooter></vfooter>
      </section>

      <section style="padding-bottom: 5px">
        <section class="blockBackground" style=" padding: 10px; font-size: 2em; display: flex;flex-direction: row;justify-content: space-between;">
          <section>
            <div class="des">
             投入币种
            </div>

            <div>
             {{detail.balance.length}}
            </div>

            <div class="des">
            累计投入天数{{detail.dateCount}}天
            </div>
          </section>

          <section>
            <div class="des">
              资产价值/CNY
            </div>
            <div style="color: green">
              {{detail.total.toFixed(2)}}
            </div>

            <div class="des">
            成本{{detail.cost}} {{detail.costCoinType}}
            </div>
          </section>

          <section>
            <div class="des">
              价值波动
            </div>
            <div style="color: red">
            {{ (detail.addPercent*100).toFixed(2)}}%
            </div>

            <div class="des">
           收益  {{detail.earnings.toFixed(2)}}{{detail.costCoinType}}
            </div>
          </section>

        </section>
      </section>


    <section style=" font-size: 2em; display: flex;flex-direction: row;justify-content: space-between;">
      <section class="blockBackground" style=" margin: 5px;padding: 5px;width: 50%">
        <section>
          {{detail.valueFirst.symbol}} <span class="des">价值第一</span>
        </section>

        <section>
          {{detail.valueFirst.value.toFixed(2)}} {{detail.costCoinType}}
        </section>
      </section>

      <section class="blockBackground" style=" margin: 5px;padding: 5px;width: 50%">
        <section>
          {{detail.addFirst.symbol}}
          <span class="des">涨幅第一</span>
        </section>

        <section>
          <span style="color: red">
            {{ (detail.addFirst.value*100).toFixed(2)}}%
          </span>
        </section>
      </section>
    </section>

    <section  class="blockBackground" style=" margin: 5px;padding: 10px;">
      <div style="font-family: PingFangSC-Medium;font-size: 2em;color: #FFFFFF;">资产构成</div>

      <div style="height: 150px;width: 100%;border: 0px solid red; margin: 5px">
        <section style="margin-left: auto; margin-right: auto; width: 150px; height: 150px">
          <v-chart :data="detail.totalBalance" :height=150 :width=150 background-color="#252a31">
            <v-scale y :options="yOptions" />
            <v-tooltip disabled />
            <v-pie :radius="1" :inner-radius="0.7" series-field="name" :colors="colors" />
            <v-legend disabled />
          </v-chart>
        </section>

      </div>

      <section v-for="(b,index) in detail.totalBalance" style=" margin-top: 10px; padding-right: 10px; font-size: 1.5em; display: flex;flex-direction: row;justify-content: space-between;">
        <div :style="{ backgroundColor: colors[index]}">{{b.name}}</div>
        <div>{{b.total.toFixed(5)}} <span style="opacity: 0.5">(≈¥{{(b.totalCNY).toFixed(2)}})</span></div>
      </section>

    </section>
  </section>
</template>

<script>
import vfooter from './common/vfooter.vue'
import titleBar from './common/titleBar.vue'
import { url,initHome,getAvator } from '../data/fetchData'
import { mapActions ,mapState } from 'vuex'
import { VChart, VLine, VArea, VTooltip, VLegend, VBar, VPie, VScale } from 'vux'

export default {
    name: 'assetdetail',
    components:{
      vfooter,
      titleBar,
      VChart,
      VLine,
      VArea,
      VTooltip,
      VLegend,
      VBar,
      VPie,
      VScale
    },
    data(){
        return  {
          title:'',
          yOptions: {
            formatter (val) {
              return val * 100 + '%'
            },
          },

          legendOptions: {
            position: 'right',

          },

          colors:['#FE5D4D', '#3BA4FF','#737DDE','#335D4D', '#3B54FF','#727D1E']
        }
    },

  computed:{
    detail(){
      let obj = this.$store.getters.bourseStatistics;
      let bourse = this.$route.params.bourse;
      if (!bourse) console.log("=========error=bourse=null===")
      return obj[bourse] || {};
    }
  },

  beforeRouteEnter(to, from, next) {
    // react to route changes...
    // don't forget to call next()
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
        console.log("initData====")
        let bourse = this.$route.params.bourse;
        this.title = bourse;
        // let obj = this.$store.getters.bourseStatistics;
        // this.detail = obj[bourse] || {};
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .des{
    opacity: 0.5;
    font-family: PingFangSC-Regular;
    font-size: 0.6em;
    color: #FFFFFF;
    letter-spacing: 0;
  }

</style>
