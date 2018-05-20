<template>
    <section>
      <title-bar>

        <h1 slot="title">
          资产统计
        </h1>

        <router-link to="/me" slot="nextBtn">
          <div class="icon-next"></div>
        </router-link>
      </title-bar>
    <vfooter></vfooter>
      <section style="background-color: #343132; margin-top: 60px;padding-bottom: 5px">
        <section style="display:flex;flex-direction: row; margin: 5px;padding: 5px">
              <section style="border: 0px solid red;width: 55%">
                <section style=" font-size: 0.8rem;">
                 <span>1234</span>  <span style="font-size: 0.4rem">CNY</span>
                </section>

                <section style=" font-size: 0.5rem;">
                  <span style="color: red">-7.1235%</span>  <span style="font-size: 0.1rem">约为5BTC</span>
                </section>

              </section>

              <section style="margin: 5px;border: 0px solid blue;width: 45%">

              </section>
            </section>

            <section style="margin: 10px;opacity: 0.7;font-size: 0.2rem;color: #FFFFFF;letter-spacing: 0;">
              <section><span >累计投入<span>25</span>天,收益约为<span>212</span>CNY</span>
                <span style="margin-left: 2rem">币种:{{Object.keys(totalSymbols).length}}</span></section>
            </section>
        </section>

      <section v-for="(data, symbol) in totalSymbols" style="background-color: #3C3F40; margin: 5px;padding: 10px">
        <section style=" font-size: 0.5rem; display: flex;flex-direction: row;justify-content: space-between;align-items:center">
          <span>{{symbol}}</span> <span> ≈ ¥{{ data.cny}}</span>
        </section>
        <section style="font-size: 0.2rem;display: flex;flex-direction: row;justify-content: space-between;align-items:center">
          <span>{{symbol}}  <span style="color: grey">占{{data.percent}}%</span></span>
          <span style="color: #EE5A5A;letter-spacing: -0.33px;"> + ¥{{ data.addValue}}({{data.addPercent}}%)</span>
        </section>

        <section style="border: 1px solid #ace; height: 2rem;width: 100%">

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
          totalSymbols:{
              btc:{percent:10, cny:65535.123, addValue:10, addPercent:10},
              etc:{percent:10, cny:100.123, addValue:10, addPercent:10},
              ttc:{percent:10, cny:100.123, addValue:10, addPercent:10},
              bbc:{percent:10, cny:100.123, addValue:10, addPercent:10},
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
