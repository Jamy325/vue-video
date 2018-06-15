import axios from 'axios'
export const url = 'http://www.hitoken.io';
// export const url = 'http://localhost:3000';
let $axios = axios.create({
  baseURL: url + '/',
});
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function $fetch(method,url,data, params){
    return new Promise((reslove,reject)=>{
        $axios({
          method,
          url,
          data:data,
          params:params,
          withCredentials:true
        }).then(res=>{
            let body = res.data;
            if (body.code == 200 || body.code == 201) {
                reslove(body)
            }else{
                reject(body)
            }
        }).catch(err=>{
            reject(err)
        })

    })
}

// 首页初始化数据
export const initHome = () => $fetch('get', '/')

// 验证码
export const yzmChange = () => $fetch('get','/pic');

// 注册
export const ajax_signin = (username, password, code, smscode) => $fetch('post','/login', {username,password, code, smscode})

export const ajax_regist = (data) => $fetch('post','/login/register', data);

export  const ajax_symbolHistory = (data) => $fetch('get', '/exchange/history1Day', null, data);

export const ajax_getUserData = (data) => $fetch('get', '/users', null, null);

export const ajax_getSymbolPriceTicket = (data) => $fetch('get', '/exchange/fetchTicker', null, data);

export const ajax_postAddExchange = (data) => $fetch('post', '/users/addExchangeApi', data, null);

export const ajax_getBourse = ()=>$fetch('get', '/exchange/list');

export const ajax_getSymbolList = (data)=>$fetch('get', '/exchange/symbols', null, data);

export const ajax_postAddMarket = (data)=>$fetch('post', '/users/addMarket', data);

export const ajax_getOrderBook = (data)=>$fetch('get', '/exchange/fetchOrderBook', null, data);

export const ajax_getTrades = (data)=>$fetch('get', '/exchange/fetchTrades', null, data);

export const ajax_getOrders = (data)=>$fetch('get', '/users/fetchOrders', null, data);

export const ajax_postUpdateAsset = (data)=>$fetch('post', '/users/updateAsset', data);



export const ajax_postCreateMarketBuyOrder = (data)=>$fetch('post', '/users/createMarketBuyOrder ', data);
export const ajax_postCreateMarketSellOrder = (data)=>$fetch('post', '/users/createMarketSellOrder ', data);
export const ajax_postCreateLimitBuyOrder = (data)=>$fetch('post', '/users/createLimitBuyOrder', data);
export const ajax_postCreateLimitSellOrder = (data)=>$fetch('post', '/users/createLimitSellOrder', data);

export const ajax_getKline = (data)=>$fetch('get', '/exchange/fetch1DayOHLCV', null, data);

// 个人评论
export const meComment = (userName) => $fetch('post', 'getUserComment', {userName})


// 获取用户喜欢不喜欢数据
export const meLike = ( userName ) => $fetch('post','getUserLikeData',{userName})

// 删除评论---
export const meDelete = (commentId, userName) => $fetch('post','deleteComment',{userName,commentId})


// 上传头像----
export const uploadAvator = ( userName , avator ) => $fetch('post','uploadAvator',{avator,userName})

// 获取头像
export const getAvator = (userName) => $fetch('post', 'getUserAvator' ,{userName})

// 编辑用户名
export const editNameData = ( oldName , newName) =>  $fetch('post','editUserName', {newName,userName: oldName})

// 搜索
export const search = ( val ) =>  $fetch('post','search', {val})

// 获取单个video数据
export const singleVideoData = (videoId) => $fetch('post','getVideoById', {videoId})

// 获取评论
export const getVideoComment = (videoId) => $fetch('post','getVideoComment', {videoId})


// 初始化单个video的like信息（判断用户当前的选项）
export const getInitVideoLikeData = ( videoId , userName ) =>$fetch('post','getUserSingleLike',{userName,videoId})

// 提交用户选择like数据
export const postVideoLikeData = (videoId, like, userName, videoName, videoImg, star) => $fetch('post', 'postUserLike', {like,userName,videoName,videoImg, star,videoId})

// 发表评论
export const reportComment = (videoId, userName, content, videoName, avator) => $fetch('post', 'postComment', {videoId,userName,content, videoName,avator})


