<template>
	<div class="main" ref='main' @scroll="mscroll">
		<div class="main-in">
			<div class="head" ref="hd" v-if="Object.keys(headCon).length>0">
				<div class="hbg"><img @load="hload" :src="headCon.coverImgUrl | imageUrl"/></div>
				<div class="hcon">
					<div class="img"><img :src="headCon.coverImgUrl | imageUrl "/></div>
					<div class="info">
						<div class="tit1" @click="goM">精品歌单</div>
						<div class="tit2">{{headCon.name}}</div>
						<div class="tit3">{{headCon.description}}</div>
					</div>
				</div>
				
			</div>
			<tags class="tags" :tags="tags" @tagClick="tagClick"></tags>
			<div>
				<recom-sheet ref="rec" :songs="playList" @imgDone="imgDone"></recom-sheet>
			</div>
			<div>
				<pagination ref='page' :pageSize='pageSize' :total="cnum" @goPage='goPage'></pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import Pagination from 'components/content/Pagination/Pagination.vue'
	import RecomSheet from 'components/content/SongSheet/RecomSheet.vue'
	import Tags from 'components/content/Tags/Tags.vue'
	import { getListHead, getListCon } from 'network/find.js'
	import { imgSrc } from 'common/mixin.js'
	import { throttle } from 'common/utils.js'
	
	export default{
		name:"Recommend",
		components:{
			RecomSheet,
			Pagination,
			Tags
		},
		mixins:[imgSrc],
		data(){
			return {
				pageSize:60,
				tag:'全部',
				headCon:{},
				playList:[],
				headId:'',
				tags:['全部','欧美','华语','流行','说唱','摇滚','民谣','电子','轻音乐','影视原声','怀旧','治愈','旅行'],
				curTag:0,
				cnum:0,
				loading:true,
				loadNum:0,
				mscroll:() => {},
				headHeight:200,
				itemHeight:100,
				hang:0,
				curIndex:0
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
				this.hang =Math.ceil(this.playList.length/3);
				
			})
		},
		mounted() {
			this.mscroll = throttle(this.msc,100);
			
			
		},
		
		methods:{
			goM(){
				this.$router.push('/musiclist/'+this.headId)
			},
			hload(){
				this.headHeight = this.$refs.hd.offsetHeight +70;
				
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
					this.hang =Math.ceil(this.playList.length/3);
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
			imgDone(h){
				// this.loadNum++;
				
				// if(this.loadNum>=this.playList.length){
				// 	this.loading = false
				// }
				this.itemHeight = h;
				this.$refs.rec.setIndex(3);
				
			},
			msc(){
				var scrollTop = this.$el.scrollTop;
				this.headHeight = this.$refs.hd.offsetHeight +70;
				for(let i=0; i<this.hang; i++){
					if(scrollTop>this.headHeight+i*this.itemHeight-600 && scrollTop<=this.headHeight+(i+1)*this.itemHeight-600){
						this.curIndex = (i+1)*3
						
						this.$refs.rec.setIndex(this.curIndex);
					}
				}
				if(scrollTop<100){
					this.$refs.rec.setIndex(3);
				}
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
		overflow: hidden;
		height: 76px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
	}
	.tags{
		margin-top: 20px;
	}
</style>
