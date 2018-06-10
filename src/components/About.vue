<template>
<section>
    <title-bar>
      <router-link to="/me" slot="backBtn">
        <div class="icon-back"></div>
      </router-link>
      <h1 slot="title">
        关于我们
      </h1>

    </title-bar>

    <div>
      关于我们
    </div>


</section>
</template>


<script>

import titleBar from './common/titleBar.vue';

import {mapActions,mapState} from 'vuex'
import { ajax_regist , yzmChange, checkUser,url } from '../data/fetchData.js'
import { XSwitch, Group, Cell, Datetime} from 'vux'

export default {
    name: 'About',
    components:{
      titleBar,
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
