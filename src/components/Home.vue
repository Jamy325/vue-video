<template>
    <section class="home">
        <vfooter></vfooter>
        <transition name="fade">
            <div class="loading" v-if="loading">
                <div class="loading_dialog">
                    <img src="./common/loading.svg" alt="">
                </div>
            </div>
        </transition>
        <div id="search">
            <router-link to="/home/search">
                <div class="search_input">
                    <i class="iconfont icon-sousuo1"></i>搜索
                </div>
            </router-link>
        </div>
        <section class="video_list">
            <div class="video_list_header">
                <h3>全部<span>({{allLength}})</span></h3>
                <router-link to="/all">更多 <i class="iconfont icon-jiantouyou"></i></router-link>
            </div>
            <ul>
                <li :key="list.id"  v-for="(list,index) in lists[3]" v-if="index < 10">
                    <router-link :to="'/video/'+list.id">
                        <div><img  v-lazy="baseUrl+list.img" alt=""></div>
                        <h3>{{list.name}}</h3>
                        <div>
                            <div class="starList" :style="{'background-position-y':-15*(10-list.star).toFixed(0)+'px'}"></div>
                            <span>{{list.star}}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </section>
        <section class="video_list">
            <div class="video_list_header">
                <h3>电影<span>({{movieLength}})</span></h3>
                <router-link to="/movie">更多 <i class="iconfont icon-jiantouyou"></i></router-link>
            </div>
            <ul>
                <li :key="list.id"  v-for="(list,index) in lists[0]"  v-if="index < 10">
                    <router-link :to="'/video/'+list.id">
                        <div class="preImg"><img v-lazy="baseUrl+list.img" alt=""></div>
                        <h3>{{list.name}}</h3>
                        <div>
                            <div class="starList" :style="{'background-position-y':-15*(10-list.star).toFixed(0)+'px'}"></div>
                            <span>{{list.star}}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </section>
        <section class="video_list">
            <div class="video_list_header">
                <h3>电视剧<span>({{tvLength}})</span></h3>
                <router-link to="/tv">更多 <i class="iconfont icon-jiantouyou"></i></router-link>
            </div>
            <ul>
                <li :key="list.id" v-for="(list,index) in lists[1]"  v-if="index < 10">
                    <router-link :to="'/video/'+list.id">
                        <div class="preImg"><img v-lazy="baseUrl+list.img" alt=""></div>
                        <h3>{{list.name}}</h3>
                        <div>
                            <div class="starList" :style="{'background-position-y':-15*(10-list.star).toFixed(0)+'px'}"></div>
                            <span>{{list.star}}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </section>
        <section class="video_list">
            <div class="video_list_header">
                <h3>综艺<span>({{zyLength}})</span></h3>
                <router-link to="/zy">更多 <i class="iconfont icon-jiantouyou"></i></router-link>
            </div>
            <ul>
                <li :key="list.id"  v-for="(list,index) in lists[2]"  v-if="index < 10">
                    <router-link :to="'/video/'+list.id">
                        <div class="preImg"><img v-lazy="baseUrl+list.img" alt=""></div>
                        <h3>{{list.name}}</h3>
                        <div>
                            <div class="starList" :style="{'background-position-y':-15*(10-list.star).toFixed(0)+'px'}"></div>
                            <span>{{list.star}}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </section>
        <transition name="router-in">
            <router-view></router-view>
        </transition>
    </section>
</template>

<script>
import vfooter from './common/vfooter.vue'
import { url,initHome,getAvator } from '../data/fetchData'
import { mapActions ,mapState } from 'vuex'
export default {
    name: 'home',
    components:{
        vfooter,
    },
    data () {
        return {
            lists: '',
            loading: true,
            baseUrl:url + '/images/',
        }
    },
    computed:{
        allLength(){
            return this.getJsonLength(this.lists[3])
        },
        movieLength(){
            return this.getJsonLength(this.lists[0])
        },
        tvLength(){
            return this.getJsonLength(this.lists[1])
        },
        zyLength(){
            return this.getJsonLength(this.lists[2])
        },
        ...mapState([
            'videoData',
        ]),
    },
    created () {

        if (this.videoData != null) {
            this.lists = this.videoData
        }else{
           this.initData()
        }
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        //'$route': 'initData'
    },
    methods:{
        initData () {
            this.loading = true;
          setTimeout(()=>{
            this.loading = false;
          },500)
            initHome().then(res =>  {

                let list = res.data
                this.lists = list
                this.$store.dispatch('initVideoData',{
                    initVideoData: list
                })
            }).catch(e => {
                this.$toast({
                    icon: 'fail',
                    message: e.message
                })
            })
        },
        getJsonLength(jsonData){
            var jsonLength = 0;
            for(var item in jsonData){
                jsonLength++;
            }
            return jsonLength;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/home';

</style>
