
export default {
    totalStatistics(state){
      let userdata = state.userdata;
      if (!userdata) return {};

      let assets = userdata.assets || [];

      let totalCNY = 0;
      let allCost = 0;
      let createTime = Date.now();

      let ts = {};
      for(let e of assets){
        let balance = e.balance || [];
        allCost += (e.cost || 0);
        if (createTime > e.createTime) createTime = e.createTime;

        for(let b of balance){
          let s = b.symbol;
          if (!ts[s]) {
            ts[s] = b;
          }else{
            ts[s].total += b.total;
            ts[s].totalCNY += b.totalCNY;
          }

          totalCNY += b.totalCNY;
        }
      }

      let changePercent = (totalCNY - allCost / allCost);
      let earning = totalCNY - allCost;
      let totalDay = Math.ceil((Date.now() - createTime) / (3600*24*1000));
      return {totalCNY,changePercent, earning, totalDay};
    },

  symbolStatistics(state){
    let userdata = state.userdata;
    if (!userdata) return [];

    let assets = userdata.assets || [];
    let totalCNY = 0;
    let allCost = 0;
    let createTime = Date.now();

    let ts = {};
    for(let e of assets){
      let balance = e.balance || [];
      allCost += (e.cost || 0);
      if (createTime > e.createTime) createTime = e.createTime;

      for(let b of balance){
        let s = b.symbol;
        if (!ts[s]) {
          ts[s] = b;
        }else{
          ts[s].total += b.total;
          ts[s].totalCNY += b.totalCNY;
        }

        totalCNY += b.totalCNY;
      }
    }

    let r = {};
    for(let e in ts){
      r[e] = {
        name:e,
        percent:ts[e].totalCNY / totalCNY,
        cny: ts[e].totalCNY || 0,
        addValue: ts[e].totalCNY/((ts[e].percentChange24h) || 0 + 1),
        addPercent: ts[e].percentChange24h || 0
      };
    }

    let totalSymbols = Object.values(r).sort(function (a, b) {
      return  b.percent - a.percent;
    });

    return totalSymbols;
  },

  bourseStatistics(state){
    let userdata = state.userdata;
    if (!userdata) return {};

    let assets = userdata.assets || [];
    let bourses = {};
    for(let e of assets){

      let balance = e.balance || [];
      let totalCNY = 0;

      let valueMax = {value:0, ref:{}};
      let addmax = {value:-1000, ref:{}};
      let balanceData = [];
      for(let b of balance){
        totalCNY += b.totalCNY;

        if (valueMax.value < b.totalCNY) {
          valueMax.value = b.totalCNY;
          valueMax.ref = b;
        }

        if (addmax.value < b.percentChange24h) {
          addmax.value = b.percentChange24h;
          addmax.ref = b;
        }
        balanceData.push({symbol:b.symbol, total:b.total, totalCNY: b.totalCNY})
      }

      let earn = totalCNY - e.cost;
      let createTime = e.createTime || Date.now();

      let tb = [];
      for(let b of balanceData){
        tb.push({name:b.symbol,  percent: b.totalCNY / totalCNY, total:b.total, totalCNY: b.totalCNY});
      }

      tb.sort(function (a, b) {
        return b.percent - a.percent;
      });

      bourses[e.bourse] = {
        bourse:e.bourse,
        title:e.title,
        cost:e.cost,
        costCoinType:e.costCoinType,
        earnings: earn,
        addPercent: earn / e.cost,
        total: totalCNY,
        valueFirst:{symbol:valueMax.ref.symbol || "无", value: valueMax.value || 0},
        addFirst : {symbol:addmax.ref.symbol || "无", value: addmax.value || 0},
        balance : balanceData,
        dateCount : Math.ceil((Date.now() - createTime) / (24*3600*1000)),
        totalBalance: tb
      };
    }

    return bourses;
  },
  assets(state){
    let userdata = state.userdata;
    if (!userdata) return {};

    let map = {};
    let assets = userdata.assets || [];
    assets.forEach(e=>{ map[e.bourse] = e; })
    return map;
  }
}
