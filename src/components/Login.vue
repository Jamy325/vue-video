<template>
    <main>
      <section>
        <title-bar>
          <h1 slot="title">
            登录
          </h1>
          <router-link to="/register" slot="nextBtn">
            <h2 style="font-size: 1.2em;color: white">注册账号</h2>
          </router-link>
        </title-bar>

      </section>

      <group>
        <x-input placeholder="用户名" v-model="userName"  placeholder-align="left"></x-input>
      </group>

      <group>
        <x-input type="password" placeholder="密码"  v-model="password" placeholder-align="left"></x-input>
      </group>

      <group>
        <x-input  placeholder="验证码"  v-model="yzm" placeholder-align="left">
          <img slot="right-full-height" @click="changYzm" :src="url" alt="">
        </x-input>
      </group>



      <div style="margin-top: 40px">
        <x-button type="primary" action-type="button" style="width: 80%;margin: 5px auto 10px auto" @click.native="signin">提交</x-button>
      </div>
    </main>
</template>

<script>
import titleBar from './common/titleBar.vue'
import {mapActions,mapState} from 'vuex'
import { ajax_signin , yzmChange, checkUser,url } from '../data/fetchData.js'

import {Toast, XButton, Tab, TabItem,Swiper,SwiperItem,XInput, Selector,Cell, Group, XTextarea} from 'vux'

export default {
    name: 'login',
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
            userName: '',
            password: '',
            yzm: '',
            yzmTest: '',
            url: ''
        }
    },
    computed:{
        ...mapState([
            'userInfo',
        ]),
    },
    mounted () {

        this.url = url + '/pic?t='+Date.now()
     //   this.changYzm()
    },
    methods:{
        // 登录
        signin(){
            if (this.userName === '' || this.password === '') {
                this.$toast({
                    icon:'fail',
                    message:'用户名/密码不能为空'
                })
                return
            }
          ajax_signin(this.userName,this.password).then(data => {
                // 用户存在
                if (data.code == 200) {
                  this.$vux.toast.show({text:'登录成功'});

                    this.$store.dispatch('createUser',{
                        data: data.user
                    });

                 //   document.cookie = `token=${data.token};max-age=${30*24*60*60*1000}`
                    // console.log(document.cookie)
                    localStorage.setItem('user',this.userName)
                    localStorage.setItem('avator',data.avator)
                    setTimeout(()=>{
                        this.$router.push({path:'/me'})
                    },1000)
                }
            }).catch(e=>{
            this.$vux.toast.show({
              text: e.message ? e.message : e.error,
              type:'cancel',
              width: '15em'
            });
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
    font-size: 48px;
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
    position: absolute;
    top: 35%;
    width: 100%;
    transform: translateY(-55%)
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
            color: white;
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
