<template>
	<div class="video-wp main" ref="vw">
		<div class="vin">
			<div class="v-left">
				<div class="tit">{{info.name}} - {{info.artistName}}</div>
				<div class="video">
					<video width="830" height="466" ref="player" controls="controls"></video>
				</div>
				<div class="wd">{{info.desc}}</div>
				<div class="tips">发布：{{info.publishTime}}  <span>播放：</span>{{info.playCount}}次</div>
				<div class="noc" v-if="comments.length === 0">还没有评论哦</div>
				<comments :hot='hot' :comments="comments" :cnum="cnum"></comments>
				<pagination :pageSize='pageSize' :total="cnum" @goPage='goPage'></pagination>
			</div>
			<div class="v-right">
				<div class="tit">相关推荐</div>
				<div class="tmv">
					<mv-list-item v-for="item in mvList" :obj="item"></mv-list-item>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Comments from 'components/content/Comments/Comments.vue'
	import Pagination from 'components/content/Pagination/Pagination.vue'
	import MvListItem from 'components/content/MvList/MvListItem'
	import { getVideo, getVideoInfo, getVideoCom, getVideoSimi } from 'network/mv.js'
	
	export default{
		name:"Video",
		data(){
			return {
				player:null,
				info:{},
				hot:[],
				comments:[],
				cnum:0,
				pageSize:20,
				mvList:[],
				id:'',
				page:0
			}
		},
		components:{
			Comments,
			Pagination,
			MvListItem
		},
		mounted() {
			this.init()
		},
		watch:{
			$route(to,from){
					this.init()
			}
		},
		methods:{
			goPage(val){
				this.page = val-1;
				this.getCom();
				this.$refs.vw.scrollTop = 520;
			},
			getCom(){
				let n = this.page * this.pageSize;
				getVideoCom(this.id, this.pageSize, n).then(res => {
					this.cnum = res.total;
					this.comments = res.comments;
					this.hot = res.hotComments;
					
				})
			},
			init(){
				this.id = this.$route.params.id;
				
				this.player = this.$refs.player;
				
				getVideo(this.id).then(res => {
					this.player.src = "//" + res.data.url.split("//")[1];
				})
				this.player.onplaying = () =>{
					this.$bus.$emit("pause")
				}
				getVideoInfo(this.id).then(res => {
					
					this.info = res.data;
				})
				
				this.getCom();
				
				getVideoSimi(this.id).then(res => {
					this.mvList = res.mvs
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video-wp{
		
		margin: 0 auto;
		
		top: 60px;
		bottom: 70px;
		left: 0;
		right: 0;
		
		position: absolute;
		overflow: auto;
	}
	.vin{
		width: 1200px;
		margin: 0 auto;
		display: flex;
	}
	.v-left{
		flex: 1;
		padding-right: 30px;
	}
	.tit{
		font-size: 18px;
		padding: 20px 0;
	}
	.wd{
		font-size: 14px;
		line-height: 1.3;
		padding: 15px 0;
		color: $black2;
	}
	.tips{
		color: $black3;
		margin-bottom: 30px;
		span{
			margin-left: 30px;
		}
	}
	.noc{
		margin-top: 60px;
		font-size: 14px;
		color: $black2;
		text-align: center;
	}
	
	.v-right{
		width: 340px;
	}
	.tmv ::v-deep .mv-item{
		width: 100%;
	}
</style>
