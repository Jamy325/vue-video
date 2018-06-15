<template>
    <section>
      <title-bar>
        <router-link :to="backPath" slot="backBtn">
          <div class="icon-back"></div>
        </router-link>

        <h1 slot="title">
          <div style="font-size: 1em">历史委托</div>

        </h1>

      </title-bar>

      <section style="background-color: #343132;margin: 2px;padding: 2px">
        <flexbox orient="vertical">

          <flexbox-item v-for="order in orders" :key="order.id">
            <group gutter="0px">
              <cell :title="order.symbol"> {{order.type == 'market' ? '市价':'限价' }}委托</cell>

              <cell-box>
                <flexbox align="center">
                  <flexbox-item>
                    <div style="text-align: center">
                      <div>
                      {{order.amount}}
                      </div>
                      <div>委托数量</div>

                    </div>
                  </flexbox-item>
                  <flexbox-item>
                    <div style="text-align: center">
                      <div>
                        {{order.filled}}
                      </div>
                      <div>成交数量</div>
                    </div>
                  </flexbox-item>
                </flexbox>
              </cell-box>

              <cell title="委托价格">{{order.price}}</cell>
              <cell title="成交均价">{{order.average}}</cell>
              <cell title="委托时间">{{
                new Date(order.timestamp).toLocaleString()
                }}</cell>
              <cell>

                <span slot="title" style="color: green">
                  {{order.status }}
                </span>
                <x-button v-if="order.status == 'open'">撤销</x-button>
              </cell>
            </group>
          </flexbox-item>

        </flexbox>


      </section>

    </section>
</template>

<script>
import vfooter from './common/vfooter.vue'
import titleBar from './common/titleBar.vue'
import { url,initHome,getAvator } from '../data/fetchData'
import { mapActions ,mapState } from 'vuex'
import { Tab, TabItem,Swiper,SwiperItem,XInput, Selector,Cell, Group, XTextarea,Flexbox, FlexboxItem,XTable,XButton, CellBox} from 'vux'

export default {
    name: 'HistoryDelegate',
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
      XButton,
      CellBox
    },
    data () {
        return {
          index:0,

          orders:[
          //   { id: 1238528370,//订单id
          //   timestamp: 1517992068188,//委托时间
          //   datetime: '2018-02-07T08:27:48.188Z',//utc标准时间
          //   symbol: 'PAY/BTC',//交易对
          //   type: 'limit',//订单类型:market市价,limit限价
          //   side: 'sell', // sell卖出, buy买入
          //   price: 0, // 委托价格
          //   average: 0.0002,
          //   cost: 0.0002,
          //   amount: 1,//委托数量
          //   filled: 1,//成交量
          //   remaining: 0,
          //   status: 'open'// 订单状态'open' 进行中, 'closed' 已关闭, 'canceled'已取消
          // },
          ]

        }
    },
    computed:{
      backPath(){
        let params = this.$route.params;
        return "/SellBuy/"+ params.bourse+"/"+params.symbol;
      }
    },
    created () {
      let params = this.$route.params;
      let symbol = params.symbol.replace("_","/");
      let bourse = params.bourse;

      let arg = {symbol:symbol, bourse:bourse};
        this.loadOrders(arg);
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        //'$route': 'initData'
    },
    methods:{
      switchTabItem (index) {
        this.index = index
      },

      loadOrders(arg){
        this.$store.dispatch("loadOrders",arg).then((data)=>{
          this.orders = data;
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

</style>
