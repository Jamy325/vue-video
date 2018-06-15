<template>
    <section class="orderbook">
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

      <section style="padding-bottom: 5px" class="blockBackground">

        <flexbox orient="vertical">
          <flexbox-item>

            <flexbox>
              <flexbox-item><div class="flex-demo-item">{{ticket.close.toFixed(2)}}</div></flexbox-item>
              <flexbox-item><div class="flex-demo-item">{{(ticket.close*ticket.price_cny).toFixed(2)}}</div></flexbox-item>
            </flexbox>

          </flexbox-item>
          <flexbox-item>

            <flexbox>
              <flexbox-item>
                <flexbox align="center" justify = "space-around">
                  <div class="flex-demo-item-1-1">{{((ticket.percentage || 0) *100).toFixed(2)}}%</div>
                  <div class="flex-demo-item-1-1">{{(ticket.close*(ticket.percentage || 0)*ticket.price_cny).toFixed(2)}}</div>
                </flexbox>

              </flexbox-item>

              <flexbox-item>
                <flexbox align="center" justify = "space-around">
                  <div class="flex-demo-item-1-2">24h最低</div>
                  <div class="flex-demo-item-1-2">{{(ticket.low*ticket.price_cny).toFixed(2)}}</div>
                </flexbox>
              </flexbox-item>
            </flexbox>

          </flexbox-item>
          <flexbox-item>

            <flexbox>
              <flexbox-item>
                <flexbox align="center" justify = "space-around">
                  <div class="flex-demo-item-1-2">24h成交</div>
                  <div class="flex-demo-item-1-2">{{(ticket.baseVolume).toFixed(2)}}</div>
                </flexbox>

              </flexbox-item>

              <flexbox-item>
                <flexbox align="center" justify = "space-around">
                  <div class="flex-demo-item-1-2">24h最高</div>
                  <div class="flex-demo-item-1-2">{{(ticket.high*ticket.price_cny).toFixed(2)}}</div>
                </flexbox>
              </flexbox-item>
            </flexbox>

          </flexbox-item>
        </flexbox>

        <div style="height: 150px; border: 0px solid red;margin: 0px;padding: 5px">
          <chart-symbol-history :symbol="this.$route.params.symbol.split('_')[0]">

          </chart-symbol-history>
        </div>

        <tab :line-width=2 v-model="index" prevent-default @on-before-index-change="switchTabItem">
          <tab-item selected>委托订单</tab-item>
          <tab-item>最新成交</tab-item>
        </tab>
        <swiper v-model="index" height="500px" :show-dots="false">
          <swiper-item :key="0">
            <x-table full-bordered class="blockBackground" :cell-bordered="false">
              <thead>
              <tr>
                <th style="color: green">出价</th>
                <th style="color: white">数量</th>
                <th style="color: red">出价</th>
                <th style="color: white">数量</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,idx) of orderbook.bids">
                <td style="color: green">{{item[0]}}</td>
                <td style="color: white">{{item[1]}}</td>
                <td style="color: red">{{orderbook.asks[idx][0]}}</td>
                <td style="color: white">{{orderbook.asks[idx][0]}}</td>
              </tr>
              </tbody>
            </x-table>
          </swiper-item>

          <swiper-item :key="1">
            <x-table full-bordered class="blockBackground" :cell-bordered="false">
              <thead>
              <tr>
                <th>类型</th>
                <th>价格</th>
                <th>交易量</th>
                <th>时间</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,idx) of trades">
                <td v-if="item.side == 'buy'" style="color: red"> 买入 </td>
                <td v-else style="color: green">卖出</td>
                <td>{{item.price.toFixed(4)}}</td>
                <td>{{item.amount.toFixed(4)}}</td>
                <td>{{new Date(item.timestamp).toLocaleString()}}</td>
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
import ChartSymbolHistory from './ChartSymbolHistory'
import { url,initHome,getAvator } from '../data/fetchData'
import { mapActions ,mapState } from 'vuex'
import { Tab, TabItem,Swiper,SwiperItem,XInput, Selector,Cell, Group, XTextarea,Flexbox, FlexboxItem,XTable,XButton} from 'vux'

export default {
    name: 'OrderBook',
    components:{
        vfooter,
      titleBar,
      ChartSymbolHistory,
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
            close:20,
            price_cny:12,
            percentage:12.12,
            low:0,
            hight:0,
            baseVolume:1234
          },
          orderbook:{
            bids:[
            ],
            asks:[
            ]
          },
          trades:[]
        }
    },
    computed:{
      nextPath(){
        let params = this.$route.params;
        return "/SellBuy/"+ params.bourse+"/"+params.symbol;
      }
    },
    created () {
      let params = this.$route.params;
      let symbol = params.symbol.replace("_","/");
      let bourse = params.bourse;

      let arg = {symbol:symbol, bourse:bourse};

      this.loadOrderBookData(arg);
      this.loadTicker(arg);
      this.loadTrade(arg);

    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        //'$route': 'initData'
    },
    methods:{
      switchTabItem (index) {
        this.index = index
      },
      loadTicker(arg){
        this.$store.dispatch("loadSymbolPriceTicker", arg).then((data)=>{
          this.ticket = data;
        }).catch(e=>{
          this.$vux.toast.show({
            text: e.message ? e.message : e.error,
            type:'cancel',
            width:'15em'
          });
        });
      },
      loadOrderBookData(arg){
        this.$store.dispatch("loadOrderBookData",arg).then((data)=>{
          this.orderbook = data;
        }).catch(e=>{
          this.$vux.toast.show({
            text: e.message ? e.message : e.error,
            type:'cancel',
            width:'15em'
          });
        });
      },
      loadTrade(arg){
        this.$store.dispatch("loadTrades",arg).then((data)=>{
          this.trades = data;
        }).catch(e=>{
          this.$vux.toast.show({
            text: e.message ? e.message : e.error,
            type:'cancel',
            width:'15em'
          });
        });
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

  .orderbook {
    .vux-tab{
      background-color: transparent;
    };
  };

</style>
