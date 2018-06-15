<template>
  <section class="assetAddClass">
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

    <swiper v-model="index" height="600px" :show-dots="false">
      <swiper-item :key="0">
          <group gutter="0px">
            <x-input placeholder="填写资产标题" v-model="formInline.title"  placeholder-align="left"></x-input>
            <x-input placeholder="填写资产成本"  v-model="formInline.cost" placeholder-align="left">
              <selector slot="right-full-height" placeholder="请选择" v-model="formInline.costCoinType" :options="coinList"></selector>
            </x-input>

            <selector  placeholder="请选择交易所" v-model="formInline.bourse" :options="bourses" name="value" @click.native="onClickBourse"></selector>
            <x-textarea placeholder="请输入Key" title="API Key" v-model="formInline.key" :show-counter="false" :rows="4" :cols="35" ></x-textarea>
            <x-textarea placeholder="请输入Secret" title="Secret" v-model="formInline.secret" :show-counter="false"  :rows="4" :cols="35"></x-textarea>

            <x-button type="primary" action-type="button" style="width: 50%;margin: 5px auto 10px auto" @click.native="onSubmit">提交</x-button>
          </group>


      </swiper-item>

      <swiper-item :key="1">
        <div class="tab-swiper vux-center">敬请期待</div>
      </swiper-item>

      <swiper-item :key="2">
        <div class="tab-swiper vux-center">敬请期待</div>
      </swiper-item>
    </swiper>

  </section>
</template>

<script>
import vfooter from './common/vfooter.vue'
import titleBar from './common/titleBar.vue'

import { ajax_postAddExchange, ajax_getBourse} from '../data/fetchData'
import { mapActions ,mapState } from 'vuex'

import {Toast, XButton, Tab, TabItem,Swiper,SwiperItem,XInput, Selector,Cell, Group, XTextarea} from 'vux'

export default {
    name: 'Asset',
    components:{
      vfooter,
      Toast,
      titleBar,
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      XInput,
      Selector,
      Cell,
      Group,
      XButton,
      XTextarea
    },
    data () {
        return {
          index:0,
          index01:0,
          formInline:{
            title:'',
            cost:100,
            bourse:'',
            costCoinType:'CNY',
            key:'',
            secret:''
          },
          activeName:'first',
          coinTypes:[{
            value: '选项1',
            label: '黄金糕'
          }]
        }

    },
    computed:{
      ...mapState(["bourses","coinList"]),
    },
    created(){
      this.loadBourseData();
    },
    methods:{
      check(){
        let form = this.formInline;

        let err = "";
        if (form.title == ''){
            err = "标题不能为空";
            return err;
        }

        let cost = parseInt(form.cost || 0);
        if (cost == 0){
          err = "成本填写错误";
          return err;
        }

        if ((form.costCoinType || "")== ""){
          err = "必须选择成本单位";
          return err;
        }


        if ((form.bourse || "") == "") {
          err = "必须选择一个交易所";
          return err;
        }

        if ((form.key || "") == "" ){
          err = "key 不能为空";
          return err;
        }

        if ((form.secret || "") == "" ){
          err = "secret 不能为空";
          return err;
        }

        return err;
      },

      onSubmit () {
        let errMsg = this.check();
        if (errMsg.length > 0){
          this.$vux.toast.show({
            text: errMsg,
            type:'cancel',
            width:'15em'
          });
          return
        }

        ajax_postAddExchange(this.formInline).then(data=>{
          this.$vux.toast.show({text:'添加成功'});
          this.$router.push("/");
        }).catch(e => {
          this.$vux.toast.show({
            text: e.message ? e.message : e.error,
            type:'cancel',
            width: '15em'
          });
        });
      },

      switchTabItem (index) {
          this.index = index
      },

      loadBourseData(){
        if (this.bourses.length == 0){
          this.$store.dispatch("loadBourseData",{});
        }
      },

      onClickBourse(){
          this.loadBourseData();
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .assetAddClass {
    .vux-x-textarea{
      flex-direction: column;
    };

    .vux-tab{
      background-color: transparent;
    };
  };
</style>
