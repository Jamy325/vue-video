<template>
    <section>
      <title-bar>
        <router-link to="/market" slot="backBtn">
          <div class="icon-back"></div>
        </router-link>

        <h1 slot="title">
          <div style="font-size: 0.2rem; opacity: 0.5; text-align: center">{{this.$route.params.bourse}}</div>

          <div style="font-size: 0.5rem">{{this.$route.params.symbol.replace('_',"/")}}</div>
        </h1>

        <router-link to="/assetlist" slot="nextBtn">
          <div class="icon-add"></div>
        </router-link>
      </title-bar>
    <vfooter></vfooter>
      <section style=" padding-bottom: 5px" class="blockBackground ">


        <section style="display: flex;flex-direction: row;justify-content: space-around;">

          <section style="width: 50%; border: 1px solid red; margin: 2px;padding: 2px">

            <div style="text-align: center;font-family: Avenir-Book;font-size: 20px;color: #FFFFFF;letter-spacing: 0;padding: 2px"> {{ ticket.open }} </div>

            <section style="display: flex;flex-direction: row;justify-content: space-around; align-items: center">
              <span style="font-family: Avenir-Book;font-size: 15px;color: #EE5A5A;line-height: 25px;"> -{{ticket.percentage}}% </span>
              <span style="font-family: Avenir-Book;font-size: 15px;color: #EE5A5A;line-height: 25px;"> -{{(ticket.percentage*ticket.open * ticket.price_cny / 100).toFixed(2)}} </span>
            </section>

            <section style="display: flex;flex-direction: row;justify-content: space-around; align-items: center">
              <span style="opacity: 0.6;font-family: Avenir-Book;font-size: 15px;color: #FFFFFF;line-height: 10px;"> 24小时成交</span>
              <span style="opacity: 0.6;font-family: Avenir-Book;font-size: 15px;color: #FFFFFF;line-height: 10px;">
              {{ticket.baseVolume}}
              </span>
            </section>

          </section>

          <section style="width: 50%; border: 1px solid red; margin: 2px;padding: 2px">
            <div style="text-align: center;font-family: Avenir-Book;font-size: 20px;color: #FFFFFF;letter-spacing: 0;padding: 5px"> ¥{{(ticket.open * ticket.price_cny).toFixed(2)}} </div>

            <section style="display: flex;flex-direction: row;justify-content: space-around; align-items: center">
              <span> 24小时最低 </span>
              <span>  </span>
            </section>

            <section >
              <span> 24小时成交</span>
              <span>
              {{ticket.baseVolume}}
              </span>
            </section>
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
            open:221212.10,
            price_cny:1.13,
            percentage:1.12,
            baseVolume:1234456.123,

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
