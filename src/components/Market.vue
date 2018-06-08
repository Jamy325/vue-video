<template>
    <section>
      <title-bar>

        <h1 slot="title">
          市场交易
        </h1>

        <router-link to="/assetlist" slot="nextBtn">
          <div class="icon-add"></div>
        </router-link>
      </title-bar>
    <vfooter></vfooter>

          <template v-for="(m,index) in markets" >

                <section @click="onClickItem(markets[index].bourse , markets[index].symbol )"
                </section>

              <section v-if="!!markets[index + 1]" @click="onClickItem(markets[index + 1].bourse, markets[index + 1].symbol )"
              </section>
            </section>
          </template>

      </section>
    </section>
</template>

<script>
import vfooter from './common/vfooter.vue'
import titleBar from './common/titleBar.vue'
import { mapActions ,mapState } from 'vuex'

export default {
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
