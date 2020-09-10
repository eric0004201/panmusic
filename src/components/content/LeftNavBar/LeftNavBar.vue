<template>
	<div class="left-nav">
		<nav-bar>
			<nav-bar-item path="/findmusic">
				<i slot="icon" class="el-icon-magic-stick"></i>
				<span slot="txt">发现音乐</span>
			</nav-bar-item>
			<nav-bar-item path="/recommend">
				<i slot="icon" class="el-icon-thumb"></i>
				<span slot="txt">推荐歌单</span>
			</nav-bar-item>
			<nav-bar-item path="/newmusic">
				<i slot="icon" class="el-icon-star-off"></i>
				<span slot="txt">最新音乐</span>
			</nav-bar-item>
			<nav-bar-item path="/newmv">
				<i slot="icon" class="el-icon-video-camera"></i>
				<span slot="txt">最新MV</span>
			</nav-bar-item>
		</nav-bar>
	</div>
</template>

<script>
	import NavBar from '../../common/navBar/NavBar.vue'
	import NavBarItem from '../../common/navBar/NavBarItem.vue'
	
	export default{
		name:"LeftNavBar",
		components:{
			NavBar,
			NavBarItem
		}
		
	}
</script>

<style lang="scss" scoped>
	.left-nav{}
</style>
