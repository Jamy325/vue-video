<template>
  <section>


      <section>
        <title-bar>
          <router-link to="/asset" slot="backBtn">
            <div class="icon-back"></div>
          </router-link>

          <h1 slot="title">
            资产明细-{{symbol}}
          </h1>

        </title-bar>
        <vfooter></vfooter>
      </section>



      <section style="background-color: #343132; margin-left: 10px; margin-right: 10px; margin-top: 60px;padding-bottom: 5px;">

        <div style="width: 100%; height: 200px; border: 1px solid red">

        </div>

        <section style=" font-size: 0.5rem; margin-top:10px ;display: flex;flex-direction: row;justify-content: space-around;">
          <section>
            <section style="display: flex;flex-direction: row;justify-content: space-between;">
              <div>价值</div>
              <div>{{totalCNY}}</div>
            </section>

            <section style="display: flex;flex-direction: row;justify-content: space-between;">
              <div>收益</div>
              <div>{{earning}}</div>
            </section>
          </section>


          <section>
            <section style="display: flex;flex-direction: row;justify-content: space-between;">
              <div>成本</div>
              <div>{{totalCNY}}</div>
            </section>

            <section style="display: flex;flex-direction: row;justify-content: space-between;">
              <div>涨幅</div>
              <div>{{earning}}</div>
            </section>
          </section>
        </section>

      </section>


    <section style="display: flex;flex-direction: row;justify-content: space-between; font-size: 0.5rem;margin: 10px; border: none; border-bottom: 1px solid #3b3b3b">
        <div>总量</div>
        <div style="margin-right: 10px">{{total}}</div>
    </section>


    <section v-for="d in parts" style="display: flex;flex-direction: row;justify-content: space-between; font-size: 0.3rem;margin: 10px; border: none; border-bottom: 1px solid #3b3b3b">

      <section style="display: flex;flex-direction: column;justify-content: space-between;">
        <span style="font-size: 0.5rem">{{d.title}}</span>
        <span style="font-size: 0.1rem;opacity: 0.5">{{d.type}}</span>
        <span>&nbsp</span>
      </section>

      <section style="display: flex;flex-direction: column;justify-content: space-between;">
        <span style="font-size: 0.4rem">{{d.total}}</span>
        <span style="opacity: 0.5">占比{{d.percent}}%</span>
        <span style="opacity: 0.5">价值{{d.totalCNY}}</span>
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
    name: 'symboldetail',
    components:{
        vfooter,
      titleBar
    },
    data(){
        return  {
          symbol:'',
          totalCNY:100,
          earning:10,
          cost:100,
          addPercent:10.1,
          total:100,

        }
    },

  computed:{
    parts(){
      return [
        {
            type:"blance api",
            title:"我的B网",
            total:100,
            percent:10.15,
            totalCNY:1234
        },
        {
          type:"huobi api",
          title:"我的huobi",
          total:100,
          percent:50.15,
          totalCNY:34
        }
      ];
    }

  },

  beforeRouteEnter(to, from, next) {
    next(function (vm) {
      vm.initData();
    });
  },

  beforeRouteUpdate (to, from, next) {
      this.initData();
     next();
    },
    methods:{
      initData(){
          let symbol = this.$route.params.symbol;
          this.symbol = symbol;
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .des{
    opacity: 0.5;
    font-family: PingFangSC-Regular;
    font-size: 0.1rem;
    color: #FFFFFF;
    letter-spacing: 0;
  }

</style>
