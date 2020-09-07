import axios from 'axios'

//import { MessageBox } from 'element-ui';

export function request(obj){
	const instance = axios.create({
		baseURL:"https://api.mtnhao.com/",
		timeout:15000
	})
	
	instance.interceptors.request.use(obj => {
		return obj
	},err => {
		
	});
	
	instance.interceptors.response.use(res => {
		if(res.data.code === 200){
			
			//MessageBox.alert('这是一段内容', '标题名称')
		}
		return res.data
	}, err => {
		
	})
	
	return instance(obj)
	
}