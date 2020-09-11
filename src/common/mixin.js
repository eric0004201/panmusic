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
				let sc =  JSON.parse(localStorage.getItem(type));
				return sc.length
			}
			
		}
	}
}

export const collectSong = {
	methods:{
		collectSong(type = 'collectList'){
			if(localStorage.getItem(type) !== null){
				let sc =  JSON.parse(localStorage.getItem(type));
				return sc;
			}
			
		}
	}
}

