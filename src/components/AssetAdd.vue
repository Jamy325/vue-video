<template>
  <section>


      <section>
        <title-bar>
          <router-link to="/asset" slot="backBtn">
            <div class="icon-back"></div>
          </router-link>

          <h1 slot="title">
            添加资产
          </h1>

        </title-bar>
        <vfooter></vfooter>
      </section>

      <tab :line-width=2 v-model="index" prevent-default @on-before-index-change="switchTabItem">
        <tab-item selected>交易所api</tab-item>
        <tab-item>钱包地址</tab-item>
        <tab-item>手动输入</tab-item>
      </tab>

    <swiper v-model="index" height="500px" :show-dots="false">
      <swiper-item :key="0">
          <group gutter="0px">
            <x-input placeholder="填写资产标题"  placeholder-align="left"></x-input>
            <x-input placeholder="填写资产成本"  placeholder-align="left">
              <selector slot="right-full-height" placeholder="请选择" v-model="formInline.costCoinType" :options="list"></selector>
            </x-input>

            <selector  placeholder="请选择交易所" v-model="formInline.bourse" :options="bourses"></selector>
            <x-textarea title="API Key" v-model="formInline.key" :show-counter="true" :max="256" :rows="4"></x-textarea>
            <x-textarea title="Secret" v-model="formInline.secret" :show-counter="true" :max="256" :rows="4"></x-textarea>
          </group>
      </swiper-item>

      <swiper-item :key="1">
        <div class="tab-swiper vux-center">2 Container</div>
      </swiper-item>

      <swiper-item :key="2">
        <div class="tab-swiper vux-center">3 Container</div>
      </swiper-item>
    </swiper>

  </section>
</template>

<script>
import vfooter from './common/vfooter.vue'
import titleBar from './common/titleBar.vue'

import { url,initHome,getAvator } from '../data/fetchData'
import { mapActions ,mapState } from 'vuex'

import { Tab, TabItem,Swiper,SwiperItem,XInput, Selector,Cell, Group, XTextarea} from 'vux'

export default {
    name: 'Asset',
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
      XTextarea
    },
    data () {
        return {
          index:0,
          index01:0,
          list: [{key: 'CNY', value: 'CNY'}, {key: 'USD', value: 'USD'}],
          bourses:[{key: 'huobi', value: 'huobi'}, {key: 'binanace', value: 'binance'}],
          formInline:{
            cost:100,
            bourse:'',
            costCoinType:'',
            key:'',
            secret:''
          },
          activeName:'first',
          coinTypes:[{
            value: '选项1',
            label: '黄金糕'
          }]
          ,
          costCoinTypeData: [{
            flex: 1,
            values: ['CNY','USD'],
            className: 'slot1'
          }]
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
      onSubmit:function () {

      },

      onCostTypeChange(picker, values) {
        this.formInline.costCoinType = values[0];
      },

      switchTabItem (index) {
          this.index = index
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';

  .assetlist{
   // padding-bottom: 5px;
    color: white;
  }
  .assetlist{
    .mint-navbar  {
      border: none;
      border-bottom: 1px solid #393939;
      background-color: transparent;
    }

    .mint-cell{
      border: 1px solid #393939;
      background-color: transparent;
    }

  textarea,
  select ,
  input{
      background: transparent;
      border: none;
    }
  }

  .tab-swiper {
    background-color: #252a31;
    height: 400px;
  }

</style>
