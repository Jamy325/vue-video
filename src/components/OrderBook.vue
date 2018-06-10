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

        <router-link :to="nextPath" slot="nextBtn">
          <div class="icon-add"></div>
        </router-link>
      </title-bar>

      <section style="background-color: #343132;padding-bottom: 5px">

        <flexbox orient="vertical">
          <flexbox-item>

            <flexbox>
              <flexbox-item><div class="flex-demo-item">{{ticket.open.toFixed(2)}}</div></flexbox-item>
              <flexbox-item><div class="flex-demo-item">{{(ticket.open*ticket.price_cny).toFixed(2)}}</div></flexbox-item>
            </flexbox>

          </flexbox-item>
          <flexbox-item>

            <flexbox>
              <flexbox-item>
                <flexbox align="center" justify = "space-around">
                  <div class="flex-demo-item-1-1">{{(ticket.percentage*100).toFixed(2)}}%</div>
                  <div class="flex-demo-item-1-1">{{(ticket.open*ticket.percentage*ticket.price_cny).toFixed(2)}}</div>
                </flexbox>

              </flexbox-item>

              <flexbox-item>
                <flexbox align="center" justify = "space-around">
                  <div class="flex-demo-item-1-2">24h最低</div>
                  <div class="flex-demo-item-1-2">{{(ticket.open*ticket.percentage*ticket.price_cny).toFixed(2)}}</div>
                </flexbox>
              </flexbox-item>
            </flexbox>

          </flexbox-item>
          <flexbox-item>

            <flexbox>
              <flexbox-item>
                <flexbox align="center" justify = "space-around">
                  <div class="flex-demo-item-1-2">24h成交</div>
                  <div class="flex-demo-item-1-2">{{(ticket.open*ticket.percentage*ticket.price_cny).toFixed(2)}}</div>
                </flexbox>

              </flexbox-item>

              <flexbox-item>
                <flexbox align="center" justify = "space-around">
                  <div class="flex-demo-item-1-2">24h最高</div>
                  <div class="flex-demo-item-1-2">{{(ticket.open*ticket.percentage*ticket.price_cny).toFixed(2)}}</div>
                </flexbox>
              </flexbox-item>
            </flexbox>

          </flexbox-item>
        </flexbox>

        <div style="height: 150px; border: 1px solid red;margin: 5px"> </div>

        <tab :line-width=2 v-model="index" prevent-default @on-before-index-change="switchTabItem">
          <tab-item selected>委托订单</tab-item>
          <tab-item>最新成交</tab-item>
        </tab>
        <swiper v-model="index" height="500px" :show-dots="false">
          <swiper-item :key="0">
            <x-table full-bordered style="background-color:#fff;" :cell-bordered="false">
              <thead>
              <tr >
                <th style="color: green">出价</th>
                <th>数量</th>
                <th style="color: red">出价</th>
                <th>数量</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) of orderbook.bids">
                <td style="color: green">{{item[0]}}</td>
                <td>{{item[1]}}</td>
                <td style="color: red">{{orderbook.asks[index][0]}}</td>
                <td>{{orderbook.asks[index][0]}}</td>
              </tr>
              </tbody>
            </x-table>
          </swiper-item>

          <swiper-item :key="1">
            <x-table full-bordered style="background-color:#fff;" :cell-bordered="false">
              <thead>
              <tr>
                <th>类型</th>
                <th>价格</th>
                <th>交易量</th>
                <th>时间</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Banana</td>
                <td>$1.20</td>
                <td>x 08</td>
                <td>x 08</td>
              </tr>
              </tbody>
            </x-table>
          </swiper-item>

        </swiper>

      </section>

      <div style=" position: fixed;bottom: 0; left: 25%; width: 50%; height: 60px; margin-left: auto; margin-right: auto">
        <x-button style="border-radius:99px;"type="primary">前往交易</x-button>
      </div>

    </section>
</template>

<script>
import vfooter from './common/vfooter.vue'
import titleBar from './common/titleBar.vue'
import { url,initHome,getAvator } from '../data/fetchData'
import { mapActions ,mapState } from 'vuex'
import { Tab, TabItem,Swiper,SwiperItem,XInput, Selector,Cell, Group, XTextarea,Flexbox, FlexboxItem,XTable,XButton} from 'vux'

export default {
    name: 'OrderBook',
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
              [15,4],
              [12,1],
              [13,2],
              [14,3],
              [15,4],
              [12,1],
              [13,2],
              [14,3],
              [15,4]
            ],
            asks:[
              [21,5],
              [22,6],
              [23,7],
              [24,8],
              [21,5],
              [22,6],
              [23,7],
              [24,8],
              [21,5],
              [22,6],
              [23,7],
              [24,8],
            ]
          }
        }
    },
    computed:{
      nextPath(){
        let params = this.$route.params;
        return "/SellBuy/"+ params.bourse+"/"+params.symbol;
      }
    },
    created () {

    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        //'$route': 'initData'
    },
    methods:{
      switchTabItem (index) {
        this.index = index
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '~vux/src/styles/1px.less';

  .flex-demo {
    text-align: center;
    width: 100%;
    margin: 5px;
    color: #fff;
    border: 1px solid gray;
    border-radius: 4px;
    background-clip: padding-box;
  }

  .flex-demo-item{
    text-align: center;
    border: 0px solid red;
    font-size: 2em;
  }

  .flex-demo-item-1-1{
    text-align: center;
    border: 0px solid red;
    font-size: 1.5em;
    color: red;
  }

  .flex-demo-item-1-2{
    text-align: center;
    opacity: 0.7;
    border: 0px solid red;
    font-size: 1.5em;
  }

</style>
