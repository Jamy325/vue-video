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

        <section v-for=" data in bourseStatistics" class="blockBackground" style=" margin: 5px;padding: 10px" @click="onClick(data.bourse)">

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

export default {
    name: 'AssetList',
    components:{
        vfooter,
        titleBar
    },
    computed:{
      bourseStatistics(){
        let obj = this.$store.getters.bourseStatistics;
        return Object.values(obj);
      }
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
