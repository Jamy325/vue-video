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






                <mt-cell>
                  <mt-button type="primary" @click="onSubmit">保存</mt-button>
                </mt-cell>
            </div>



          </mt-tab-container-item>
          <mt-tab-container-item id="second">

            <div style="width: 100%;height: 100%">
              暂未实现
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="third">
            <div style="width: 100%;height: 100%">
              暂未实现
            </div>
          </mt-tab-container-item>
        </mt-tab-container>


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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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

</style>
