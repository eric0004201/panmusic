<template>
	<div class="main" ref='main'>
		<div class="main-in">
			<div class="head">
				<div class="hbg"><img :src="headCon.coverImgUrl"/></div>
				<div class="hcon">
					<div class="img"><img :src="headCon.coverImgUrl+'?param=280y280' "/></div>
					<div class="info">
						<div class="tit1" @click="goM">精品歌单</div>
						<div class="tit2">{{headCon.name}}</div>
						<div class="tit3">{{headCon.description}}</div>
					</div>
				</div>
				
			</div>
			<tags class="tags" :tags="tags" @tagClick="tagClick"></tags>
			<div>
				<song-sheet :songs="playList" @imgDone="imgDone"></song-sheet>
			</div>
			<div>
				<pagination ref='page' :pageSize='pageSize' :total="cnum" @goPage='goPage'></pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import Pagination from 'components/content/Pagination/Pagination.vue'
	import SongSheet from 'components/content/SongSheet/SongSheet.vue'
	import Tags from 'components/content/Tags/Tags.vue'
	import { getListHead, getListCon } from 'network/find.js'
	
	
	export default{
		name:"Recommend",
		components:{
			SongSheet,
			Pagination,
			Tags
		},
		data(){
			return {
				pageSize:50,
				tag:'全部',
				headCon:{},
				playList:[],
				headId:'',
				tags:['全部','欧美','华语','流行','说唱','摇滚','民谣','电子','轻音乐','影视原声','怀旧','治愈','旅行'],
				curTag:0,
				cnum:0,
				loading:true,
				loadNum:0
				
				
			}
		},
		created() {
			
			getListHead('全部').then(res => {
				
				this.headCon = res.playlists[0]
				this.headId = res.playlists[0].id
			})
			getListCon(this.pageSize, 0, this.tag).then(res => {
				
				this.playList = res.playlists
				this.loading = false
			})
		},
		methods:{
			goM(){
				this.$router.push('/musiclist/'+this.headId)
			},
			tagClick(tag){
				
				this.tag = tag;
				this.loadNum=0;
				this.playList = [];
				this.loading = true;
				this.$refs.page.currentPage = 1;
				getListHead(tag).then(res => {
					
					this.headCon = res.playlists[0]
					this.headId = res.playlists[0].id
				})
				getListCon(this.pageSize, 0, tag).then(res => {
					this.loading = false
					this.playList = res.playlists
					if(tag === '全部'){
						this.cnum = 0;
					}else{
						this.cnum = res.total;
					}
				})
			},
			goPage(val){
				var p = (val-1)*this.pageSize;
				getListCon(this.pageSize, p, this.tag).then(res => {
					this.loading = false
					this.playList = res.playlists
					if(this.tag === '全部'){
						this.cnum = 0;
					}else{
						this.cnum = res.total;
					}
					
					this.loading = true
					this.loadNum=0;
					
					this.$refs.main.scrollTop = 260;
				})
			},
			imgDone(){
				// this.loadNum++;
				
				// if(this.loadNum>=this.playList.length){
				// 	this.loading = false
				// }
				
				
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	@import "~assets/css/style.scss";
	
	.head{
		position: relative;
		border-radius: 5px;
		overflow: hidden;
	}
	.hcon{
		display: flex;
		background: rgba(0,0,0,0.5);
		padding: 20px;
	}
	.hbg{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		overflow: hidden;
	}
	.hbg img{
		width: 100%;
		filter: blur(25px);
	}
	.hcon{
		position: relative;
	}
	.img img{
		width: 170px;
		height: 170px;
	}
	.img{
		margin-right: 20px;
	}
	.tit1{
		cursor: pointer;
		padding: 3px 10px;
		border: 1px solid #e7aa5a;
		color: #e7aa5a;
		border-radius: 3px;
		margin-bottom: 15px;
		width: 110px;
		font-size: 16px;
		text-align: center;
	}
	.tit2{
		font-size: 20px;
		color: #fff;
		margin-bottom: 10px;
	}
	.tit3{
		font-size: 14px;
		color: $black3;
	}
	.tags{
		margin-top: 20px;
	}
</style>
