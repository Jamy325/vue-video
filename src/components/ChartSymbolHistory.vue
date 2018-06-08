<template>
  <div>
    <v-chart :data="data" :height=150 background-color="#252a31">
      <v-scale x :tick-count="5" type="timeCat" />
      <v-line shape="smooth" :colors="gradient"/>
      <v-guide type="tag" :options="tag" />
      <v-guide type="line" :options="guideLine" />
      <v-area shape="smooth" :colors="gradient"/>
      <v-axis :x=true :disabled=true ></v-axis>
      <v-axis :y=true :disabled=true ></v-axis>
      <v-tooltip :disabled=true></v-tooltip>
    </v-chart>
  </div>
</template>

<script>
import vfooter from './common/vfooter.vue'
import titleBar from './common/titleBar.vue'
import { url,initHome,getAvator } from '../data/fetchData'
import { mapActions ,mapState } from 'vuex'
import { ajax_symbolHistory} from '../data/fetchData.js'
import { VChart, VLine, VArea, VBar, VPie, VPoint, VScale, VAxis, VGuide, VTooltip, VLegend } from 'vux'

export default {
    name: 'Asset',
    components:{
      vfooter,
      titleBar,
      VChart,
      VLine,
      VArea,
      VBar,
      VPie,
      VPoint,
      VScale,
      VAxis,
      VGuide,
      VTooltip,
      VLegend
    },

  props:{
    symbol:{
        type: String,
        default:'btc'
    }
  },

  data () {
    return {
      tooltip:{
        showCrosshairs: false,
        disabled:true
      },
      gradient: [
        [0, '#F2C587'],
        [0.5, '#ED7973'],
        [1, '#8659AF']
      ],
      guideLine:{
        withPoint:false,
        top:false
      },
      tag: {
        position: [0,0],
        direct: 'tl',
        offsetY: -5,
        background: {
          fill: '#1D2024',
          padding: [ 1, 1 ], // tag 内边距，使用同 css 盒模型的 padding
          radius: 2, // tag 圆角
        },
        pointStyle: {
          fill: '#8659AF'
        }
      },
      data: [
        [2000, 27.2],
      ]
    }
  },
    created () {
      let self = this;
      setTimeout(function () {
        ajax_symbolHistory({symbol: (self.symbol+"").toUpperCase(), t:Date.now()}).then(result => {
          // 用户存在
          //console.log("history data:", data);
          if (result.code == 200){
            let d = result.data.price_usd || [];
            if (d.length > 0) self.data = d;
          }
        }).catch(e=>{

        })
      }, 1000);
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        //'$route': 'initData'
    },
    methods:{

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
