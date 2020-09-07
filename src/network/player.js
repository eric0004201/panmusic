
import { request } from './request.js'

export function getPlayInfo(id){
	return request({
		url:'/album',
		params:{
			id:id
		}
		
	})
}

export function getListInfo(id){
	return request({
		url:'/playlist/detail',
		params:{
			id:id
		}
	})
}

export function getListItem(ids){
	
	return request({
		url:'/song/detail',
		params:{
			ids:ids
		}
	})
}

export function getComments(id,size,offset){
	
	return request({
		url:'/comment/playlist',
		params:{
			id:id,
			pageSize:size,
			offset:offset
		}
	})
}

export function getNewSongs(type){
	
	return request({
		url:'/top/song',
		params:{
			type:type
			
		}
	})
}

export function getLyric(id){
	return request({
		url:'/lyric',
		params:{
			id:id
		}
	})
}