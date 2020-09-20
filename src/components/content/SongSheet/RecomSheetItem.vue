<template>
	<div ref='item' :key="index" class="amt animate__animated song-item " @click="toMusicList" :class="['cur'+(index%3),index<curIndex ? 'ison' : '']">
		<img class="img" @load="imgLoad" v-lazy="imagePath" />
		<div class="wd">
			<div class="wd1 amt">{{obj.name + index}}</div>
			<div class="wd2 amt">{{obj.description}}</div>
		</div>
		
		<div class="wd-hide amt">{{hideWd}}</div>
		<div class="icon-hide amt"><i class="el-icon-caret-right"></i></div>
	</div>
</template>

<script>
	import { debounce } from 'common/utils.js'
	export default{
		name:"SongSheetItem",
		props:{
			obj:{
				type:Object,
				default(){
					return {}
				}
			},
			index:{
				type:Number,
				default(){
					return -1;
				}
			},
			curIndex:{
				type:Number,
				default(){
					return 3;
				}
			}
		},
		data(){
			return {
				height:0
			}
		},
		
		mounted() {
			if(this.index === 0){
				let gh = debounce(this.getH,50);
				window.addEventListener("resize",gh,false)
			}
			
			
		},
		computed:{
			hideWd(){
				if(this.obj.hasOwnProperty('picUrl')){
					return this.obj.copywriter
				}else{
					return '播放量：' + this.obj.playCount
				}
			},
			imagePath(){
				
				if(this.obj.hasOwnProperty('picUrl')){
					
					return "//"+this.obj.picUrl.split("//")[1] + "?param=600y600";
				}else{
					return "//" + this.obj.coverImgUrl.split("//")[1] + "?param=600y600"
				}
			}
		},
		methods:{
			toMusicList(){
				
				this.$router.push('/musiclist/'+this.obj.id)
			},
			imgLoad(){
				if(this.index === 0){
					let h = this.$refs.item.offsetHeight +30;
					this.height = h;
					
					this.$emit("imgLoad",h);
				}
			},
			getH(h){
				if(!!this.$refs.item){
					this.height = this.$refs.item.offsetHeight +30;
					
					this.$emit("imgLoad",this.height);
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item-wp .song-item{
		width: 100%;
		@include list-item;
		border-radius: 10px;
		transition-duration: 1.3s;
		animation-fill-mode: forwards;
		-moz-animation-fill-mode: forwards;
	}
	.img{
		width: 100%;
	}
	.wd{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		font-size: 22px;
		padding: 30px;
		color: #fff;
		z-index: 2;
		line-height: 1.6;
		border-radius: 8px;
		background: rgba(0,0,0,0.4);
	}
	.wd1{
		margin-top: 80px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		transform: translateY(-400px);
		filter: blur(15px);
		transition-duration: 1.3s;
	}
	.wd2{
		font-size: 15px;
		padding-top: 30px;
		color: #f3eded;
		line-height: 1.6;
		z-index: 2;
		border-radius: 8px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 13;
		overflow: hidden;
		height: 342px;
		transform: scale(0);
		transition-duration: 1.2s;
	}
	.wd-hide{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		padding: 10px;
		background: rgba(0,0,0,0.4);
		color: #fff;
		font-size: $fs14;
		transform: translate(0,-50px);
	}
	.icon-hide{
		position: absolute;
		right: 26px;
		bottom: 26px;
		@include mlist-play;
		transform: scale(1.6);
	}
	.bgon .icon-hide{
		color: $navActiveColor;
	}
	.song-item:hover .wd-hide{
		transform: translate(0,0);
	}
	.song-item:hover .icon-hide{
		opacity: 1;
	}
	.cur0{
		 transform: translateX(-600px);
		 opacity: 0;
	}
	.cur1{
		transform: rotateY(-90deg);
		opacity: 0;
	}
	.cur2{
		transform: translateX(600px);
		opacity: 0;
	}
	.cur0.ison{
		transform: translateX(0px);
		opacity: 1;
		animation: rollIn; 
		animation-duration: 0.9s;
		-moz-animation-fill-mode: forwards;
	}
	.cur1.ison{
		transform: rotateY(0deg);
		opacity: 1;
		animation:jackInTheBox;
		animation-duration: 1.1s;
		-moz-animation-fill-mode: forwards;
		
	}
	.cur2.ison{
		transform: translateX(0px);
		opacity: 1;
		animation: zoomInRight;
		animation-duration: 1.2s;
		-moz-animation-fill-mode: forwards;
	}
	.ison .wd1{
		transform: translateY(0px);
		filter: blur(0px);
	}
	
	.ison .wd2{
		transform: scale(1);
	}
	.cur0.ison .wd1{
		transition-delay: 0.5s;
	}
	.cur0.ison .wd2{
		transition-delay: 1s;
	
	}
	.cur1.ison .wd1{
		transition-delay: 1s;
		animation-delay: 1s;
	}
	.cur1.ison .wd2{
		transition-delay: 1.5s;
		
	}
	.cur2.ison .wd1{
		transition-delay: 1.5s;
		animation-delay: 1.5s;
	}
	.cur2.ison .wd2{
		transition-delay: 2s;
	}
	
	@media screen and (max-width: 1800px) {
		.wd1{
			margin-top: 70px;
			
		}
		.wd2{
			-webkit-line-clamp: 8;
			height: 222px;
		}
	} 
	@media screen and (max-width: 1500px) {
		.wd1{
			margin-top: 20px;
			font-size: 20px;
		}
		.wd2{
			-webkit-line-clamp: 8;
		}
	} 
	@media screen and (max-width: 1200px) {
		.wd1{
			margin-top: 20px;
			font-size: 17px;
		}
		.wd2{
			-webkit-line-clamp: 5;
			padding-top: 20px;
			height: 140px;
		}
	} 
</style>
