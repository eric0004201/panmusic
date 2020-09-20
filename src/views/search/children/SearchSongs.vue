<template>
	<div class="search-songs" v-loading="isLoading">
		<el-table
		    ref="singleTable"
		    :data="tableData"
		    highlight-current-row
		    @current-change="handleCurrentChange"
				@row-click="playSong"
		    style="width: 100%">
		   <el-table-column
		         type="index"
						 align="center"
		         width="100">
		       </el-table-column>
		    <el-table-column
		      property="name"
		      label="音乐标题"
					:show-overflow-tooltip='true'
		      >
		    </el-table-column>
				<el-table-column width="30">
					
				</el-table-column>
		    <el-table-column
		      property="artists[0].name"
		      label="歌手"
					
					width=""
		      >
		    </el-table-column>
				<el-table-column
				  property="album.name"
				  label="专辑"
					width=""
				  >
				</el-table-column>
		    <el-table-column
		      property="name"
					:formatter="fomat"
					width="100"
		      label="时长">
		    </el-table-column>
		  </el-table>
			<div class="pg">
				<pagination ref='page' :pageSize='pageSize' :total="cnum" @goPage='goPage'></pagination>
			</div>
			
	</div>
</template>

<script>
	import { getResult } from 'network/find.js'
	import { fenFormat } from 'common/utils.js'
	import Pagination from 'components/content/Pagination/Pagination.vue'
	
	export default{
		name:"SearchSongs",
		data(){
			return {
				tableData:[],
				pageSize:50,
				page:0,
				key:'',
				firstCK:false,
				cur:0,
				currentRow: null,
				cnum:0,
				isLoading:true
			}
		},
		components:{
			Pagination
		},
		created() {
			this.key = this.$route.params.id
			
			this.getSongs();
			
		},
		watch:{
			cur(){
				
				if(this.cur === -1) {
					
					this.$refs.singleTable.setCurrentRow();
				}else{
					this.$refs.singleTable.setCurrentRow(this.tableData[this.cur]);
				}
				
			},
			$route(to,from){
				this.$router.go(0)
			}
		},
		mounted() {
			let that = this;
			this.$bus.$on('openList',(id) => {
				this.cur = -1;
				this.tableData.findIndex(function(value, index, arr) {
					if(id === value.id) {
						that.cur = index
						
					}
				})
				
			});
			
		},
		methods:{
			getSongs(){
				let pg = this.pageSize * this.page;
				getResult(this.pageSize, pg, this.key, '').then(res => {
					this.tableData = res.result.songs;
					this.cnum = res.result.songCount;
					this.$bus.$emit("all",this.cnum);
					this.isLoading = false;
				})
			},
			playSong(val){
			
				if(!this.firstCK){
					this.$store.commit('addMusicList',this.tableData);
					this.firstCK = true;
				}
				this.$bus.$emit("play",val);
				this.$refs.singleTable.setCurrentRow(this.tableData[this.cur]);
			},
			handleCurrentChange(val) {
				this.currentRow = val;
				
				//this.$bus.$emit("play",val.id);
			},
			fomat(val){
				if(val.hasOwnProperty('artists')){
					return fenFormat(val.duration/1000)
				}else{
					return fenFormat(val.dt/1000)
				}
				
			},
			goPage(val){
				this.page = val-1;
				this.getSongs();
				
				this.$bus.$emit("gotop")
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pg{
		padding-top: 30px;
	}
	.bgon .search-songs ::v-deep .el-table{
		background: none;
	}
	.bgon .search-songs ::v-deep .el-table tr,.bgon .search-songs ::v-deep .el-table th{
		background: none;
	}
	.bgon .search-songs ::v-deep .el-table tr:hover td{
		background: #b3b3b3;
		cursor: pointer;
	}
	.bgon .search-songs ::v-deep .el-table__body tr.current-row>td{
		background-color: #a4abb3;
	}
</style>
