<template>
    <section class="me">

        <vfooter v-if="!showShare"></vfooter>

        <section class="me_deatil" @click="showDefaultName">
            <section class="avator">
            <template v-if=" nowUploadAvator !='' ">
                <input @click="upload" id="upload" type="file">
                <div class="avator_border">
                    <!--<img v-lazy="baseUrl+'/avator/'+ nowUploadAvator +'.png' " alt="">-->
                </div>
            </template>
            <template v-else-if="avator == ''">
                <input @click="upload" id="upload" type="file">
                <div class="avator_border">上传头像</div>
            </template>
            <template v-else>
                <input @click="upload" id="upload" type="file">
                <div class="avator_border">
                    <img v-lazy="baseUrl+'/avator/'+ avator +'.png' " alt="">
                </div>
            </template>
            <div class="name" @click.stop="editUserName">
                <template v-if="defaultName">
                    {{ userName }} <i class="iconfont icon-bianji"></i>
                </template>
                <template v-else>
                    <input type="text" v-focus v-model="userNameModel" @keyup.enter="submitEditName" >
                    <i class="iconfont icon-submit"  @click.stop="submitEditName" ></i>
                </template>
            </div>
            <div @click="logout" class="logout">
               <i class="iconfont icon-logout23"></i>
               退出
            </div>
        </section>


        <group class="blockBackground">
        <cell link="/me/AppSetting" style="background-color: transparent">
          <i class="iconfont icon-setting" slot="icon"></i>
          <span slot="title">应用设置</span></cell>
          <cell @click.native="showShare=true" :is-link="true">
            <i class="iconfont icon-share" slot="icon"></i>
            <span slot="title">分享HiToken</span>
          </cell>

          <cell link="/me/About">
            <i class="iconfont icon-about" slot="icon"></i>
            <span slot="title">关于我们</span>
            </cell>
        </group>

          <div transfer-dom>
            <popup v-model="showShare">
              <div style="padding: 5px" class="blockBackground">
                <flexbox>
                  <flexbox-item>
                    <div style="text-align: center;color: white">
                      <img src="../assets/share/wechat@2x.png" width="45px" height="45px">
                      <div>微信好友</div>
                    </div>
                  </flexbox-item>
                  <flexbox-item>
                    <div style="text-align: center;color: white">
                      <img src="../assets/share/wechat_moment@2x.png" width="45px" height="45px">
                      <div>朋友圈</div>
                    </div>
                  </flexbox-item>
                  <flexbox-item>
                    <div style="text-align: center;color: white">
                      <img src="../assets/share/qq@2x.png" width="45px" height="45px">
                      <div>QQ</div>
                    </div>
                  </flexbox-item>
                  <flexbox-item>
                    <div style="text-align: center;color: white">
                      <img src="../assets/share/weibo@2x.png" width="45px" height="45px">
                      <div>微博</div>
                    </div>
                  </flexbox-item>
                </flexbox>
                <div style="margin: 15px">
                  <x-button title="取消" @click.native="showShare=false">取消</x-button>
                </div>

              </div>

            </popup>
          </div>
    </section>
  </section>
</template>

<script>
import vfooter from './common/vfooter.vue'
import {mapState,mapActions} from 'vuex'
import { url,meComment, meLike, meDelete, uploadAvator, editNameData, getAvator} from '../data/fetchData.js'
import { TransferDom, Popup, TabItem,Swiper,SwiperItem,XInput, Selector,Cell, Group, XTextarea,Flexbox, FlexboxItem,XTable,XButton} from 'vux'


export default {
    name: 'me',
  directives: {
      TransferDom
    },
    components:{
        vfooter,
      Popup,
      TabItem,
      Swiper,
      SwiperItem,
      XInput,
      Selector,
      Cell,
      Group,
      XTextarea,
      Flexbox,
      FlexboxItem,
      XTable,
      XButton
    },
    data () {
        return {
            showShare:false,
            likeLists:'',
            comments: [],
            loading: false,
            likeLengthOne:'',
            likeLengthTwo:'',
            start:'',
            scroll:'',
            nowUploadAvator:'',
            defaultName:true,
            userNameModel:'',
            userName:'',
            baseUrl:url+ '/images/',
            avator:''
        }
    },
    computed:{
        ...mapState([
            'meCommentDatas',
        ]),


    },
    mounted () {
        this.userName = localStorage.getItem('user');
        this.initData();
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'initData',
    },
    directives: {
        focus: {
          inserted: function (el) {
            // 聚焦元素
            el.focus()
          }
        }
    },
    methods:{
        // 初始化数据
        initData(){

        },
        // 登出
        logout () {

            this.$store.dispatch("logout").then((data)=>{
              localStorage.clear();
              this.$router.push({path:'/login'});

            }).catch(e=>{
              this.$vux.toast.show({
                text: e.message ? e.message : e.error,
                type:'cancel',
                width: '15em'
              });
            });
        },

        // 上传头像
        upload(){
            var upload = document.querySelector('#upload')
            var _that = this
            upload.addEventListener('change', function() {
                if (this.files.length != 0) {
                    var file = this.files[0],
                        reader = new FileReader();
                    if (!reader) {
                        this.value = '';
                        return;
                    };
                    // if (file.size >= 1024*1024/2) {
                    //     _that.$toast({
                    //         icon:'fail',
                    //         message:'超过512Kb了哟!'
                    //     })
                    //     return
                    // }
                    reader.onload = function(e) {
                        this.value = '';
                        var image = new Image();
                        image.onload = function(){
                            var canvas = document.createElement('canvas');
                            var ctx = canvas.getContext("2d");
                            canvas.width = 100;
                            canvas.height = 100;
                            ctx.clearRect(0, 0, 100, 100);
                            ctx.drawImage(image, 0, 0, 100, 100);
                            var blob = canvas.toDataURL("image/png");
                            uploadAvator(_that.userName,blob).then(data=>{
                                _that.$toast({
                                    icon:'success',
                                    message:'上传成功'
                                })
                                localStorage.setItem('avator',data.avator);
                                _that.nowUploadAvator = data.avator;
                            }).catch(e=>{
                                _that.$toast({
                                    icon:'fail',
                                    message:e.message
                                })
                                if(e.code == 404) setTimeout(()=>{_that.$router.push({path:'/login'})},1500);localStorage.clear()
                            })
					    }
					    image.src = e.target.result
                    };
                    reader.readAsDataURL(file);
                };
            }, false);
        },
        // 修改用户名
        editUserName(){
            this.defaultName = false;
            this.userNameModel = this.userName
        },
        // 提交修改用户名操作
        submitEditName(){
            var modelData = this.userNameModel;
            if (modelData == this.userName) {
                this.$toast({
                    icon:'fail',
                    message:'请修改名称！'
                })
                this.defaultName = true;
                return
            }
            editNameData(this.userName,modelData).then(res=>{
                console.log('edit',res)
              this.$vux.toast.show({text:'成功'});
                    //document.cookie = `token=${res.token};max-age=${30*24*60*60*1000}`
                    console.log(document.cookie)
                   localStorage.setItem('user',modelData)
                   this.userName = modelData
                   this.defaultName = true;

            }).catch(e=>{
                this.$toast({
                    icon:'fail',
                    message:e.message
                })
                this.defaultName = true;
                if(e.code == 404) setTimeout(()=>{this.$router.push({path:'/login'})},1500);localStorage.clear()
            })
        },
        // 显示原来的名字，即隐藏修改用户名输入框
        showDefaultName(){
            this.defaultName = true;
        }
    }
}

</script>

<style lang="scss" scoped>
@import 'src/style/me';

</style>

