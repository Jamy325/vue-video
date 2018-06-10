<template>
    <section>
      <title-bar>
        <router-link :to="backPath" slot="backBtn">
          <div class="icon-back"></div>
        </router-link>

        <h1 slot="title">
          <div style="font-size: 0.2rem; opacity: 0.5; text-align: center">{{this.$route.params.bourse}}</div>

          <div style="font-size: 0.5rem">{{this.$route.params.symbol.replace('_',"/")}}</div>

        </h1>

        <router-link :to="nextPath" slot="nextBtn">
          <div style="color: white;font-size: 2em">历史委托</div>
        </router-link>
      </title-bar>

      <section style="background-color: #343132;margin: 2px;padding: 2px">
        <flexbox>
          <flexbox-item>

            <section style=" margin: 5px">
              <tab :line-width=2 v-model="index" prevent-default @on-before-index-change="switchTabItem">
                <tab-item selected>买入</tab-item>
                <tab-item>卖出</tab-item>
              </tab>

              <swiper v-model="index" height="220px" :show-dots="false">
                <swiper-item :key="0">
                  <group gutter="0px">
                    <x-input placeholder="价格"  placeholder-align="left"></x-input>
                    <x-input placeholder="数量"  placeholder-align="left">
                      <div slot="right">
                        {{this.$route.params.symbol.split("_")[0]}}
                      </div>
                    </x-input>

                    <x-input placeholder="金额"  placeholder-align="left">
                      <div slot="right">
                        {{this.$route.params.symbol.split("_")[1]}}
                      </div>
                    </x-input>
                    <x-button style="border-radius:20px;" type="primary">立即买入</x-button>
                    <cell>
                      <span slot="title" style="color: red;font-size: 0.5em">可用余额({{this.$route.params.symbol.split('_')[0]}})</span>
                        100
                      </cell>
                  </group>
                </swiper-item>

                <swiper-item :key="1">

                  <group gutter="0px">

                    <x-input placeholder="价格"  placeholder-align="left"></x-input>
                    <x-input placeholder="数量"  placeholder-align="left">
                      <div slot="right">
                        {{this.$route.params.symbol.split("_")[0]}}
                      </div>
                    </x-input>

                    <x-input placeholder="金额"  placeholder-align="left">
                      <div slot="right">
                        {{this.$route.params.symbol.split("_")[1]}}
                      </div>
                    </x-input>
                    <x-button style="border-radius:20px;" type="primary">立即卖出</x-button>
                    <cell>
                      <span slot="title" style="color: red;font-size: 0.5em">可用余额({{this.$route.params.symbol.split('_')[1]}})</span>
                      100
                    </cell>
                  </group>

                </swiper-item>

              </swiper>
            </section>

          </flexbox-item>

          <flexbox-item>
            <div style="width: 100%; height: 260px;border: 1px solid #1ABC9C">

            </div>
          </flexbox-item>
        </flexbox>

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

      </section>

    </section>
</template>

<script>
import vfooter from './common/vfooter.vue'
import titleBar from './common/titleBar.vue'
import { url,initHome,getAvator } from '../data/fetchData'
import { mapActions ,mapState } from 'vuex'
import { Tab, TabItem,Swiper,SwiperItem,XInput, Selector,Cell, Group, XTextarea,Flexbox, FlexboxItem,XTable,XButton} from 'vux'

export default {
    name: 'SellBuy',
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

    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        //'$route': 'initData'
    },
    methods:{
      switchTabItem (index) {
        this.index = index
      },

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
