import { request } from './request.js'

export function getBanner(){
	return request({
		url:'/banner',
		params:{
			type:0
		}
	})
}

export function getSongs(){
	return request({
		url:'/personalized',
		params:{
			limit:10
		}
	})
}

export function getNew(){
	return request({
		url:'/personalized/newsong'
		
	})
}

export function getMV(){
	return request({
		url:'/personalized/mv'
		
	})
}


export function getSearch(key){
	return request({
		url:'/search/suggest',
		params:{
			keywords:key
		}
		
	})
}

export function getListHead(tag){
	return request({
		url:'/top/playlist/highquality',
		params:{
			limit:1,
			cat:tag
		}
		
		
	})
}

export function getListCon(limit, offset, cat){
	return request({
		url:'/top/playlist',
		params:{
			limit:limit,
			offset:offset,
			cat:cat
		}
		
		
	})
}

export function getResult(limit,offset,keywords,type){
	return request({
		url:'/search',
		params:{
			limit:limit,
			offset:offset,
			keywords:keywords,
			type:type
		}
		
	})
}

export function getMusicComment(id,pageSize,offset){
	return request({
		url:'/comment/music',
		params:{
			id:id,
			pageSize:pageSize,
			offset:offset
			
		}
		
	})
}
