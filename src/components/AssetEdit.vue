<template>
  <section>


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



      <section style="background-color: #343132; margin-top: 70px;padding-bottom: 5px">
        <el-form ref="form" :model="formInline" :label-position="'top'" label-width="80px" size="medium">
          <el-form-item>
            <el-input v-model="formInline.name" placeholder="请填写资产标题"></el-input>
          </el-form-item>

          <el-form-item>
            <el-col :span="11">
              <el-input  placeholder="请填写资产成本" v-model="formInline.cost" style="width: 100%;"></el-input>
            </el-col>
            <el-col class="line" :span="1">.</el-col>
            <el-col :span="11">
              <el-form-item>
                <el-select v-model="formInline.costCoinType" placeholder="" style="width:2rem">
                  <el-option label="CNY" value="CNY"></el-option>
                  <el-option label="USD" value="USD"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="API Key">
            <el-input  type="textarea" :rows="4" v-model="formInline.key" placeholder="请填写API Key" ></el-input>
          </el-form-item>

          <el-form-item label="Secret">
            <el-input  type="textarea" :rows="4" v-model="formInline.secret" placeholder="请填写Sercet" ></el-input>
          </el-form-item>

          <el-form-item style="align-content: center">
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>

          <div style="height: 1rem">

          </div>
        </el-form>
      </section>


  </section>
</template>

<script>
import vfooter from './common/vfooter.vue'
import titleBar from './common/titleBar.vue'
import { url,initHome,getAvator } from '../data/fetchData'
import { mapActions ,mapState } from 'vuex'
import {Input, TabPane, Table, Select, Col} from 'element-ui';

export default {
    name: 'assetdetail',
    components:{
        vfooter,
      titleBar
    },
    data(){
        return  {
          formInline:{}
        }
    },

  computed:{

  },

  beforeRouteEnter(to, from, next) {
    // react to route changes...
    // don't forget to call next()
    console.log("update ........")
    next(function (vm) {
      console.log("next callback")
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

      },
      onSubmit:function () {

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
