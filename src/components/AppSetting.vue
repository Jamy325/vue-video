<template>
<section>
    <title-bar>
      <router-link to="/me" slot="backBtn">
        <div class="icon-back"></div>
      </router-link>
      <h1 slot="title">
        应用设置
      </h1>
      <h1 slot="nextBtn">
      </h1>
    </title-bar>

    <section class="grid">
      <div>每天预警勿扰设置</div>
      <el-switch
      v-model="on">
    </el-switch>
    </section>

    <section class="grid">
     <div>从</div>
      <el-time-select
      v-model="startTime">
      </el-time-select>
    </section>

    <section class="grid">
      <div>到</div>
      <el-time-select
        v-model="endTime">
      </el-time-select>
    </section>

</section>
</template>


<script>

import titleBar from './common/titleBar.vue';
import {Switch} from 'element-ui';


import {mapActions,mapState} from 'vuex'
import { ajax_regist , yzmChange, checkUser,url } from '../data/fetchData.js'
import TitleBar from "./common/titleBar";

export default {
    name: 'AppSetting',
    components:{
      TitleBar,
      Switch
    },
    data () {
        return {
          on:false,
          startTime:'',
          endTime:''
        }
    },
    computed:{
        ...mapState([
            'userInfo',
        ]),
    },
    mounted () {
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>
  .grid {
    font-size: 12px;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: black;
    border-bottom: 1px solid grey;
  }

</style>
