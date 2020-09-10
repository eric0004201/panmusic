<template>
	<div class="mv-item" @click="goMV">
		<img class="img" :src="imagePath" />
		<div class="paly-num"><i class="el-icon-caret-right"></i>{{obj.playCount}}</div>
		<div class="wd">{{obj.name}}</div>
		<div class="name">{{obj.artistName}}</div>
		<div class="icon-hide amt"><i class="el-icon-caret-right"></i></div>
	</div>
</template>

<script>
	export default{
		name:"MvListItem",
		props:{
			obj:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		methods:{
			goMV(){
				this.$router.push('/video/'+this.obj.id)
			}
		},
		computed:{
			imagePath(){
				
				if(this.obj.hasOwnProperty('picUrl')){
					
					return "//"+this.obj.picUrl.split("//")[1] + "?param=320y180";
				}else{
					return "//" + this.obj.cover.split("//")[1] + "?param=320y180"
				}
			}
			
		}
		
	}
</script>

<style lang="scss" scoped>
	.mv-item{
		width: 24%;
		@include list-item;
	}
	.img{
		width: 100%;
	}
	.wd{
		@include mlist-tit;
	}
	.name{
		color: $black2;
		padding: 2px 0;
		font-size: $fs14;
	}
	.paly-num{
		position: absolute;
		right: 4px;
		top: 4px;
		color: #fff;
		font-size: $fs14;
		padding: 4px;
		background: rgba(0,0,0,0.4);
		border-radius: 5px;
	}
	.icon-hide{
		@include mlist-play;
		position: absolute;
		left: 50%;
		top: 70px;
		transform: translate(-50%,0);
	}
	.mv-item:hover .icon-hide{
		opacity: 1;
	}
</style>
