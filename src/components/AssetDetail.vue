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

          <router-link to="/assetedit" slot="nextBtn">
            <div class="icon-edit"></div>
          </router-link>
        </title-bar>
        <vfooter></vfooter>
      </section>



      <section style="background-color: #343132; margin-top: 60px;padding-bottom: 5px">
        <section style=" font-size: 0.5rem; display: flex;flex-direction: row;justify-content: space-between;">
          <section>
            <div class="des">
             投入币种
            </div>

            <div>
             {{balance.length}}
            </div>

            <div class="des">
            累计投入天数{{dateCount}}
            </div>
          </section>

          <section>
            <div class="des">
              资产价值/CNY
            </div>
            <div style="color: green">
              {{totalCNY}}
            </div>

            <div class="des">
            成本{{cost}} {{costCoinType}}
            </div>
          </section>

          <section>
            <div class="des">
              价值波动
            </div>
            <div style="color: red">
            +{{addPercent}}%
            </div>

            <div class="des">
           收益  {{earning}}{{costCoinType}}
            </div>
          </section>

        </section>
      </section>


    <section style=" font-size: 0.4rem; display: flex;flex-direction: row;justify-content: space-between;">
      <section style="background-color: #343132; margin: 5px;padding: 10px;width: 50%">
        <section>
          {{valueFirst.symbol}} <span class="des">价值第一</span>
        </section>

        <section>
          {{valueFirst.value}} {{costCoinType}}
        </section>
      </section>

      <section style="background-color: #343132; margin: 5px;padding: 10px;width: 50%">
        <section>
          {{addFirst.symbol}}
          <span class="des">涨幅第一</span>
        </section>

        <section>
          <span style="color: red">
            +{{addFirst.value}}%
          </span>
        </section>
      </section>
    </section>

    <section style="background-color: #343132; margin: 5px;padding: 10px;">
      <div style="font-family: PingFangSC-Medium;font-size: 0.8rem;color: #FFFFFF;">资产构成</div>

      <div style="height: 150px;width: 100%;border: 1px solid red"> </div>

      <section v-for="b in balance" style=" margin-top: 10px; padding-right: 30px; font-size: 0.4rem; display: flex;flex-direction: row;justify-content: space-between;">
        <div>{{b.symbol}}</div>
        <div>{{b.total}} <span style="opacity: 0.5">(≈¥{{b.totalCNY}})</span></div>
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
    name: 'assetdetail',
    components:{
        vfooter,
      titleBar
    },
    data(){
        return  {
          "id": 1517553336776,
          "title": "我的火币",
          "cost": 100,
          "costCoinType": "CNY",
          "bourse": "huobipro",
          "createTime":1517553336777,
          "balance": [{
            "symbol": "PAY",
            "total": 10,
            "totalCNY": 111.12,
            "percentChange24h":-0.7
          },
            {
              "symbol": "BTC",
              "total": 10,
              "totalCNY": 1211.52,
              "percentChange24h":-0.7
            }
          ]
        }
    },

  computed:{


      totalCNY(){
        return 1000;
      },
      addPercent(){
        return 10.12
      },
      dateCount(){
        return 10;
      },
      earning(){
        return 10000;
      },
      valueFirst(){
        return {symbol:'CBT', value:102123.23};
      },
      addFirst(){
        return {symbol:'BTC', value:10.01};
      }
  },

  beforeRouteEnter(to, from, next) {
    // react to route changes...
    // don't forget to call next()
    console.log("update ........")
    next(function (vm) {
      console.log("next callback")
      vm.initData();
    });
  },

  beforeRouteUpdate (to, from, next) {
      // react to route changes...
      // don't forget to call next()
      console.log("update ........")
      this.initData();
     next();
    },
    methods:{
      initData(){
          let bourse = this.$route.params.bourse;



          this.bourseTitle = bourse;
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
