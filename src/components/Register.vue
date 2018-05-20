<template>
    <main>
        <section class="main_wrap">
          <section>
            <router-link to="/login">
              <div class="icon-back"></div>
            </router-link>
          </section>

            <section class="user_title">
              <div class="login">注册</div>
            </section>

            <section class="user">
                <form  enctype='multipart/form-data'>
                    <div class="input">
                        <div class="input_wrap">
                            <i class="iconfont icon-name"></i>
                            <input type="text" v-model.trim="username" @keyup.enter="regist" name="username" placeholder="请输入手机号">
                        </div>
                        <div class="input_wrap">
                            <i class="iconfont icon-mima1"></i>
                            <input type="password" v-model="pwd" @keyup.enter="regist" name="pwd" placeholder="请输入密码">
                        </div>
                      <div class="input_wrap">
                        <i class="iconfont icon-mima1"></i>
                        <input type="password" v-model="rpwd" @keyup.enter="regist" name="rpwd" placeholder="再次输入密码">
                      </div>
                        <div class="input_wrap">
                            <i class="iconfont icon-yanzhengma1"></i>
                            <input type="text" v-model="invetecode" @keyup.enter="regist" name="invetecode" placeholder="邀请码(可选)">
                        </div>

                      <div class="input_wrap">
                        <i class="iconfont icon-yanzhengma1"></i>
                        <input type="text" v-model="code" @keyup.enter="regist" name="code" placeholder="验证码">
                        <img @click="changYzm" :src="url" alt="">
                      </div>
                    </div>
                    <div class="submit" @click="regist">立即注册</div>
               </form>
            </section>
        </section>
    </main>
</template>

<script>
import vfooter from './common/vfooter.vue'
import {mapActions,mapState} from 'vuex'
import { ajax_regist , yzmChange, checkUser,url } from '../data/fetchData.js'
export default {
    name: 'Register',
    components:{
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
        ...mapState([
            'userInfo',
        ]),
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
            yzmChange().then(res=>{
                this.yzmTest = res.data;
                this.url = url+'/pic'+'?v='+ (new Date).getTime()
                console.log('验证码',this.yzmTest)
            })
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
