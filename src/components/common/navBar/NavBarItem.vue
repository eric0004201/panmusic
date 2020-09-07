<template>
	<div class="nav-item" :class="{on:isOn}" @click="navClick">
		<span class="icon"><slot name="icon"></slot></span>
		<span class="txt"><slot name="txt"></slot></span>
	</div>
</template>

<script>
	export default{
		name:"NavBarItem",
		props:{
			path:{
				type:String,
				default:''
			}
		},
		computed:{
			isOn(){
			
				return this.$route.path===this.path
			}
		},
		methods:{
			navClick(){
				this.$router.push(this.path);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-item{
		height: 50px;
		line-height: 50px;
		padding-left: 20px;
		cursor: pointer;
	}
	.nav-item:hover{
		background: $navHoverBg;
	}
	.on.nav-item{
		color: $navActiveColor;
		background: $navActiveBg;
	}
	.icon{
		font-size: 16px;
	}
	.on .icon{
		color: $navActiveColor;
	}
	.txt{
		margin-left: 12px;
		font-size: 14px;
	}
</style>
