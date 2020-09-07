import { request } from './request.js'

export function getMvList(limit,offset,area,order,type){
	return request({
		url:'/mv/all',
		params:{
			limit:limit,
			offset:offset,
			area:area,
			order:order,
			type:type
		}
	})
}

export function getVideo(id){
	return request({
		url:'/mv/url',
		params:{
			id:id
			
		}
	})
}

export function getVideoInfo(id){
	return request({
		url:'/mv/detail',
		params:{
			mvid:id
			
		}
	})
}


export function getVideoCom(id,pageSize,offset){
	return request({
		url:'/comment/mv',
		params:{
			id:id,
			pageSize:pageSize,
			offset:offset
		}
	})
}


export function getVideoSimi(id){
	return request({
		url:'/simi/mv',
		params:{
			mvid:id
			
		}
	})
}