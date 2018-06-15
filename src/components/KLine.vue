<template>
  <div>
    <canvas height="260" class="noselect" ref="chart"></canvas>
  </div>
</template>

<script>
import { VChart, VLine, VArea, VBar, VPie, VPoint, VScale, VAxis, VGuide, VTooltip, VLegend } from 'vux'
import F2 from '@antv/f2'

export default {
    name: 'ChartSymbolHistory',
    components:{
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
    data: {
      type: Array
    },
  },

  data () {
    return {
      kLineData:[]
    }
  },
    created () {

    },
  async mounted () {
    await this.$nextTick();
    this.render();
    window.addEventListener('resize', this.render)
  },

    watch: {
        // 如果路由有变化，会再次执行该方法
        //'$route': 'initData'
      data () {
        this.changeData(this.data)
      }
    },
    methods:{
      changeData (data) {
        this.chart && this.chart.changeData(data)
      },
      render () {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const chart = new F2.Chart({
          el:this.$refs.chart,
          width: this.width || windowWidth,
          height: this.height ? this.height : (windowWidth > windowHeight ? (windowHeight - 54) : windowWidth * 0.707),
          pixelRatio: this.$devicePixelRatio || window.devicePixelRatio
        });

        chart.axis('time', {
          label: function label(text, index, total) {
            var cfg = {
              textAlign: 'center'
            };
            // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
            if (index === 0) {
              cfg.textAlign = 'start';
            }
            if (index > 0 && index === total - 1) {
              cfg.textAlign = 'end';
            }
            return cfg;
          }
        });

        chart.source(this.kLineData, {
          range: {
            tickCount: 5
          },
          time: {
            type:'timeCat',
            tickCount: 3
          }
        });

        chart.legend(false);

        chart.tooltip(false);
        chart.schema().position('time*range').color('trend', function(trend) {
          return ['#FC674D', '#fff'][trend];
        }).shape('candle').style('trend', {
          stroke: function stroke(val) {
            if (val === 1) {
              return '#9AC2AB';
            }
          }
        });

        chart.render();

        this.chart = chart
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">
  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
  }
</style>
