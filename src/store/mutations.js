import * as type  from './mutation-types.js'

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
	}
}
