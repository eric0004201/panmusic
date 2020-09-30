<template>
	<div class="slist">
		<el-table
			
			ref="singleTable"
			:data="mdata"
			@row-click="playSong"
			highlight-current-row
			@current-change="handleCurrentChange"
			style="width: 100%">
			<el-table-column
			      type="index"
						:index="indexMethod"
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
		<pagination class="page" ref='page' :pageSize='pageSize' :total="cnum" @goPage='goPage'></pagination>
	</div>
</template>

<script>
	import Pagination from 'components/content/Pagination/Pagination.vue'
	import { fenFormat, dateFormat,group } from 'common/utils.js'
	
	export default{
		name:"SongsList",
		data(){
			return{
				loadNum:0,
				firstCK:false,
				cur:0,
				mdata:[],
				pageSize:40,
				cnum:0,
				arr:[],
				curPage:0
			}
		},
		components:{
			Pagination
		},
		props:{
			mTableData:{
				type:Array,
				default(){
					return []
				}
			}
		},
		mounted() {
			this.$bus.$on("collectClick",() => {
				this.firstCK = false;
			})
			
		},
		watch:{
			cur(){
				if(this.cur === -1) {
					this.$refs.singleTable.setCurrentRow();
				}else{
					this.$refs.singleTable.setCurrentRow(this.mTableData[this.cur]);
				}
				
			},
			mTableData(){
				this.arr = group(this.mTableData,this.pageSize);
				
				this.cnum = this.mTableData.length
				this.mdata = this.arr[0]
			}
		},
		methods:{
			indexMethod(index) {
				return index+1 + (this.curPage*this.pageSize);
			},
			goPage(val){
				
				this.mdata = this.arr[val-1]
				this.firstCK = false;
				this.curPage = val-1;
				this.$emit("goPage")
			},
			playSong(val){
			
				if(!this.firstCK){
					this.$store.commit('addMusicList',this.mdata);
					this.firstCK = true;
					this.$bus.$emit("listClick");
				}
				this.$bus.$emit("play",val);
				this.$bus.$emit("curname",'播放列表');
				this.$refs.singleTable.setCurrentRow(this.mdata[this.cur]);
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.timg{
		width: 75px;
		height: 75px;
		vertical-align: middle;
	}
	.bgon .slist ::v-deep .el-table{
		background: none;
	}
	.bgon .slist ::v-deep .el-table tr,.bgon .slist ::v-deep .el-table th{
		background: none;
	}
	.bgon .slist ::v-deep .el-table tr:hover td{
		background: #b3b3b3;
		cursor: pointer;
	}
	.bgon .slist ::v-deep .el-table__body tr.current-row>td{
		background-color: #a4abb3;
	}
	.page{
		padding-top: 40px;
		padding-bottom: 0;
	}
</style>
