<template>
	<div class="left-nav amt" :class="{smallw:collapse}">
		<div class="navc" @click="navChange">
			<i v-show="!collapse" class="el-icon-s-fold"></i>
			<i v-show="collapse" class="el-icon-s-unfold"></i>
		</div>
		<el-menu :default-active="cur" 
							class="nav-bar"
							active-text-color="#d33a31"
							@select="navClick"
							:collapse="collapse">
			<el-menu-item index="/findmusic" >
				<i class="el-icon-magic-stick"></i>
				<span slot="title">发现音乐</span>
				 
			</el-menu-item>
			<el-menu-item index="/recommend" >
				<i class="el-icon-thumb"></i>
				<span slot="title">推荐歌单</span>
			</el-menu-item>
			<el-menu-item index="/newmusic" >
				<i class="el-icon-star-off"></i>
				<span slot="title">最新音乐</span>
			</el-menu-item>
			<el-menu-item index="/newmv" >
				<i class="el-icon-video-camera"></i>
				<router-link
				<span slot="title">最新MV</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	import NavBar from '../../common/navBar/NavBar.vue'
	import NavBarItem from '../../common/navBar/NavBarItem.vue'
	import { setNav } from "common/utils.js"
	
	export default{
		name:"LeftNavBar",
		data(){
			return {
				collapse:localStorage.getItem("navCollapse") === "true"
			}
		},
		computed:{
			cur(){
				return this.$route.path
			}
		},
		mounted() {
			let collapse = localStorage.getItem("navCollapse");
			if(collapse === null) {
				this.collapse =false;
			}else{
				this.collapse =  collapse === "true"
			}
		},
		components:{
			NavBar,
			NavBarItem
		},
		methods:{
			navClick(index){
				this.$router.push(index);
			},
			navChange(){
				this.collapse = !this.collapse;
				setNav(this.collapse)
			}
		}
		
		
	}
</script>

<style lang="scss" scoped>
	.left-nav{
		position: relative;
		width: 250px;
		overflow: auto;
		background: #f5f3f8;
		padding-top: 28px;
	}
	.nav-bar{
		
		background: #f5f3f8;
	}
	.left-nav ::v-deep .el-menu-item:focus,.left-nav ::v-deep .el-menu-item:hover{
		background: #fff;
	}
	.left-nav ::v-deep .el-menu{
		border-right: none;
	}
	.navc{
		position: absolute;
		right: 0;
		top:0;
		width: 28px;
		height: 28px;
		font-size: 28px;
		text-align: center;
		line-height: 28px;
		z-index: 1;
		cursor: pointer;
		color: #9d9d9e;
	}
	.smallw{
		width: 64px;
		
	}
	.smallw ::v-deep .el-menu-item span{
		transition: all 0.3s;
		opacity: 0;
	}
</style>
