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
      <section style="padding-bottom: 5px">

          <template v-for="(m,index) in markets" >
            <section v-if ="index % 2 == 0"  style="display: flex;flex-direction: row;justify-content: space-between;">

                <section @click="onClickItem(markets[index].bourse , markets[index].symbol )"
                         class="blockBackground blockBorder"
                  style="display: flex;flex-direction: column;justify-content: space-around; align-items: center;  padding: 15px; width: 50%">
                  <section> <span style="font-size: 0.3rem">{{ markets[index].symbol }} </span><span style="opacity: 0.5">{{ markets[index].bourse }}</span> </section>
                  <section> <span style="font-size: 1rem"> {{ markets[index].open }} </span> </section>
                  <section> <span style="font-size: 0.3rem; color: red"> -{{ markets[index].percentage  }}%</span>
                  <span style="font-size: 0.3rem; opacity: 0.5">¥{{markets[index].price_cny * markets[index].open}}</span></section>
                </section>

              <section v-if="!!markets[index + 1]" @click="onClickItem(markets[index + 1].bourse, markets[index + 1].symbol )"
                       class="blockBackground blockBorder"
                       style="display: flex;flex-direction: column;justify-content: space-around; align-items: center; padding: 15px;width: 50%">
                <section> <span style="font-size: 0.3rem">{{ markets[index + 1].symbol }} </span><span style="opacity: 0.5">{{ markets[index+1].bourse }}</span> </section>
                <section> <span style="font-size: 1rem"> {{ markets[index + 1].open }} </span> </section>
                <section> <span style="font-size: 0.3rem; color: red"> -{{ markets[index + 1].percentage  }}%</span>
                  <span style="font-size: 0.3rem; opacity: 0.5">¥{{markets[index + 1].price_cny * markets[index + 1].open}}</span></section>
              </section>
            </section>
          </template>

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
          markets:[
            {
              bourse:"binance",
              symbol:"btc/usd",
              open:10,
              price_cny:12,
              percentage:12.12
            },
            {
              bourse:"huobi",
              symbol:"btc/usd",
              open:20,
              price_cny:12,
              percentage:12.12
            },
            {
              bourse:"bigone",
              symbol:"btc/usd",
              open:80,
              price_cny:12,
              percentage:12.12
            }
          ]
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
      onClickItem(bourse, symbol){
        console.log(symbol+" item click");
        let s = symbol.replace("/", "_");
        this.$router.push({name:'orderbook', params:{bourse:bourse, symbol:s}})
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>


</style>
