<template>
  <section class="assetEditClass">
      <section>
        <title-bar>
          <router-link to="/assetlist" slot="backBtn">
            <div class="icon-back"></div>
          </router-link>

          <h1 slot="title">
            编辑资产
          </h1>

        </title-bar>
        <vfooter></vfooter>
      </section>

    <section>
      <group gutter="0px">
        <x-input placeholder="填写资产标题" v-model="formInline.title"  placeholder-align="left"></x-input>
        <x-input placeholder="填写资产成本"  v-model="formInline.cost" placeholder-align="left">
          <selector slot="right-full-height" placeholder="请选择" v-model="formInline.costCoinType" :options="coinList"></selector>
        </x-input>

        <x-textarea placeholder="请输入Key" title="API Key" v-model="formInline.key" :show-counter="false" :rows="4" :cols="35" ></x-textarea>
        <x-textarea placeholder="请输入Secret" title="Secret" v-model="formInline.secret" :show-counter="false"  :rows="4" :cols="35"></x-textarea>

        <x-button type="primary" action-type="button" style="width: 50%;margin: 5px auto 10px auto" @click.native="onSubmit">提交</x-button>
      </group>
    </section>

    <div style="height: 80px;width: 100%;">

    </div>
  </section>
</template>

<script>
import vfooter from './common/vfooter.vue'
import titleBar from './common/titleBar.vue'
import { url,initHome,getAvator } from '../data/fetchData'
import { mapActions ,mapState } from 'vuex'
import {Toast, XButton, Tab, TabItem,Swiper,SwiperItem,XInput, Selector,Cell, Group, XTextarea} from 'vux'

export default {
    name: 'AssetEdit',
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
    data(){
        return  {
          formInline:{
            id:0,
            title:'',
            cost:0,
            costCoinType:'CNY',
            key:'',
            secret:''
          }
        }
    },

    computed:{
      ...mapState(["bourses","coinList"]),
    },

  beforeRouteEnter(to, from, next) {
    // react to route changes...
    // don't forget to call next()
    console.log("update ........")
    next(function (vm) {
      console.log("next1 callback")
      vm.initData();
    });
  },

  beforeRouteUpdate (to, from, next) {
      // react to route changes...
      // don't forget to call next()
      console.log("update ........")
      this.initData();
     next();
    },
    methods:{
      initData(){
        let bourse = this.$route.params.bourse;
        if (!bourse) return;

        let assetMap = this.$store.getters.assets;
        let obj = assetMap[bourse];

        if (!obj) return;
        this.formInline.id = obj.id;
        this.formInline.title = obj.title;
        this.formInline.costCoinType = obj.costCoinType;
        this.formInline.cost = obj.cost;
      },
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

        return err;
      },
      onSubmit:function () {
        let errMsg = this.check();
        if (errMsg.length > 0){
          this.$vux.toast.show({
            text: errMsg,
            type:'cancel',
            width:'15em'
          });
          return
        }

        this.$store.dispatch("updateAsset", this.formInline).then(result=>{
          this.$vux.toast.show({text:'修改成功'});

          this.$router.replace({name:'assetdetail', params:{bourse:result.bourse}});
        }).catch(e=>{
          this.$vux.toast.show({
            text: e.message ? e.message : e.error,
            type:'cancel',
            width: '15em'
          });
        });
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

  .assetEditClass {
  .vux-x-textarea{
    flex-direction: column;
  };

  .vux-tab{
    background-color: transparent;
  };
  };

</style>
