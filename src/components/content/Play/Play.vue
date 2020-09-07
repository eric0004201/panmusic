<template>
	<div class="play-wp amt" :class="{on : openDetail}">
		<song-detail v-if="Object.keys(item).length>0"
									ref="sd" 
									:id="id"
									:aName="mperson"
									:name="item.name"  
									:img="album.blurPicUrl" 
									@closed="closed">
		</song-detail>
		<div class="play">
			<div class="play-bar">
				<el-slider v-model="curDur"
									 :show-tooltip="false"
									 @change="sChange"
									 :max="1000"
									 :disabled="Object.keys(item).length===0"
				></el-slider>
			</div>
			<div class="play-info" @click="openD" v-if="Object.keys(item).length>0">
				<div class="pimg"><img class="amt" :src="album.blurPicUrl + '?param=50y50' " /></div>
				<div class="pcon">
					<div><span class="m-tit">{{item.name}}</span> <span class="m-tit2">- {{mperson}}</span></div>
					<div class="m-dur">{{curDurFen}} / {{duration | fen}}</div>
				</div>
			</div>
			<div class="play-wrap">
				<div class="bn-back" @click="playBack()"><i class="el-icon-back"></i></div>
				<div @click="play">
					<div v-show="isPause" class="bn-play"><i class="el-icon-caret-right bn-bg"></i></div>
					<div v-show="!isPause" class="bn-play"><div class="pause bn-bg"></div></div>
				</div>
				<div class="bn-next" @click="playNext()"><i class="el-icon-right"></i></div>
			</div>
			<div class="contral">
				<div class="play-mode" @click="setMode">
					<img v-show="pm==1" src="~assets/images/play_bn/all.png" />
					<img v-show="pm==2" src="~assets/images/play_bn/random.png" />
					<img v-show="pm==3" src="~assets/images/play_bn/one.png" />
				</div>
				<div class="play-list" @click="openList">
					<img src="~assets/images/play_bn/list.png" />
				</div>
				<div class="play-voice" >
					<span @click="setVoice">
						<img v-show="vc" src="~assets/images/play_bn/open.png"/>
						<img v-show="!vc" src="~assets/images/play_bn/close.png"/>
					</span>
					
					<div class="pv-bar">
						<el-slider v-model="value" @input="changeVoice"></el-slider>
					</div>
					
				</div>
			</div>
			<audio ref='audio' style="display: none;" id="audio"></audio>
		</div>
	</div>
</template>

<script>
	import SongDetail from './SongDetail.vue'
	import { mapGetters } from 'vuex'
	import { fenFormat, randomFrom } from 'common/utils.js'
	import { getPlayInfo, getLyric } from 'network/player.js'
	import { songInfo } from 'common/mixin.js'
	
	export default{
		name:"Play",
		components:{
			SongDetail
		},
		computed:{
			...mapGetters(['getMList','getTMList']),
			curDurFen(){
				return fenFormat(this.curTime)
			}
		},
		mixins:[songInfo],
		data(){
			return {
				value:60,
				pm:1,
				vc:true,
				isPause:true,
				audio:null,
				duration:0,
				curDur:0,
				timer:null,
				id:'',
				item:{},
				album:{},
				curTime:0,
				loop:false,
				openDetail:false,
				lrc:''
			}
		},
		methods:{
			setMode(){
				if(this.pm>=3) this.pm = 0;
				this.pm+=1;
				if(this.pm === 3) {
					this.audio.loop = true;
					this.loop = true;
				}else{
					this.audio.loop = false;
					this.loop = false;
				}
			},
			openD(){
				this.openDetail = true;
				this.$refs.sd.isPlay = true;
				this.$refs.sd.isd = true;
				
			},
			setVoice(){
				this.vc=!this.vc;
				if(this.vc){
					this.value=100
					this.audio.volume=1
				}else{
					this.value=0
					this.audio.volume=0
				}
			},
			changeVoice(e){
				
				this.value = e
				this.audio.volume=e/100;
			},
			play(){
				
				if(this.getMList.length === 0) return; 
				
				this.isPause=!this.isPause;
				if(this.isPause){
					this.audio.pause();
					clearInterval(this.timer)
					this.$refs.sd.isPlay = false;
					this.$refs.sd.timeStop()
				}else{
					this.audio.play();
					this.timePlay();
					this.curTime = this.audio.currentTime;
					this.audio.volume=this.value/100
					this.$refs.sd.isPlay = true;
					this.$refs.sd.timePlay()
				}
				this.audio.paused;
				
			},
			playMusic(id){
				this.id = id;
				
				getLyric(this.id).then(res => {
					if(res.hasOwnProperty('lrc')){
						this.$refs.sd.lrc = res.lrc.lyric;
						this.$refs.sd.lrcShow()
					}else{
						this.$refs.sd.lrc = [];
						this.$refs.sd.lrcShow()
					}
					
					
				})
				
				let mp3 = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
				
				this.audio.src=mp3;
				
				this.isPause=false;
				this.audio.onloadedmetadata= () => {
					this.audio.play();
					
					this.$bus.$emit("openList",this.id,false);
					this.duration = this.audio.duration;
					//let m = fenFormat(this.audio.duration)
					this.timePlay();
					this.$refs.sd.isPlay = true;
					this.$refs.sd.timePlay()
				}
				this.audio.onended= () => {
					if(!this.loop){
						this.playNext(id);    
					}
					
				}
				
				
			},
			timePlay(){
				this.timer = setInterval(() => {
					let cur = (this.audio.currentTime / this.audio.duration) *1000;
					this.curTime = this.audio.currentTime;
					this.$refs.sd.curTime = this.audio.currentTime;
					this.$refs.sd.duration = this.audio.duration;
					cur = parseInt(cur)
					
					this.curDur=cur;
					if(cur>=1000){
						clearInterval(this.timer)
					}
					
				},200)
			},
			sChange(e){
				
				this.audio.currentTime = e/1000*this.audio.duration
			},
			playNext(){
				let id = this.id;
				if(this.getMList.length>1){
					let num;
					
					this.getMList.findIndex(function(value, index, arr) {
						if(id === value.id) {
							num = index
							
						}
					})
					
					
					this.audio.loop = false;
					let nid;
					if(num === this.getMList.length-1){
						nid = this.getMList[0].id
						this.item = this.getMList[0];
					}else{
						nid = this.getMList[num+1].id
						this.item = this.getMList[num+1]
					}
					
					//随机
					if(this.pm === 2){
						let r = randomFrom(0,this.getMList.length-1)
						nid = this.getMList[r].id
						this.item = this.getMList[r]
					}
					
					this.setInfo(this.item)
					this.playMusic(nid)
					this.id = nid;
					this.$bus.$emit("openList",this.id,false);
					
				}else{
					this.audio.loop = true;
					this.audio.play();
					
				}
				
			},
			playBack(){
				let id = this.id;
				if(this.getMList.length>1){
					let num;
					
					this.getMList.findIndex(function(value, index, arr) {
						if(id === value.id) {
							num = index
							
						}
					})
				
					
					this.audio.loop = false;
					let nid;
					if(num === 0){
						nid = this.getMList[this.getMList.length-1].id
						this.item = this.getMList[this.getMList.length-1];
					}else{
						nid = this.getMList[num-1].id
						this.item = this.getMList[num-1]
					}
					
					this.setInfo(this.item)
					this.playMusic(nid);
					this.id = nid;
					this.$bus.$emit("openList",this.id,false);
				}else{
					this.audio.loop = true;
					this.audio.play();
					
				}
			},
			setInfo(item){
				
				
				let aid;
				
				if(item.hasOwnProperty('album')){
					aid = item.album.id
				}else{
					aid = item.al.id
				}
				getPlayInfo(aid).then(res => {
					
					this.album = res.album;
					
				})
			},
			openList(){
				this.$bus.$emit("openList",this.id,true);
			},
			closed(){
				this.openDetail = false;
			}
			
		},
		mounted() {
			this.audio = this.$refs.audio;
			this.$bus.$on('play', (item)=> {
				this.id = item.id;
				this.item = item;
				
				this.setInfo(this.item);
				this.playMusic(this.id);
			})
			let that = this;
			this.audio.addEventListener("error", function () {   
				
			  that.playNext(this.id);     
			});
		},
		filters:{
			fen(v){
				return fenFormat(v)
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.play-wp{
		height: 70px;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		box-shadow:0 5px 10px rgba(0, 0, 0, 0.3);
		background: #fff;
		z-index: 10;
	}
	.play{
		height: 70px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		
	}
	.play-wrap{
		width: 200px;
		margin: 0 auto;
		display: flex;
		
		color: $navActiveColor;
	}
	.bn-back{
		font-size: 26px;
		line-height: 60px;
	}
	.bn-play{
		padding-top: 5px;
	}
	.bn-bg{
		position: relative;
		font-size: 30px;
		background:  $navActiveColor;
		color: #fff;
		width: 50px;
		height: 50px;
		line-height: 50px;
		border-radius: 25px;
	}
	.bn-next{
		font-size: 26px;
		line-height: 60px;
	}
	.play-wrap>div{
		cursor: pointer;
		flex: 1;
		text-align: center;
	}
	.contral{
		position: absolute;
		right: 20px;
		width: 300px;
		bottom: 8px;
		display: flex;
		height: 38px;
		line-height: 38px;
		flex-wrap: nowrap;
	}
	.contral img{ 
		width: 26px;
		height: 26px;
		padding-top: 6px;
	}
	.contral>div{
		margin-right: 20px;
		
	}
	.play-voice{
		display: flex;
	}
	.pv-bar{
		margin-left:10px;
		width: 150px;
	}
	.pv-bar ::v-deep .el-slider__bar{
		background: $navActiveColor;
	}
	.pv-bar ::v-deep .el-slider__button{
		background: $navActiveColor;
		border-color: $navActiveColor;
	}
	.pv-bar ::v-deep .el-slider__runway{
		height: 3px;
	}
	.pv-bar ::v-deep .el-slider__bar{
		height: 3px;
	}
	.pv-bar ::v-deep .el-slider__button-wrapper{
		top:-17px
	}
	.pv-bar ::v-deep .el-slider__runway{
		margin-top: 17px;
	}
	.contral img{
		cursor: pointer;
	}
	.pause{
		margin: 0 auto;
	}
	.pause:before{
		position: absolute;
		content: ' ';
		width: 8px;
		height: 16px;
		top: 17px;
		left: 19px;
		border-left: 2px solid #fff;
		border-right: 2px solid #fff;
	}
	.play-bar{
		margin-bottom: 4px;
	}
	.play-bar ::v-deep .el-slider__runway{
		margin: 0;
		height: 3px;
	}
	.play-bar ::v-deep .el-slider__button-wrapper{
		display: none;
	}
	.play-bar:hover ::v-deep .el-slider__button-wrapper{
		display: block;
	}
	.play-bar ::v-deep .el-slider__bar{
		height: 3px;
		background: $navActiveColor;
	}
	.play-bar ::v-deep .el-slider__button {
	    background: $navActiveColor;
	    border-color: $navActiveColor;
	}
	.play-bar ::v-deep .el-slider__button-wrapper{
		top: -17px;
	}
	.play-info{
		position: absolute;
		left: 25px;
		top: 10px;
		display: flex;
		cursor: pointer;
	}
	.pimg{
		
	}
	.pimg img{
		width: 56px;
		height: 56px;
		
		filter: blur(3px);
	}
	.pimg{
		border-radius: 6px;
		overflow: hidden;
		border: 1px solid #fefefe;
		width: 56px;
		height: 56px;
	}
	.play-info:hover img{
		filter: blur(0);
	}
	.m-tit{
		font-size: 18px;
		padding-left: 10px;
		
	}
	.m-tit2{
		color: $black2;
		
	}
	.pcon{
		padding-top: 4px;
	}
	.m-dur{
		padding-left: 10px;
		color: $black2;
		margin-top: 8px;
	}
	.play-wp.on{
		bottom: 0;
		height: 100%;
	}
	
	
</style>
