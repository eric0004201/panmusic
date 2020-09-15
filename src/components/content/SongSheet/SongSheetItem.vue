<template>
	<div class="song-item" @click="toMusicList">
		<img class="img" @load="imgLoad" v-lazy="imagePath" />
		<div class="wd">{{obj.name}}</div>
		<div class="wd-hide amt">{{hideWd}}</div>
		<div class="icon-hide amt"><i class="el-icon-caret-right"></i></div>
	</div>
</template>

<script>
	export default{
		name:"SongSheetItem",
		props:{
			obj:{
				type:Object,
				default(){
					return {}
				}
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
					
					return "//"+this.obj.picUrl.split("//")[1] + "?param=300y300";
				}else{
					return "//" + this.obj.coverImgUrl.split("//")[1] + "?param=300y300"
				}
			}
		},
		methods:{
			toMusicList(){
				
				this.$router.push('/musiclist/'+this.obj.id)
			},
			imgLoad(){
				
				this.$emit("imgLoad");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.song-item{
		width: 19%;
		@include list-item;
		@include mediaWidth;
	}
	.img{
		width: 100%;
	}
	.wd{
		@include mlist-tit;
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
		right: 4px;
		bottom: 26px;
		@include mlist-play
	}
	.song-item:hover .wd-hide{
		transform: translate(0,0);
	}
	.song-item:hover .icon-hide{
		opacity: 1;
	}
</style>
