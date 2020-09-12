<template>
	<div class="play-list amt" :class="{sin:isShow}">
		<div class="close" @click="closeList"><i class="el-icon-close"></i></div>
		<div class="ptit">
			
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane :label="'播放列表('+getMList.length+')'" name="first">
					<div class="list-head">
						<el-table
						    ref="singleTable"
						    :data="tableData"
								:height="getHeight"
						    highlight-current-row
						    @current-change="handleCurrentChange"
								@row-click="playSong"
						    style="width: 100%">
						   
						    <el-table-column
						      property="name"
						      label="音乐标题"
									:show-overflow-tooltip='true'
						      >
						    </el-table-column>
								<el-table-column width="30">
									
								</el-table-column>
						    <el-table-column
						      property="name"
						      label="歌手"
									:formatter="person"
									width="160"
						      >
						    </el-table-column>
						    <el-table-column
						      property="name"
									:formatter="fomat"
									width="100"
						      label="时长">
						    </el-table-column>
						  </el-table>
					</div>
				</el-tab-pane>
				<el-tab-pane :label="'收藏歌曲(' + collectLength + ')'" name="second">
					<el-table
					    ref="singleTableCollect"
					    :data="collectSongs"
							:height="getHeight"
					    highlight-current-row
					    @current-change="handleCurrentChange"
							@row-click="playSongCollect"
					    style="width: 100%">
					   
					    <el-table-column
					      property="name"
					      label="音乐标题"
								:show-overflow-tooltip='true'
					      >
					    </el-table-column>
							<el-table-column width="30">
								
							</el-table-column>
					    <el-table-column
					      property="name"
					      label="歌手"
								:formatter="person"
								width="160"
					      >
					    </el-table-column>
					    <el-table-column
					      property="name"
								:formatter="fomat"
								width="100"
					      label="时长">
					    </el-table-column>
					  </el-table>
				</el-tab-pane>
				<el-tab-pane :label="'收藏歌单(' + sheetLength + ')'" name="third">
					<div class="search-list">
						<div class="search-list-item" v-for="item in sheetSongs" @click="toList(item.id)">
							{{item.name}}
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
		
		
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { fenFormat } from 'common/utils.js'
	import {collectSongLength, collectSong} from "common/mixin.js"
	
	
	export default{
		name:"PlayList",
		computed:{
			...mapGetters(['getMList'])
		},
		mixins:[collectSongLength, collectSong],
		data(){
			return {
				tableData:[],
				tableDataCollect:[],
				currentRow: null,
				isShow:false,
				activeName: 'first',
				getHeight:document.documentElement.clientHeight-133,
				firstCK:false,
				collectLength:this.collectSongLength(),
				collectSongs:this.collectSong(),
				sheetLength:this.collectSongLength("songSheet"),
				sheetSongs:this.collectSong("songSheet")
			}
		},
		
		methods: {
			toList(id){
				this.isShow = false;
				this.$router.push('/musiclist/'+id);
				this.$bus.$emit("toSheet")
			},
			handleCurrentChange(val) {
				this.currentRow = val;
				//this.$bus.$emit("play",val.id);
			},
			playSong(val){
				this.$bus.$emit("play",val);
			},
			playSongCollect(val){
				if(!this.firstCK){
					this.$store.commit('addMusicList',this.tableDataCollect);
					this.firstCK = true;
				}
				this.$bus.$emit("play",val);
				this.$bus.$emit("collectClick");
			},
			setBg(val){
				this.currentRow = val;
			},
			fomat(val){
				if(val.hasOwnProperty('artists')){
					return fenFormat(val.duration/1000)
				}else{
					return fenFormat(val.dt/1000)
				}
				
			},
			person(val){
				if(val.hasOwnProperty('artists')){
					return val.artists[0].name
				}else{
					return val.ar[0].name
				}
			},
			closeList(){
				this.isShow = false;
			},
			handleClick(tab, event){
				
			}
		},
		mounted() {
			this.$bus.$on('itemChange', ()=> {
				this.collectLength = this.collectSongLength();
				this.collectSongs = this.collectSong();
				this.sheetLength = this.collectSongLength("songSheet"),
				this.sheetSongs = this.collectSong("songSheet")
				
			});
			this.$bus.$on("listClick",() => {
				this.firstCK = false;
			})
			
			window.onresize = () => {
				this.getHeight = document.documentElement.clientHeight-133;
			}
			
			this.$bus.$on('openList',(id,b) => {
				this.tableData = this.getMList;
				this.tableDataCollect = this.collectSongs;
				if(b) this.isShow = true;
				let num;
				
				this.getMList.findIndex(function(value, index, arr) {
					if(id === value.id) {
						num = index
					}
				})
				let num2;
				
				this.collectSongs.findIndex(function(value, index, arr) {
					if(id === value.id) {
						num2 = index
					}
				})
				this.$refs.singleTableCollect.setCurrentRow(this.tableData[num2]);
				this.$refs.singleTable.setCurrentRow(this.tableData[num]);
				
			});
			
		}
	}
</script>

<style lang="scss" scoped>
	.play-list{
		position: fixed;
		z-index: 99;
		right: 0;
		width: 500px;
		top: 0;
		bottom:70px;
		background: #fff;
		box-shadow: 1px 0 3px rgba(0,0,0,0.4);
		transform: scale(0) translateY(300px);
		filter:blur(20px);
		transform-origin: center bottom; 
		opacity: 0;
	}
	.ptit{
		padding-top: 10px;
		
		font-size: $fs18;
		text-align: center;
	}
	.tips{
		padding-bottom: 6px;
		border-bottom: 1px solid #eae5e5;
		padding-left: 20px;
		font-size: 15px;
	}
	.close{
		position: absolute;
		right: 4px;
		top: 4px;
		font-size: 30px;
		cursor: pointer;
		z-index: 10;
	}
	
	.sin{
		transform: scale(1) translateY(0);
		filter:blur(0px);
		opacity: 1;
	}
	.ptit ::v-deep .el-tabs__content{
		position: absolute;
		top: 64px;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
	}
	.ptit ::v-deep .el-tabs__item.is-active{
		color: $navActiveColor;
	}
	.ptit ::v-deep .el-tabs__item:hover{
		color: $navActiveColor;
	}
	.ptit ::v-deep .el-tabs__active-bar{
		background-color:$navActiveColor;
	}
	.ptit ::v-deep .el-tabs__item{
		font-size: 15px;
		height: 50px;
		line-height: 50px;
	}
	
	.ptit ::v-deep .el-table__body-wrapper::-webkit-scrollbar {
	 
	  width : 6px; 
	  height: 2px;
	  }
	.ptit ::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
	  /*滚动条里面小方块*/
	  border-radius   : 6px;
	  background-color: skyblue;
	  background-image: -webkit-linear-gradient(
	      45deg,
	      rgba(255, 255, 255, 0.2) 25%,
	      transparent 25%,
	      transparent 50%,
	      rgba(255, 255, 255, 0.2) 50%,
	      rgba(255, 255, 255, 0.2) 75%,
	      transparent 75%,
	      transparent
	  );
	  }
	.ptit ::v-deep .el-table__body-wrapper::-webkit-scrollbar-track {
	  /*滚动条里面轨道*/
	  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
	  background   : #ededed;
	  border-radius: 10px;
	}
	.ptit ::v-deep #tab-first{
		padding-left: 20px;
	}
	.search-list-item{
		line-height: 40px;
		font-size: 14px;
		padding:0 20px;
		cursor: pointer;
		text-align: left;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		border-bottom: 1px solid #EBEEF5;
		transition: background-color .25s ease;
	}
	.search-list-item:hover{
		
		background: #f5f7fa;
	}
</style>
