<template>
    <section>
      <title-bar>

        <h1 slot="title">
          <div style="font-size: 0.2rem; opacity: 0.5; text-align: center">{{this.$route.params.bourse}}</div>

          <div style="font-size: 0.5rem">{{this.$route.params.symbol.replace('_',"/")}}</div>

        </h1>

        <router-link to="/assetlist" slot="nextBtn">
          <div class="icon-add"></div>
        </router-link>
      </title-bar>
    <vfooter></vfooter>
      <section style="background-color: #343132; margin-top: 60px;padding-bottom: 5px">


        <section style="display: flex;flex-direction: row;justify-content: space-between;">

          <section style="width: 50%">

            <div> {{ ticket.open }} </div>

            <section style="display: flex;flex-direction: row;justify-content: space-between; align-items: center">
              <span> {{ticket.percentage}} </span>
              <span> {{ticket.open * ticket.price_cny}} </span>
            </section>

            <section>
              <span> 24小时成交</span>
              <span>
              {{ticket.baseVolume}}
              </span>
            </section>

          </section>

          <section>
            222
          </section>

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
    data () {
        return {
          ticket:{
            bourse:"huobi",
            symbol:"btc/usd",
            open:20,
            price_cny:12,
            percentage:12.12,
            baseVolume:1234
          },
          orderbook:{
            bids:[
              [12,1],
              [13,2],
              [14,3],
              [15,4]
            ],
            asks:[
              [21,5],
              [22,6],
              [23,7],
              [24,8]
            ]
          }
        }
    },
    computed:{

    },
    created () {

    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        //'$route': 'initData'
    },
    methods:{

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>


</style>
