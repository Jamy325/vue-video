<template>
    <section class="footer">
        <router-link to="/asset">
            <i class="iconfont icon-asset"></i>
            <span>资产统计</span>
        </router-link>

      <router-link to="/market">
        <i class="iconfont icon-market"></i>
        <span>市场交易</span>
      </router-link>

      <router-link to="/yujing">
        <i class="iconfont icon-yujing"></i>
        <span>预警提醒</span>
      </router-link>

      <router-link to="/me">
          <i class="iconfont icon-me"></i>
          <span>个人中心</span>
      </router-link>
    </section>
</template>

<script>

export default {
    name: 'vfooter',
    data () {
        return {
        msg: ''
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../style/define.scss";

    .footer{
        position: fixed;
        bottom: 0;
        left: 0 ;
        width: 100%;
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        display: -o-flex;
        display: flex;
        justify-content: center;
        background: $blockBackgroundColor;
        z-index: 9999;

        a{
            flex:1;
            justify-content: center;
            display:flex;
            flex-direction: column;
            align-items: center;
            padding:0.05rem 0;
            &:active{
            background: rgba(0,0,0,0.1)
        }
        span{
            color: #ffffff;
        }
    }
    .icon-dianying,.icon-my1{
        font-size: 28px;
        color: #ffffff;
    }
    .router-link-exact-active i,.router-link-exact-active span{
        color: #4ebf60 !important
    }
  }

</style>
