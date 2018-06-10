import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/Search'
import Home from '@/components/Home'
import More from '@/components/More'
import Me from '@/components/Me'
import Login from '@/components/Login'
import Detail from '@/components/Detail'
import Register from '@/components/Register'
import AppSetting from '@/components/AppSetting'
import Asset from '@/components/Asset'
import AssetList from '@/components/AssetList'
import AssetAdd from '@/components/AssetAdd'
import AssetDetail from '@/components/AssetDetail'
import AssetEdit from '@/components/AssetEdit'
import SymbolDetail from '@/components/SymbolDetail'
import Market from '@/components/Market'
import OrderBook from '@/components/OrderBook'
import SellBuy from '@/components/SellBuy'
import HistoryDelegate from "@/components/HistoryDelegate"

import ChooseBourse from "@/components/ChooseBourse"
import ChooseSymbol from "@/components/ChooseSymbol"
import About from "@/components/About"


// const Home = r => require.ensure([], () => r(require('../components/Home')), 'Home')
// const More = r => require.ensure([], () => r(require('../components/More')), 'More')
// const Me = r => require.ensure([], () => r(require('../components/Me')), 'Me')
// const Login = r => require.ensure([], () => r(require('../components/Login')), 'Login')
// const Search = r => require.ensure([], () => r(require('../components/Search')), 'Search')
// const Detail = r => require.ensure([], () => r(require('../components/Detail')), 'Detail')

Vue.use(Router)

export default new Router({
	mode:'history',
    routes: [
        {
      	    path:'*',
      	    redirect:'/'
        },
        {
            path: '/',
            name:'home',
            component: Asset,
            meta: {
          		keepAlive: true // 需要被缓存
        	}
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
      {
        path: '/register',
        name: 'resister',
        component: Register
      },
        {
            path: '/me',
            name: 'me',
            component: Me,
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
      {
        path: '/asset',
        name: 'asset',
        component: Asset,
      },
      {
        path: '/market',
        name: 'market',
        component: Market,
      },
      {
        path: '/yujing',
        name: 'yujing',
        component: Me,
      },
      {
        name:'AppSetting',
        path: '/me/AppSetting',
        component: AppSetting
      },
      {
        path: '/me/about',
        name: 'About',
        component: About,
      },
      {
        path: '/assetlist',
        name: 'assetlist',
        component: AssetList,
      },
      {
        path: '/assetadd',
        name: 'assetadd',
        component: AssetAdd,
      },
      {
        path: '/assetdetail/:bourse',
        name: 'assetdetail',
        component: AssetDetail,
      },
      {
        path: '/assetedit',
        name: 'assetedit',
        component: AssetEdit,
      },
      {
        path: '/symboldetail/:symbol',
        name: 'symboldetail',
        component: SymbolDetail,
      },
      {
        path: '/OrderBook/:bourse/:symbol',
        name: 'orderbook',
        component: OrderBook,
      },
      {
        path: '/SellBuy/:bourse/:symbol',
        name: 'SellBuy',
        component: SellBuy,
      },
      {
        path: '/HistoryDelegate/:bourse/:symbol',
        name: 'HistoryDelegate',
        component: HistoryDelegate,
      },
      {
        path: '/ChooseBourse',
        name: 'ChooseBourse',
        component: ChooseBourse,
      },
      {
        path: '/ChooseSymbol/:bourse',
        name: 'ChooseSymbol',
        component: ChooseSymbol,
      },

    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
