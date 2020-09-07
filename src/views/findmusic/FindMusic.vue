<template>
	<div class="main">
		<div class="main-in">
			<my-carousel :banner="banner"></my-carousel>
			<div class="tit">推荐歌单</div>
			<song-sheet :songs="songs"></song-sheet>
			<div class="tit">最新音乐</div>
			<new-music :list="list"></new-music>
			<div class="tit">推荐MV</div>
			<mv-list :mv-list="mvList"></mv-list>
		</div>
	</div>
</template>

<script>
	import MyCarousel from 'components/common/carousel/MyCarousel.vue'
	import SongSheet from 'components/content/SongSheet/SongSheet.vue'
	import NewMusic from './child/NewMusic.vue'
	import MvList from 'components/content/MvList/MvList.vue'
	
	
	import { getBanner, getSongs, getNew, getMV } from 'network/find.js'
	
	export default{
		name:"FindMusic",
		data(){
			return {
				banner:[],
				songs:[],
				list:[],
				mvList:[]
			}
		},
		components:{
			MyCarousel,
			SongSheet,
			NewMusic,
			MvList
		},
		mounted() {
			this.$store.commit('setTitle','发现音乐');
			
			getBanner().then(res =>{
				this.banner=res.banners;
			});
			getSongs().then(res => {
				this.songs=res.result;
				
			});
			getNew().then(res => {
				this.list=res.result;
				
			});
			getMV().then(res => {
				this.mvList=res.result;
			})
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/css/style.scss";
	.tit{
		font-size: $fs18;
		color: $black1;
		margin-bottom: 20px;
		margin-top: 20px;
	}
</style>
