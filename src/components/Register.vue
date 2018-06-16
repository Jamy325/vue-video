<template>
    <main>
      <section>
        <title-bar>
          <router-link to="/login" slot="backBtn">
            <div class="icon-back"></div>
          </router-link>
          <h1 slot="title">
            注册
          </h1>
        </title-bar>
      </section>

      <section>
        <group>
          <x-input placeholder="请输入手机号" v-model="username"  placeholder-align="left"></x-input>
        </group>
        <group>
          <x-input placeholder="请输入密码" type="password" v-model="pwd"  placeholder-align="left"></x-input>
        </group>
        <group>
          <x-input placeholder="再次输入密码" type="password" v-model="rpwd"  placeholder-align="left"></x-input>
        </group>

        <group>
          <x-input placeholder="邀请码(可选)" v-model="invetecode"  placeholder-align="left"></x-input>
        </group>

        <group>
          <x-input  placeholder="验证码"  v-model="code" placeholder-align="left">
            <img slot="right-full-height" @click="changYzm" :src="url" alt="">
          </x-input>
        </group>

        <div style="margin-top: 40px">
          <x-button type="primary" action-type="button" style="width: 80%;margin: 5px auto 10px auto" @click.native="regist">提交</x-button>
        </div>
      </section>
    </main>
</template>

<script>
  import titleBar from './common/titleBar.vue'
import {mapActions,mapState} from 'vuex'
import { ajax_regist , yzmChange,url } from '../data/fetchData.js'
  import {Toast, XButton, Tab, TabItem,Swiper,SwiperItem,XInput, Selector,Cell, Group, XTextarea} from 'vux'

  export default {
    name: 'Register',
    components:{
      titleBar,
      Toast,
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      XInput,
      Selector,
      Cell,
      Group,
      XButton,
      XTextarea
    },
    data () {
        return {
            lists: '',
            loading: false,
            username: '',
            pwd: '',
            rpwd: '',
            invetecode: '',
            code:'',
            url: ''
        }
    },
    computed:{
    },
    mounted () {

        this.url = url + '/pic?t='+Date.now()
        this.changYzm()
    },
    methods:{
        // 注册
      regist(){
            var error = '';
            do{
                if (this.userName == "") error = "手机号不能为空";
                if (this.pwd == "") error = "密码不能为空";
                if (this.pwd != this.rpwd) error = "密码不匹配";

            }while(0);

            if (error !=""){
              this.$toast({
                icon:'fail',
                message:'用户名/密码不能为空'
              })
              return
            }

        ajax_regist({username:this.username, pwd:this.pwd, rpwd:this.pwd, code:this.code, initcode:this.initcode}).then(data => {
                // 用户存在
                if (data.code == 200) {
                    this.$toast({
                        icon:'success',
                        message:'注册成功'
                    })

                    setTimeout(()=>{
                        this.$router.push({path:'/login'})
                    },1000)
                }
            }).catch(e=>{
                this.$toast({
                    icon:'fail',
                    message: e.error
                })
            })
        },
        // 验证码切换
        changYzm () {
            this.url = url+'/pic'+'?v='+ (new Date).getTime()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .login{
    font-family: '宋体';
    font-size: 30px;
    color: #1ABC9C;
    letter-spacing: 0;
    margin-left: 10px ;
  }

  .register{
    margin-right: 10px;
    opacity: 0.8;
    font-family: '新宋体';
    font-size: 30px;
    color: #1ABC9C;
    letter-spacing: 0;
  }

.main_wrap{
    border: 1px solid #ace;
}
.user_title{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.user{
    .input_wrap{
        position: relative;
        margin-top: 0.5rem;
        i{
            font-size: 30px;
            color: #1ABC9C;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%)
        }
        input{
            border:none;
            width: 100%;
            padding:0.25rem 0;
            border-top:1px solid  #1ABC9C;
            border-bottom:1px solid  #1ABC9C;
            font-size: 16px;
            padding-left: 0.7rem;
            background: transparent;
        }
        img{
            position: absolute;
            right: 0;
            top:50%;
            transform: translateY(-50%);
            height: 90%;
        }
        p{
            position: absolute;
            top: 0;
            right: 0;
            color: #ec5051;
        }
    }
    .submit{
        width: 70%;
        background: #1ABC9C;
        padding:0.2rem 0.3rem;
        border-radius:10px;
        text-align: center;
        font-size: 18px;
        color: #fff;
        margin:0.5rem auto;
    }
}
</style>
