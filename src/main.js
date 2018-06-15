// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './base/rem'
import VueLazyload from 'vue-lazyload'

import promise from 'es6-promise';
import { ajax_getUserData } from './data/fetchData'

import  { ToastPlugin } from 'vux'

// 默认参数
Vue.use(ToastPlugin, {position: 'default'})


promise.polyfill();

Vue.use(VueLazyload, {
  loading: 'http://www.wclimb.site/images/imgLoading.svg'
});


Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});


function SyncUserInfo() {
  ajax_getUserData({}).then(function (data) {
    if (data.code == 200){
      store.dispatch('createUser',{
        data: data.user
      });
    }
  }).catch(function (e) {
    router.push("/login");
  })
}

SyncUserInfo();
