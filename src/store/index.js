import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const state = {
	userInfo: '',
	videoData:null,
	meCommentDatas:null,
  userdata:null,
  bourses:[],
  symbolList:{},
  orderBookList:{},
  priceTicker:{},
  symbolTrade:{},
  orders:{},

  coinList: [{key: 'CNY', value: 'CNY'}, {key: 'USD', value: 'USD'}],

};

export default new Vuex.Store({
	state,
	actions,
	mutations,
  getters
})
