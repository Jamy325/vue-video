<template>
    <section class="SellBuy">
      <title-bar>
        <router-link :to="backPath" slot="backBtn">
          <div class="icon-back"></div>
        </router-link>

        <h1 slot="title">
          <div style="font-size: 0.5em; opacity: 0.5; text-align: center">{{this.$route.params.bourse}}</div>

          <div style="font-size: 1em">{{this.$route.params.symbol.replace('_',"/")}}</div>

        </h1>

        <router-link :to="nextPath" slot="nextBtn">
          <div style="color: white;font-size: 1em">历史委托</div>
        </router-link>
      </title-bar>

      <section style="margin: 2px;padding: 2px" class="blockBackground">

        <section style=" margin: 0px">
          <tab :line-width=2 v-model="index" prevent-default @on-before-index-change="switchTabItem">
            <tab-item selected>买入</tab-item>
            <tab-item>卖出</tab-item>
          </tab>

          <swiper v-model="index" height="220px" :show-dots="false">
            <swiper-item :key="0">
              <group gutter="0px">
                <x-input type="number" :show-clear="false" v-model="form.price" placeholder="价格"  placeholder-align="left"></x-input>
                <x-input type="number" :show-clear="false" v-model="form.amount" placeholder="数量"  placeholder-align="left">
                  <div slot="right">
                    {{this.$route.params.symbol.split("_")[0]}}
                  </div>
                </x-input>

                <x-input type="number" :value="form.price*form.amount" placeholder="金额"  placeholder-align="left">
                  <div slot="right">
                    {{this.$route.params.symbol.split("_")[1]}}
                  </div>
                </x-input>

                <x-button class="xbutton" type="primary" @click.native="onBuy()">立即买入</x-button>

                <cell>
                  <span slot="title" style="color: red;font-size: 0.5em">可用余额({{this.$route.params.symbol.split('_')[0]}})</span>
                    100
                  </cell>
              </group>
            </swiper-item>

            <swiper-item :key="1">

              <group gutter="0px">
                <x-input type="number" v-model="form.price"  placeholder="价格"  placeholder-align="left"></x-input>
                <x-input  type="number" v-model="form.amount" placeholder="数量"  placeholder-align="left">
                  <div slot="right">
                    {{this.$route.params.symbol.split("_")[0]}}
                  </div>
                </x-input>

                <x-input type="number" :value="form.price*form.amount" placeholder="金额"  placeholder-align="left">
                  <div slot="right">
                    {{this.$route.params.symbol.split("_")[1]}}
                  </div>
                </x-input>
                <x-button class="xbutton" type="primary" @click.native="onSell()">立即卖出</x-button>
                <cell>
                  <span slot="title" style="color: red;font-size: 0.5em">可用余额({{this.$route.params.symbol.split('_')[1]}})</span>
                  100
                </cell>
              </group>

            </swiper-item>

          </swiper>
        </section>


        <div style="width: 100%; height: 260px;border: 0px solid #1ABC9C">
          <MarketDepthChart :orderbook="orderbook">

          </MarketDepthChart>
        </div>
        <div style="margin-top: 10px">
          <x-table :full-bordered="false" class="blockBackground" :cell-bordered="false" :contentBordered="true">
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
        </div>
      </section>
    </section>
</template>

<script>
import vfooter from './common/vfooter.vue'
import titleBar from './common/titleBar.vue'
import KLine from "./KLine"
import MarketDepthChart from "./MarketDepthChart"

import { ajax_postCreateLimitBuyOrder, ajax_postCreateLimitSellOrder, ajax_getKline} from '../data/fetchData'
import { mapActions ,mapState } from 'vuex'
import { Tab, TabItem,Swiper,SwiperItem,XInput, Selector,Cell, Group, XTextarea,Flexbox, FlexboxItem,XTable,XButton} from 'vux'

export default {
    name: 'SellBuy',
    components:{
      vfooter,
      KLine,
      MarketDepthChart,
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
          orderbook:{
            bids:[
            ],
            asks:[
            ]
          },
          trades:{},
          form:{
            amount:0,
            price:0
          },
          klinedata:[]
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
      }
    },
    created () {
      let params = this.$route.params;
      let symbol = params.symbol.replace("_","/");
      let bourse = params.bourse;

      let arg = {symbol:symbol, bourse:bourse};

      this.loadTrade(arg);
      this.loadKLineData(arg);
      this.loadOrderBookData(arg);
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        //'$route': 'initData'
    },
    methods:{
      switchTabItem (index) {
        this.index = index
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
      },

      check(){
          if (this.form.amount == 0) return "数量不能是0";
          if(this.form.price == 0) return "价格不能是0";
          return "";
      },
      onSell(){
        let error = this.check();
        if (error != ""){
          this.$vux.toast.show({
            text: error,
            type:'cancel',
            width:'15em'
          });
          return;
        }

        let params = this.$route.params;
        let symbol = params.symbol.replace("_","/");
        let bourse = params.bourse;

        ajax_postCreateLimitSellOrder({symbol:symbol, bourse:bourse, amount:this.form.amount, price:this.form.price}).then(result=>{
          this.$vux.toast.show({
            text: "请求提交成功",
            width:'15em'
          });

        }).catch(e=>{
          this.$vux.toast.show({
            text: e.message ? e.message : e.error,
            type:'cancel',
            width:'15em'
          });
        });

      },
      onBuy(){
        let error = this.check();
        if (error != ""){
          this.$vux.toast.show({
            text: error,
            type:'cancel',
            width:'15em'
          });
          return;
        }

        let params = this.$route.params;
        let symbol = params.symbol.replace("_","/");
        let bourse = params.bourse;

        ajax_postCreateLimitBuyOrder({symbol:symbol, bourse:bourse, amount:this.form.amount, price:this.form.price}).then(result=>{
          this.$vux.toast.show({
            text: "请求提交成功",
            width:'15em'
          });

        }).catch(e=>{
          this.$vux.toast.show({
            text: e.message ? e.message : e.error,
            type:'cancel',
            width:'15em'
          });
        });
      },
      loadKLineData(arg){

        ajax_getKline(arg).then(result=>{
          let data = result.data || [];

          //{time: "2015-11-19", start: 8.18, max: 8.33, min: 7.98, end: 8.32, volumn: 1810, money: 14723.56}
          let d = data.map(e=>{
             return {time: e[0], start:e[1], max: e[2], min:e[3], end:e[4], volume:e[5], money:12345};
          });

          d = d.slice(0, 50); // 仅显示100 个
          d.sort(function(obj1, obj2) {
            return obj1.time > obj2.time ? 1 : -1;
          });

          d.forEach(function(obj) {
            obj.range = [obj.start, obj.end, obj.max, obj.min];
            obj.trend = obj.start <= obj.end ? 0 : 1;
          });


          this.klinedata = d;
        }).catch(e=>{
          this.$vux.toast.show({
            text: e.message ? e.message : e.error,
            type:'cancel',
            width:'15em'
          });
        })
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

  .SellBuy {
  .vux-tab{
    background-color: transparent;
  };

    .xbutton{
      margin: 5px auto 5px auto;
      padding: 1px;
      border-radius:20px;
      height: 30px;
      width:240px;
      font-size: 0.5em
    }
  };

</style>
