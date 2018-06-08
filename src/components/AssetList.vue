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

      <section style="padding-bottom: 5px">

        <section v-for="(data, bourses) in bourses" class="blockBackground" style=" margin: 5px;padding: 10px" @click="onClick(bourses)">

          <section style=" font-size: 2em; display: flex;flex-direction: row;justify-content: space-between;">
            <span>{{data.title}}</span>

            <section style="width:50%; font-size: 0.5em;display: flex;flex-direction: column;justify-content: space-between;align-items:center">
              <section style="width: 100%">
                <span style="opacity: 0.6;">成本/{{data.costCoinType}}</span> <span style="margin-left: 20px"> {{data.cost}}</span>
              </section>

              <section style="width: 100%">
                <span style="opacity: 0.6;">收益/{{data.costCoinType}}</span> <span style="margin-left: 20px"> {{data.earnings.toFixed(2)}} </span>
              </section>
            </section>
          </section>

          <section>
            <span style="font-family: Avenir-Medium;font-size: 2em;color: #5FCF64;letter-spacing: -0.53px;">
              {{(data.addPercent*100).toFixed(2)}}%
            </span>
          </section>

          <section>
            <span style="font-family: Avenir-Medium;font-size: 2em;color: #ffffff;letter-spacing: -0.53px;">
              {{data.total.toFixed(2)}}
            </span>
            <span style="font-family: Avenir-Book;font-size: 1em;color: #ffffff;letter-spacing: 0;line-height: 2em;">
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
          }
        }
    },
    computed:{

    },
    created () {
      this.initData();
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        //'$route': 'initData'
    },
    methods:{
      onClick(bourse){
        console.log(bourse +" on click");
        this.$router.push({name:'assetdetail', params:{bourse:bourse}});
      },
      initData(){
        let userdata = this.$store.state.userdata;
        if (!userdata) return;

        let assets = userdata.assets || [];
        for(let e of assets){

            let balance = e.balance || [];
            let totalCNY = 0;
            for(let b of balance){
              totalCNY += b.totalCNY;
            }

            let earn = totalCNY - e.cost;

            this.bourses[e.bourse] = {
              title:e.title,
              cost:e.cost,
              costCoinType:e.costCoinType,
              earnings: earn,
              addPercent: earn / e.cost,
              total: totalCNY
            };
        }
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>


</style>
