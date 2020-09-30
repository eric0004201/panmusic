export default{
	getLogin(state){
		return state.isLogin;
	},
	getKey(state){
		return state.key;
	},
	getKSongs(state){
		return state.key.song || [];
	},
	getKList(state){
		return state.key.list || [];
	},
	getMList(state){
		return state.mList;
	},
	getTMList(state){
		return state.tmList;
	},
	getTitle(state){
		return state.title;
	}
}