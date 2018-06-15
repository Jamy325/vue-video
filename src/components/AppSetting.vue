<template>
  <section style="color: #1D2024">
      <title-bar>
        <router-link to="/me" slot="backBtn">
          <div class="icon-back"></div>
        </router-link>

        <h1 slot="title">
          应用设置
        </h1>

      </title-bar>

      <group>

        <x-switch title="每天勿扰设置" v-model="on" @on-change="onSwitch()"></x-switch>
        <datetime style="color: white" v-model="startTime" format="HH:mm" :minute-list="['00', '15', '30', '45']" title="从" @on-change="onChange()">

        </datetime>
        <datetime style="color: white" v-model="endTime" format="HH:mm" :minute-list="['00', '15', '30', '45']" title="到" @on-change="onChange()">

        </datetime>

      </group>

  </section>
</template>


<script>

import vfooter from './common/vfooter.vue'
import titleBar from './common/titleBar.vue'

import {mapActions,mapState} from 'vuex'
import { ajax_regist , yzmChange, checkUser,url } from '../data/fetchData.js'

import { XSwitch, Group, Cell, Datetime} from 'vux'

export default {
    name: 'AppSetting',
    components:{
      titleBar,
      vfooter,
      Cell,
      Group,
      XSwitch,
      Datetime
    },
    data () {
        return {
          on:false,
          startTime:'00:00',
          endTime:'00:00'
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
      onSwitch(){
        this.submit();
      },
      onChange(){
        if (this.on){
          this.on = false;
          this.submit();
        }
      },
      submit(){

      }
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
