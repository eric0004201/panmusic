<template>
	<div class="slist">
		<el-table
			
			ref="singleTable"
			:data="mTableData"
			@row-click="playSong"
			highlight-current-row
			@current-change="handleCurrentChange"
			style="width: 100%">
			<el-table-column
			      type="index"
						align="center"
			      width="50">
			</el-table-column>
			<el-table-column
				
				label=" "
				width="130">
				<template slot-scope="scope">
					<img class="timg" @load='timgload' :src="imgSrc(scope)"/>
				</template>
			</el-table-column>
			<el-table-column
				property="name"
				label="音乐标题"
				width="">
			</el-table-column>
			<el-table-column
				property="name"
				:formatter="person"
				label="歌手"
				>
			</el-table-column>
			<el-table-column
				property="name"
				label="专辑"
				:formatter="edition"
				width="">
			</el-table-column>
			<el-table-column
				property="dt"
				:formatter="fomat"
				width="100"
				label="时长">
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import { fenFormat, dateFormat } from 'common/utils.js'
	
	export default{
		name:"SongsList",
		data(){
			return{
				loadNum:0,
				firstCK:false,
				cur:0
				
			}
		},
		props:{
			mTableData:{
				type:Array,
				default(){
					return []
				}
			}
		},
		watch:{
			cur(){
				
				if(this.cur === -1) {
					
					this.$refs.singleTable.setCurrentRow();
				}else{
					this.$refs.singleTable.setCurrentRow(this.mTableData[this.cur]);
				}
				
			}
		},
		methods:{
			playSong(val){
			
				if(!this.firstCK){
					this.$store.commit('addMusicList',this.mTableData);
					this.firstCK = true;
				}
				this.$bus.$emit("play",val);
				this.$refs.singleTable.setCurrentRow(this.mTableData[this.cur]);
			},
			handleCurrentChange(val) {
				this.currentRow = val;
				
			},
			timgload(){
				
				this.loadNum++;
				
				if(this.loadNum>=this.mTableData.length){
					
					
					this.$emit('imgDone')
				} 
			},
			imgSrc(val){
				
				if(val.row.hasOwnProperty('al')){
					return "//" + val.row.al.picUrl.split("//")[1] + '?param=120y120' 
				}else{
					return "//" + val.row.album.picUrl.split("//")[1] + '?param=120y120' 
				}
				
				
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
					let arr = []
					for(let i of val.artists) {
						arr.push(i.name)
					}
					return arr.join("/")
					
				}else{
					let arr2 = []
					for(let i of val.ar) {
						arr2.push(i.name)
					}
					return arr2.join("/")
					
				}
			},
			edition(val){
				if(val.hasOwnProperty('artists')){
					return val.album.name
				}else{
					return val.al.name
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.timg{
		width: 75px;
		height: 75px;
		vertical-align: middle;
	}
</style>
