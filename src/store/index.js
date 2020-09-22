import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		mList:[],
		tmList:[],
		key:'',
		title:''
  },
	getters,
  mutations: {
		addToKey(state,payload){
			state.key = payload;
		},
		setTitle(state,payload){
			state.title = payload;
		},
		addMusic(state,payload){
			let old = state.mList.find(item=>{
				return item.id === payload.id;
			})
		
			if(!old){
				state.mList.unshift(payload);
			}
			
		},
		addMusicList(state,payload){
			state.mList=[];
			state.tmList = payload;
			state.mList.push(...state.tmList)
			
		},
		removeMusic(state,id){
			let index = state.mList.findIndex(item=>{
				return item.id === id;
			})
			state.mList.splice(index,1)
		}
  },
  actions: {
		
  },
  modules: {
  }
})
