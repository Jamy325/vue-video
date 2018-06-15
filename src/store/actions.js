import {
  ajax_getSymbolList,
  ajax_getBourse,
  ajax_getOrderBook,
  ajax_getSymbolPriceTicket,
  ajax_getTrades,
  ajax_getOrders,
  ajax_postUpdateAsset
} from '../data/fetchData'
import * as type  from './mutation-types.js'

export default {
	createUser ({commit},user) {
		commit('ADD_USER',user)
	},
	initVideoData ({commit},data) {
		commit('INIT_VDIEO_DATA',data)
	},
	initMeCommentData ({commit},data) {
		commit('INIT_COMMENT_DATA',data)
	},

  loadBourseData({commit}, data){
    ajax_getBourse().then(data=>{
      let a = [];
      for(let l of data.list){
        a.push({key:l.value, value:l.label});
      }

      commit(type.UPDATE_BOURSES, a);
    }).catch(e =>{
      this.$vux.toast.show({
        text: e.message ? e.message : e.error,
        type:'cancel',
        width:'15em'
      });
    });
  },
  loadSymbolList({commit}, data){
    let bourse = data.bourse;

	  return new Promise(function (resolve, reject) {
      ajax_getSymbolList(data).then(data=>{
        let sym = data.symbols || [];
        commit(type.UPDATE_SYMBOL, {bourse:bourse, list:sym})
        resolve(sym);
      }).catch(e=>{
        reject(e);
      })
    })
  },
  loadOrderBookData({commit}, data){
    let bourse = data.bourse;
    let symbol = data.symbol;
    return new Promise((resolve, reject)=>{
      ajax_getOrderBook({bourse:bourse, symbol:symbol}).then(result=>{
          let data = result.data;
          commit(type.UPDATE_ORDERBOOK, {bourse:bourse,symbol:symbol, data:data});
          resolve(data);
      }).catch(e=>{
          reject(e);
      });
    })
  },

  loadSymbolPriceTicker({commit}, data){
	  let bourse = data.bourse;
	  let symbol = data.symbol;

	  return new Promise((resolve, reject) => {
      ajax_getSymbolPriceTicket({bourse:bourse, symbol:symbol}).then(function (result) {
        let data = result.data;
        commit(type.UPDATE_SYMBOL_TICKER, {bourse:bourse, symbol:symbol, data:data});
        resolve(data);
      }).catch(function (e) {
          reject(e);
      })
    });
  },

  loadTrades({commit}, data){
    let bourse = data.bourse;
    let symbol = data.symbol;

    return new Promise((resolve, reject) => {
      ajax_getTrades({bourse:bourse, symbol:symbol}).then(function (result) {
        let data = result.data;
        commit(type.UPDATE_SYMBOL_TRADE, {bourse:bourse, symbol:symbol, data:data});
        resolve(data);
      }).catch(function (e) {
        reject(e);
      })
    });
  },

  loadOrders({commit}, data){
    let bourse = data.bourse;
    let symbol = data.symbol;

    return new Promise((resolve, reject) => {
      ajax_getOrders({bourse:bourse, symbol:symbol}).then(function (result) {
        let data = result.data;
        commit(type.UPDATE_HISTORY_DELEGATE, {bourse:bourse, symbol:symbol, data:data});
        resolve(data);
      }).catch(function (e) {
        reject(e);
      })
    });
  },
  updateAsset({commit}, data){

	  return new Promise(((resolve, reject) => {

      ajax_postUpdateAsset(data).then((result)=>{
        let asset = result.asset;
        commit(type.UPDATE_ASSET, asset);
        resolve(asset);
      }).catch(e=>{
        reject(e)
      })
    }))
  }
}
