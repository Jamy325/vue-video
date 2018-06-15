import * as type  from './mutation-types.js'
import Vue from 'vue'
export default {
	[type.ADD_USER](state,user){
    state.userInfo = user.data.username;
    state.userdata = user.data;
	},

	[type.INIT_VDIEO_DATA](state,data){
		state.videoData = data['initVideoData']
	},

	[type.INIT_COMMENT_DATA](state,data){
		state.meCommentDatas = {...state.meCommentDatas,...data}
	},

	[type.UPDATE_BOURSES](state, data){
	  state.bourses = data;
  },

  [type.UPDATE_SYMBOL](state, data){

	  Vue.set(state.symbolList, data.bourse, data.list);
   // state.symbolList[data.bourse] = data.list;
  },

  [type.UPDATE_ORDERBOOK](state, data){
    let orderBookList = state.orderBookList;
    let bourse = data.bourse;
    let symbol = data.symbol;
    if (!orderBookList[bourse]) Vue.set(orderBookList, bourse, {});
    let symbolList = orderBookList[bourse];

    Vue.set(symbolList, symbol, data.data)
  },

  [type.UPDATE_SYMBOL_TICKER](state, data){
    let priceTicker = state.priceTicker;
    let bourse = data.bourse;
    let symbol = data.symbol;
    if (!priceTicker[bourse]) Vue.set(priceTicker, bourse, {});
    let symbolList = priceTicker[bourse];

    Vue.set(symbolList, symbol, data.data)
  },

  [type.UPDATE_SYMBOL_TRADE](state, data){
    let symbolTrade = state.symbolTrade;
    let bourse = data.bourse;
    let symbol = data.symbol;
    if (!symbolTrade[bourse]) Vue.set(symbolTrade, bourse, {});
    let symbolList = symbolTrade[bourse];

    Vue.set(symbolList, symbol, data.data)
  },

  [type.UPDATE_HISTORY_DELEGATE](state,data){
    let orders = state.orders;
    let bourse = data.bourse;
    let symbol = data.symbol;
    if (!orders[bourse]) Vue.set(orders, bourse, {});
    let symbolList = orders[bourse];

    Vue.set(symbolList, symbol, data.data)
  },

  [type.UPDATE_ASSET](state, data){
    let id = data.id;
    let userdata = state.userdata;
    let assets = userdata.assets || [];
    debugger
    for(let i = 0; i < assets.length; ++i){
      let a = assets[i];
      if (a.id == id){
        Vue.set(assets, i, data);
        return;
      }
    }

    userdata.assets = assets;
    assets.push(data);
  }
}
