<template>
  <div style="margin: 5px auto 5px auto">
    <canvas class="noselect" ref="chart"></canvas>
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
      orderbook: {
        type: Object
      },
    },

    data () {
      return {
        marketDepthData:[]
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
      orderbook () {
        this.changeData(this.orderbook)
      }
    },
    methods:{
      changeData (data) {
        this.dataProcess(data);
        this.chart.changeData(this.marketDepthData);
      },

      dataProcess(data){
        this.marketDepthData = [];
        this.processData(data.bids, "bids", true);
        this.processData(data.asks, "asks", false);
      },
      processData (list, type, desc) {
        // Convert to data points
        for (let i = 0; i < list.length; i++) {
          list[i] = {
            value: Number(list[i][0]),
            volume: Number(list[i][1]),
          }
        }

        // Sort list just in case
        list.sort(function (a, b) {
          return a.value - b.value
        });

        // Calculate cummulative volume
        if (desc) {
          for (let i = list.length - 1; i >= 0; i--) {
            if (i < (list.length - 1)) {
              list[i].totalvolume = list[i + 1].totalvolume + list[i].volume;
            }
            else {
              list[i].totalvolume = list[i].volume;
            }

            let dp = {};
            dp["value"] = list[i].value;
            dp[type + "volume"] = list[i].volume;
            dp[type + "totalvolume"] = list[i].totalvolume;
            this.marketDepthData.unshift(dp);
          }
        }
        else {
          for (let i = 0; i < list.length; i++) {
            if (i > 0) {
              list[i].totalvolume = list[i - 1].totalvolume + list[i].volume;
            }
            else {
              list[i].totalvolume = list[i].volume;
            }
            let dp = {};
            dp["value"] = list[i].value;
            dp[type + "volume"] = list[i].volume;
            dp[type + "totalvolume"] = list[i].totalvolume;
            this.marketDepthData.push(dp);
          }
        }
      },
      render () {
        this.dataProcess(this.orderbook);

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const chart = new F2.Chart({
          el:this.$refs.chart,
          width: windowWidth - 50,
          height: 260,//this.height ? this.height : (windowWidth > windowHeight ? (windowHeight - 54) : windowWidth * 0.707),
          pixelRatio: this.$devicePixelRatio || window.devicePixelRatio
        });

        let defs = {
          value: {
            type:'linear',
            tickCount: 4,
            nice:false
          },
          bidstotalvolume: {
            tickCount: 4,
            type:'linear',
            nice:false
          },
          askstotalvolume: {
            tickCount: 4,
            type:'linear',
            nice:false
          },
        };

        let pd = this.marketDepthData;
        if (pd.length == 0) pd = [{value:0, bidstotalvolume:0, askstotalvolume:0}];

        chart.source(pd, defs);

        chart.legend(false);
        chart.tooltip(false);

        chart.line().position('value*bidstotalvolume').shape('line').color('value','green');
        chart.area().position('value*bidstotalvolume').shape('smooth').color('value','#00ff00-#ffffff');

        setTimeout(function () {
          chart.line().position('value*askstotalvolume').shape('line').color('red');
          chart.area().position('value*askstotalvolume').shape('smooth').color('value','#ff0000-#ffffff');
        }, 10);

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
