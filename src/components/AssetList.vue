<template>
  <section>


      <section>
        <title-bar>
          <router-link to="/asset" slot="backBtn">
            <div class="icon-back"></div>
          </router-link>

          <h1 slot="title">
            资产列表
          </h1>

          <router-link to="/assetadd" slot="nextBtn">
            <div class="icon-add"></div>
          </router-link>
        </title-bar>
        <vfooter></vfooter>
      </section>

      <section style="background-color: #343132; margin-top: 60px;padding-bottom: 5px">

        <section v-for="(data, bourses) in bourses" style="background-color: #3C3F40; margin: 5px;padding: 10px" @click="onClick(bourses)">

          <section style=" font-size: 0.5rem; display: flex;flex-direction: row;justify-content: space-between;">
            <span>{{data.title}}</span>

            <section style="width:50%; font-size: 0.2rem;display: flex;flex-direction: column;justify-content: space-between;align-items:center">
              <section style="width: 100%">
                <span style="opacity: 0.6;">成本/{{data.costCoinType}}</span> <span style="margin-left: 20px"> {{data.cost}}</span>
              </section>

              <section style="width: 100%">
                <span style="opacity: 0.6;">收益/{{data.costCoinType}}</span> <span style="margin-left: 20px"> {{data.earnings}} </span>
              </section>
            </section>
          </section>

          <section>
            <span style="font-family: Avenir-Medium;font-size: 48px;color: #5FCF64;letter-spacing: -0.53px;">
              {{data.addPercent}}%
            </span>
          </section>

          <section>
            <span style="font-family: Avenir-Medium;font-size: 54px;color: #ffffff;letter-spacing: -0.53px;">
              {{data.total}}
            </span>
            <span style="font-family: Avenir-Book;font-size: 36px;color: #ffffff;letter-spacing: 0;line-height: 74px;">
              {{data.costCoinType}}
            </span>
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
          bourses:{
              binance:{
                title:'我的B网',
                cost:'50',
                costCoinType:'CNY',
                earnings:1234.5,
                addPercent:10.01,
                total:123456,
              },
            birex:{
              title:'我的gate',
              cost:'50',
              costCoinType:'CNY',
              earnings:1234.5,
              addPercent:10.01,
              total:123456,
            },
            bigone:{
              title:'我的bigone',
              cost:'50',
              costCoinType:'CNY',
              earnings:1234.5,
              addPercent:100,
              total:123456,
            },
            huobi:{
              title:'我的huo',
              cost:'50',
              costCoinType:'CNY',
              earnings:1234.5,
              addPercent:100,
              total:123456,
            },
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
      onClick(bourse){
        console.log(bourse +" on click");
        this.$router.push({name:'assetdetail', params:{bourse:bourse}});
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>


</style>
