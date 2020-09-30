export const songInfo = {
	computed:{
		mperson(){
			if(this.item.hasOwnProperty('artists')){
				let arr = []
				for(let i of this.item.artists) {
					arr.push(i.name)
				}
				return arr.join("/")
				
			}else{
				let arr2 = []
				for(let i of this.item.ar) {
					arr2.push(i.name)
				}
				return arr2.join("/")
				
			}
		}
		
	
	}
}

export const artName = {
	computed:{
		sname:function(){
			return function(item){
				let arr = []
				for(let i of item) {
					arr.push(i.name)
				}
				return arr.join("/")
			}
		}
	}
}

export const imgSrc = {
	filters:{
		imageUrl(src){
			return "//"+src.split("//")[1];
		}
	}
}

export const collectSongLength = {
	methods:{
		collectSongLength(type = 'collectList'){
			if(localStorage.getItem(type) !== null){
				let sc =  JSON.parse(localStorage.getItem(type)) || [];
				return sc.length;
			}else{
				return 0;
			}
			
		}
	}
}

export const collectSong = {
	methods:{
		collectSong(type = 'collectList'){
			if(localStorage.getItem(type) !== null){
				let sc =  JSON.parse(localStorage.getItem(type)) || [];
				
				return sc;
			}else{
				return []
			}
			
		}
	}
}
import { setMySheet, getMySheet, removeMySheet } from 'common/utils.js'
import { setYun } from 'common/login.js'
export const plusSt = {
	methods:{
		plusSheet(){
			
			if(getMySheet().length>=5) {
				
				return
			};
			this.$prompt('', '请输入歌单名字', {
				inputPattern:/^.{1,10}$/,
				inputErrorMessage: '名字长度只能在1-10位',
				confirmButtonText: '确定'
			}).then(({ value }) => {
				setMySheet(value).then(() => {
					this.sheetShow = false;
					this.$message({
						message: '添加成功',
						type: 'success'
					});
					setYun()
				}).catch(() => {
					this.$alert("歌单名字已存在！").catch(() =>{})
				});
				this.getSheet = getMySheet();
			}).catch(() =>{
				
			});
		}
	}
}
