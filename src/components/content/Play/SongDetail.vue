<template>
	<div class="song-wrap" ref="sw">
		<div class="bgv amt" :class="{bgon:isPlay}">
			<img class="amt" :src="imgSrc">
		</div>
		<div class="song-detail">
			<div class="shead">
				<div v-show="isd" class="down" @click="closed"><i class="el-icon-arrow-down"></i></div>
				<div class="player">
					<img src="data:image/png;base64,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" class="play-bar-support">
					<img class="play-tiao amt" :class="{on:isPlay}" src="~assets/images/play_bn/play-bar.png"/>
					<div class="pan on" :class="{stop : !isPlay}">
						<img :src="imgSrc">
					</div>
				</div>
				<div class="lyric amt" :class="{lyon:isPlay}">
					<div class="tit">{{name}}</div>
					<div class="wd">歌手：<span>{{aName}}</span></div>
					<div class="lyric-wp" v-show='lrc.indexOf("[") > -1'>
						<div class="lyc-in amt" ref="lyn">
							<p class="amt" v-for="(item,index) in lrcfmt" :class="{on : curT === index}" >
								{{item.txt}}
							</p> 
						</div>
					</div>
					<div class="nolyc" v-show='lrc.indexOf("[") === -1'>暂无歌词</div>
				</div>
			</div>
			<div class="sd-con">
				<div class="comment">
					<comments :hot='hot' :comments="comments" :cnum="cnum"></comments>
					<pagination :pageSize='pageSize' :total="cnum" @goPage='goPage'></pagination>
				</div>
				<div class="sc-right">
					
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	import Comments from 'components/content/Comments/Comments.vue'
	import Pagination from 'components/content/Pagination/Pagination.vue'
	import { getMusicComment } from 'network/find.js'
	
	
	export default{
		name:"SongDetail",
		data(){
			return {
				isPlay:false,
				isd:false,
				hot:[],
				comments:[],
				cnum:0,
				pageSize:20,
				page:0,
				lrcfmt:[],
				curTime:999,
				duration:10,
				curT:0,
				timer:null,
				pheight:30,
				lrc:''
				
			}
		},
		created() {
			
			
		},
		watch:{
			lrc(){
				this.getComment();
				this.ph = 0;
				this.$refs.sw.scrollTop = 0;
			}
		},
		components:{
			Comments,
			Pagination
			
		},
		props:{
			id:{
				type:Number,
				default(){
					return 0
				}
			},
			name:{
				type:String,
				default(){
					return ""
				}
			},
			aName:{
				type:String,
				default(){
					return ""
				}
			},
			img:{
				type:String,
				default(){
					return ""
				}
			}
			
		},
		computed:{
			
			imgSrc(){
				return this.img + "?param=400y400"
			}
		},
		methods:{
			closed(){
				this.isd = false;
				this.$emit("closed")
			},
			goPage(val){
				this.page = val-1;
				this.getComment();
				this.$refs.sw.scrollTop = 560
			},
			getComment(){
				
				var pg = this.pageSize * this.page;
				getMusicComment(this.id, this.pageSize, pg).then(res => {
					this.hot = res.hotComments
					this.comments = res.comments
					this.cnum = res.total;
				})
			},
			lrcShow(){
				if(this.lrc.indexOf("[") === -1) {
					this.lrcfmt =[];
				}else{
					
				
					let arr = []
					let lrcArr = this.lrc.split("\n");
					lrcArr.pop();
					if(lrcArr[0].indexOf("[") === -1) {
						lrcArr.shift()
					}
					for(let item of lrcArr){
						
						
						let time = item.split("]")[0]
						time = time.split("[")[1]
						let txt = item.split("]")[1]
						
						let m = parseInt(time.split(":")[0])*60;
						let s = parseInt(time.split(":")[1].split(".")[0])
						let ss = parseInt(time.split(":")[1].split(".")[1])/1000
						
						time = m + s + ss;
						
						arr.push({time:time,txt:txt})
						
					}
					arr=arr.filter((ele, index, arr) => {
						return ele.txt!=""
					})
					
					arr.push({time:'9999999999',txt:" "})
					this.lrcfmt = arr;
				}
			},
			lycPlay(){
				for(let i=0; i<this.lrcfmt.length; i++){
					if(this.curTime>=this.lrcfmt[i].time && this.curTime<this.lrcfmt[i+1].time){
						if(i < 7){
							
							this.$refs.lyn.style.marginTop = 0;
						}else if(i>=7 && i<this.lrcfmt.length-7){
						
							let hh = 0;
							for(let j = 0; j < i-7; j++){
								hh += document.querySelectorAll(".lyc-in p")[j].offsetHeight;
							}
							
							this.$refs.lyn.style.marginTop = (-hh) + "px";
							
						}else{
							let hh = 0;
							for(let j = 0; j < this.lrcfmt.length-14; j++){
								hh += document.querySelectorAll(".lyc-in p")[j].offsetHeight;
							}
							this.$refs.lyn.style.marginTop = (-hh) + "px";
						}
						this.curT = i;
						
					}
				}
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.song-wrap{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 70px;
		overflow: auto;
		background: #fff;
	}
	.bgv{
		position: absolute;
		left: 0;
		right: 0;
		width: 100%;
		top: 0;
		height: 678px;
		overflow: hidden;
		opacity: 0;
		
		
	}
	.song-detail{
		position: relative;
		width: 1200px;
		margin: 0 auto;
	}
	.shead{
		display: flex;
	}
	.player{
		width: 550px;
		height: 550px;
		position: relative;
	}
	.play-bar-support{
		position: absolute;
		width: 35px;
		height: 35px;
		left: 226px;
		top: -10px;
		z-index: 2;
	}
	.play-tiao{
		position: absolute;
		left: 237px;
		top: 10px;
		width: 130px;
		transform-origin:left top;
		transform: rotate(-37deg);
		z-index: 6;
	}
	.play-tiao.on{
		transform: rotate(0deg);
	}
	.pan{
		width: 380px;
		height:380px;
		border-radius: 50%;
		border:13px solid #e6e5e6;
		background: #0f0f12;
		margin-left: 50px;
		margin-top: 100px;
		text-align: center;
	}
	.pan img{
		width: 260px;
		height: 260px;
		border-radius: 50%;
		margin-top: 47px;
	}
	.down{
		position: fixed;
		left: 15px;
		top: 15px;
		line-height: 30px;
		font-size: 16px;
		width: 30px;
		border-radius: 50%;
		cursor: pointer;
		text-align: center;
		font-size: 22px;
		z-index: 2;
		background: rgba(255,255,255,0.6);
	}
	.down:hover{
		background: #eee;
	}
	.bgon .down{
		color: #111010;
	}
	.pan.on{
		animation: go 15s linear infinite;
	}
	.pan.stop{
		animation-play-state:paused;
	}
	@keyframes go {
	    from {   /*0%*/
	        transform: rotate(0deg);
	    }
	    to {    /*100%*/
	        transform: rotate(360deg);
	    }
	}
	.lyric{
		width: 600px;
		margin-top: 60px;
		padding-bottom: 20px;
		margin-bottom: 20px;
	}
	.tit{
		font-size: 26px;
		padding-left: 20px;
		padding-top: 15px;
	}
	.wd{
		margin-top: 15px;
		font-size: 14px;
		padding-left: 20px;
		span{
		
		}
	}
	
	.comment{
		margin-top: 30px;
	}
	.lyric-wp{
		height: 458px;
		overflow: hidden;
		margin-top: 20px;
		padding-left: 20px;
	}
	.lyc-in{
		
	}
	.lyc-in p{
		font-size: 15px;
		color: $black3;
		line-height: 30px;
		padding-right: 100px;
	}
	.lyc-in p.on{
		font-weight: bold;
		color: $black1;;
		animation: lyc 0.6s ease-out 1;
		transform-origin:left center;
		animation-fill-mode:forwards;
		transform:  scale(1.15); 
		line-height: 1.5;
		padding-top: 10px;
		padding-bottom: 10px;
	}
	@keyframes lyc {
	    0% {   
				
				color:$navActiveColor;
				letter-spacing: 1.3;
	      transform: scale(0.8); 
				opacity:0.5;
				filter: blur(3px);
	    }
			60%{
			       
				filter: blur(0);		 
				transform: scale(1.23); 
			} 
	    100% {    
				letter-spacing: 1;
				
	      transform:  scale(1.15); 
				opacity:1;
				
	    }
	}
	.nolyc{
		padding: 30px 20px;
		font-size: 15px;
		color: $black3;
	}
	.lyric{
		
		height: 587px;
		
		border-radius: 8px;
	}
	.bgon{
		opacity: 1;
	}
	.lyon{
		background: rgba(0, 0, 0, 0.4);
		color: #ede8e8;
	}
	.lyon p.on{
		color: #ede8e8;
	}
	.bgv img{
		width: 140%;
		filter: blur(60px);
		opacity: 0.6;
		animation:gobg 33.6s linear infinite;
		position: absolute;
	}
	@keyframes gobg {
	    0% {   /*0%*/
				left:-40%;
				top:-40%;
	      filter: blur(50px) brightness(50%);
				transform: scale(1);
	    }
	    25% {    /*100%*/
				left:0;
				top:-20%;
	      filter: blur(80px) brightness(120%);
				transform: scale(1.4);
	    }
			50%{
				left:0;
				top:0;
				filter: blur(90px) brightness(120%);
				transform: scale(1.1);
			}
			75%{
				left:-30%;
				top:0;
				filter: blur(80px) brightness(120%);
				transform: scale(1.2);
			}
			100%{
				left:-40%;
				top:-40%;
				filter: blur(50px) brightness(50%);
				transform: scale(1);
			}
	}
	.bgon .song-wrap{
		background:#afafac;
	}
	
	
</style>
