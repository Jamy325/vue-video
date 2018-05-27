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


      <section class="assetlist" style="margin-top: 60px;padding-bottom: 5px">
        <el-tabs v-model="activeName"  @tab-click="handleClick">
          <el-tab-pane label="交易所API" name="first">
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

              <el-form-item>
                <el-select v-model="formInline.bourse" placeholder="请选择交易所" style="width: 100%">
                  <el-option label="币安" value="CNY"></el-option>
                  <el-option label="火币" value="USD"></el-option>
                </el-select>
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

          </el-tab-pane>

          <el-tab-pane label="钱包地址" name="second">敬请期待</el-tab-pane>
          <el-tab-pane label="手工输入" name="third">敬请期待</el-tab-pane>
        </el-tabs>

      </section>
  </section>
</template>

<script>
import vfooter from './common/vfooter.vue'
import titleBar from './common/titleBar.vue'

import {Input, TabPane, Table, Select, Col} from 'element-ui';


import { url,initHome,getAvator } from '../data/fetchData'
import { mapActions ,mapState } from 'vuex'

export default {
    name: 'Asset',
    components:{
        vfooter,
      titleBar,
      Input,
      TabPane,
      Table,
      Select,
      Col
    },
    data () {
        return {
          formInline:{
            cost:100,
            bourse:'',
            costCoinType:'',
            key:'',
            secret:''
          },
          activeName2:'first',
          coinTypes:[{
            value: '选项1',
            label: '黄金糕'
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

      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .assetlist{
    .el-input__inner  {
      border: none;
      border-bottom: 1px solid #393939;
      background-color: transparent;
    }

    .el-textarea__inner{
      border: 1px solid #393939;
      background-color: transparent;
    }
  }

</style>
