<template>
	<div class="left-nav" :class="{smallw:collapse}">
		<div class="navc" @click="navChange" v-show="ishover">
			<i v-show="!collapse" class="el-icon-s-fold"></i>
			<i v-show="collapse" class="el-icon-s-unfold"></i>
		</div>
		<el-menu :default-active="cur" 
							class="nav-bar "
							active-text-color="#d33a31"
							@select="navClick"
							:collapse="collapse">
			<el-menu-item index="/findmusic" class="animate__animated animate__rubberBand myani1">
				<i class="el-icon-magic-stick"></i>
				<span slot="title">发现音乐</span>
				 
			</el-menu-item>
			<el-menu-item index="/recommend" class="animate__animated animate__jello myani2">
				<i class="el-icon-thumb"></i>
				<span slot="title">推荐歌单</span>
			</el-menu-item>
			<el-menu-item index="/newmusic" class="animate__animated animate__tada myani3">
				<i class="el-icon-mic"></i>
				<span slot="title">最新音乐</span>
			</el-menu-item>
			<el-menu-item index="/newmv" class="animate__animated animate__heartBeat myani4">
				<i class="el-icon-video-camera"></i>
				<span slot="title">最新MV</span>
			</el-menu-item>
			<el-menu-item index="/ping" class="animate__animated animate__pulse myani5">
				<i class="el-icon-chat-dot-square"></i>
				<span slot="title">关于</span>
			</el-menu-item>
			
		</el-menu>
	</div>
</template>

<script>
	import NavBar from '../../common/navBar/NavBar.vue'
	import NavBarItem from '../../common/navBar/NavBarItem.vue'
	import { setNav, getNav } from "common/utils.js"
	
	export default{
		name:"LeftNavBar",
		data(){
			return {
				collapse:true,
				ishover:false
			}
		},
		computed:{
			cur(){
				return this.$route.path
			}
		},
		mounted() {
			
			
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
		overflow-x: hidden;
		padding-top: 28px;
	}
	.nav-bar{
		
		font-weight: bold;
		font-size: 32px;
		
	}
	.nav-bar:hover .animate__animated{
		animation-play-state: paused;
	}
	.left-nav ::v-deep .el-menu-item:focus,.left-nav ::v-deep .el-menu-item:hover{
		background: rgba(209, 184, 114, 0.9);
	}
	.left-nav ::v-deep .el-menu{
		border-right: none;
		background: none;
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
	.smallw ::v-deep .el-menu-item [class^=el-icon-]{
		font-size: 26px;
	}
	.smallw ::v-deep .el-menu-item span{
		transition: all 0.3s;
		opacity: 0;
	}
	.myani1,.myani2,.myani3,.myani4,.myani5{
		animation-iteration-count:infinite;
		
	}
	.myani1{
		animation-delay: 2s;
	}
	.myani2{
		animation-delay: 3s;
	}
	.myani3{
		animation-delay: 4s;
	}
	.myani4{
		animation-delay: 5s;
	}
	.myani5{
		animation-delay: 6s;
	}
</style>
