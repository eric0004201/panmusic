<template>
	<div class="main" id="main" v-loading="loading">
		<collect class="collect-wp" ref="coll" @collect="collect"></collect>
		<div class="ml-info-wp" v-if="Object.keys(info).length>1">
			<div class="ml-img"><img :src="info.coverImgUrl | imageUrl"/></div>
			<div class="ml-info">
				<div class="ml-tit1">{{info.name}}</div>
				<div class="ml-tit2">
					<img :src="info.creator.avatarUrl | imageUrl"/> 
					<span class="name">{{info.creator.nickname}}</span>
					<span class="time">{{info.createTime | dfmt}} 创建</span>
				</div>
				<div class="ml-bn" @click="playAll">
					 播放全部
				</div>
				<div class="ml-tips">
					标签：{{info.tags}}
				</div>
				<div class="ml-wd">
					简介：{{info.description}}
				</div>
			</div>
		</div>
		<div class="ml-list-wp">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="歌曲列表" name="first">
					<songs-list ref="songs" @imgDone="imgDone" :mTableData="mTableData"></songs-list>
				</el-tab-pane>
				<el-tab-pane :label="tabTit" name="second">
					<comments :hot='hot' :comments="comments" :cnum="cnum"></comments>
					<pagination :pageSize='pageSize' :total="cnum" @goPage='goPage'></pagination>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import Pagination from 'components/content/Pagination/Pagination.vue'
	import SongsList from 'components/content/SongsList/SongsList.vue'
	import Collect from 'components/common/collect/Collect.vue'
	import Comments from 'components/content/Comments/Comments.vue'
	import { getListInfo, getListItem, getComments } from 'network/player.js'
	import { fenFormat, dateFormat, setItem, removeItem, checkCollect } from 'common/utils.js'
	import { imgSrc } from 'common/mixin.js'
	
	export default{
		name:"MusicList",
		data(){
			return {
				info:{},
				mTableData:[],
				activeName:'first',
				trackIds:[],
				firstCK:false,
				id:'',
				cnum:0,
				tabTit:'',
				comments:[],
				hot:[],
				pageSize:20,
				loading:true,
				loadNum:0,
				cur:-1
			}
		},
		mixins:[imgSrc],
		components:{
			Pagination,
			Comments,
			SongsList,
			Collect
		},
		watch:{
			$route(to,from){
					this.init()
			}
		},
		created() {
			this.init()
		},
		filters:{
			dfmt(v){
				var d = new Date(v)
				return dateFormat('YYYY-mm-dd',d)
			}
		},
		
		mounted() {
			this.$refs.coll.ison = checkCollect(this.id,"songSheet");
			
			let that = this;
			this.$bus.$on('openList',(id) => {
				this.cur = -1;
				this.mTableData.findIndex(function(value, index, arr) {
					if(id === value.id) {
						that.cur = index
						
					}
				})
				
				if(this.$refs.songs != undefined){
					this.$refs.songs.cur = this.cur;
				}
				
			});
			
		},
		
		methods:{
			collect(tf){
				let obj = {};
				obj.id = this.id;
				obj.name = this.info.name;
				if(tf === true){
					setItem(obj,"songSheet")
				}else{
					removeItem(obj,"songSheet")
				}
				this.$bus.$emit("itemChange");
				
			},
			handleClick(){
				
			},
			handleCurrentChange(val) {
				this.currentRow = val;
				
			},
			init(){
				let id = this.$route.params.id;
				
				this.id = id;
				getListInfo(id).then(res => {
					
					this.info = res.playlist;
					this.trackIds = res.playlist.trackIds;
					
					this.createList(this.trackIds);
					this.loading = false;
				})
				getComments(id,this.pageSize,0).then(res => {
					this.comments = res.comments;
					this.hot = res.hotComments;
					this.cnum = res.total;
					this.tabTit = '评论(' + res.total + ')';
					
				})
			},
			createList(ids){
				let s = ids.map((v, i, a) => {
					return v.id
				})
				
				getListItem(s.toString()).then(res => {
					
					this.mTableData = res.songs;
					this.$refs.songs.firstCK = false;
				});
			},
			
			
			goPage(val){
				var p = (val-1)*this.pageSize;
				getComments(this.id,this.pageSize,p).then(res => {
					this.comments = res.comments;
					if(p === 0){
						this.hot = res.hotComments;
					}else{
						this.hot = []
					}
					
					
					document.getElementById('main').scrollTop = 460;
					this.loading = false;
					
				})
				
			},
			playAll(){
				this.playSong(this.mTableData[0]);
			},
			imgDone(){
				this.loading = false;
			}
			
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/css/style.scss";
	.ml-info-wp{
		display: flex;
		margin-bottom: 40px;
	}
	.ml-img img{
		width: 250px;
		height: 250px;
	}
	.main{
		padding: 40px;
	}
	.ml-tit2 img{
		width: 36px;
		height: 36px;
	}
	.ml-info{
		padding-left: 30px;
	}
	.ml-tit1{
		font-size: 18px;
		padding-bottom: 20px;
	}
	.ml-tit2{
		display: flex;
		align-items: center;
	}
	.ml-tit2 img{
		border-radius: 50%;
		margin-right: 10px;
	}
	.ml-tit2{
		color: $black2;
		padding: 20px 0;
		.name{
			font-size: 16px;
			margin-right: 10px;
		}
		.time{
			font-size: 14px;
		}
	}
	.ml-bn{
		background: $navActiveColor;
		border-radius: 5px;
		color: #fff;
		width: 200px;
		text-align: center;
		line-height: 40px;
		font-size: 16px;
		cursor: pointer;
		margin-bottom: 20px;
		position: relative;
	}
	.ml-tips{
		font-size: 14px;
		padding-bottom: 10px;
		color: $black2;
	}
	.ml-wd{
		font-size: 14px;
		color: $black2;
	}
	.ml-list-wp ::v-deep .el-tabs__item.is-active{
		color: $navActiveColor;
	}
	.ml-list-wp ::v-deep .el-tabs__item:hover{
		color: $navActiveColor;
	}
	.ml-list-wp ::v-deep .el-tabs__active-bar{
		background-color:$navActiveColor;
	}
	.ml-list-wp ::v-deep .el-tabs__item{
		font-size: 18px;
		height: 50px;
		line-height: 50px;
	}
	.collect-wp{
		position: absolute;
		left: 243px;
		top: 47px;
		color: #222;
		height: 38px;
		padding: 4px;
		border-radius: 50%;
		line-height: 29px;
		background: rgba(255,255,255,0.5);
		animation: circle 10s linear infinite;
	}
	@keyframes circle {
	    0% {   
				transform: rotate(0deg);
			
	    }
			
	    100% {    
				transform: rotate(360deg);
	    }
	}
	
</style>
