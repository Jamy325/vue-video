<template>
    <section>
      <title-bar>

        <h1 slot="title">
          市场交易
        </h1>

        <router-link to="/ChooseBourse" slot="nextBtn">
          <div class="icon-add"></div>
        </router-link>
      </title-bar>
    <vfooter></vfooter>
      <section style=" padding-bottom: 5px">

          <template v-for="(m,index) in markets" >
            <section v-if ="index % 2 == 0"  style="display: flex;flex-direction: row;justify-content: space-between; margin: 5px">

                <section @click="onClickItem(markets[index].bourse , markets[index].symbol )"
                         :class="markets[index].cls"
                  style="display: flex;flex-direction: column;justify-content: space-around; align-items: center; border: 5px solid #1D2024;  padding: 15px; width: 50%">
                  <section>
                    <span style="font-size: 1em">{{ markets[index].symbol }} </span>
                    <span style="opacity: 0.5">{{ markets[index].bourse }}</span>
                  </section>
                  <section style="margin: 5px;padding: 5px">
                    <span style="font-size: 2em"> {{ parseFloat(markets[index].open.toFixed(8)) }} </span>
                  </section>
                  <section>
                    <span style="font-size: 1.5em; color: red"> {{ (markets[index].percentage * 100).toFixed(2) }}%</span>
                    <span style="font-size: 1.5em; opacity: 0.5">¥{{(markets[index].price_cny * markets[index].open).toFixed(2) }}</span>
                  </section>
                </section>

              <section v-if="!!markets[index + 1]" @click="onClickItem(markets[index + 1].bourse, markets[index + 1].symbol )"
                       :class="markets[index + 1].cls"
                       style="display: flex;flex-direction: column;justify-content: space-around; align-items: center; padding: 15px; border: 5px solid #1D2024; width: 50%">
                <section>
                  <span style="font-size: 1em">{{ markets[index + 1].symbol }} </span>
                  <span style="opacity: 0.5">{{ markets[index+1].bourse }}</span>
                </section>
                <section style="margin: 5px;padding: 5px">
                  <span style="font-size: 2em"> {{ parseFloat(markets[index + 1].open.toFixed(8)) }} </span>
                </section>
                <section>
                  <span style="font-size: 1.5em; color: red"> {{ (markets[index + 1].percentage * 100).toFixed(2)  }}%</span>
                  <span style="font-size: 1.5em; opacity: 0.5">¥{{ (markets[index + 1].price_cny * markets[index + 1].open).toFixed(2) }}</span></section>
              </section>
            </section>
          </template>

      </section>
    </section>
</template>

<script>
import vfooter from './common/vfooter.vue'
import titleBar from './common/titleBar.vue'
import { url,ajax_getSymbolPriceTicket } from '../data/fetchData'
import { mapActions ,mapState } from 'vuex'

export default {
  name: 'Asset',
  components: {
    vfooter,
    titleBar
  },
  data () {
    return {
      markets: [
//            {
//              bourse:"binance",
//              symbol:"btc/usd",
//              open:10,
//              price_cny:12,
//              percentage:12.12
//            },
      ]
    }
  },
  computed: {},
  created () {
    this.initData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    //'$route': 'initData'
  },
  methods: {
    onClickItem(bourse, symbol){
      console.log(symbol + " item click");
      let s = symbol.replace("/", "_");
      this.$router.push({name: 'orderbook', params: {bourse: bourse, symbol: s}});
    },
    initData () {
      let userdata = this.$store.state.userdata;
      if (!userdata) return;

      let market = userdata.markets || [];

      let marketData = [];
      let pms = [];

      function LoadPriceTicket(md) {
        return new Promise(function (resolve, reject) {
            ajax_getSymbolPriceTicket({bourse:md.bourse, symbol:md.symbol}).then(function (result) {
              let data = result.data;

              md.open = data.close || 0;
              md.price_cny = data.price_cny || 0;
              md.percentage = data.percentage || 0;
              md.v = 1;

              resolve();
            }).catch(function (e) {
                md.cls = 'disableBackground';
                md.v = 0;
                resolve();
            })
        })
      }

      for (let m of market) {
        let md = {bourse: m.bourse, symbol: m.symbol, cls:'blockBackground', open: 0, price_cny: 0, percentage: 0, v:0};
        marketData.push(md);
        pms.push(LoadPriceTicket(md));
      }

    //  this.markets = marketData;
    let self = this;
      Promise.all(pms).then(function (e) {
        marketData.sort(function (a, b) {
            if (a.v == b.v && a.v == 1){
              return b.open - a.open;
            }
            return b.v - a.v;
        });

        self.markets = marketData;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>


</style>
