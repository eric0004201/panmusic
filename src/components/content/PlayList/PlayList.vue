<template>
	<div class="play-list" v-show="isShow">
		<div class="close" @click="closeList"><i class="el-icon-close"></i></div>
		<div class="ptit">播放列表</div>
		<div class="tips">
			<div>总共{{getMList.length}}首 </div>
		</div>
		<div class="list-head">
			<el-table
			    ref="singleTable"
			    :data="tableData"
					
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
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { fenFormat } from 'common/utils.js'
	
	
	export default{
		name:"PlayList",
		computed:{
			...mapGetters(['getMList'])
		},
		
		data(){
			return {
				tableData:[],
				currentRow: null,
				isShow:false
			}
		},
		methods: {
			
			handleCurrentChange(val) {
				this.currentRow = val;
				//this.$bus.$emit("play",val.id);
			},
			playSong(val){
				this.$bus.$emit("play",val);
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
			}
		},
		mounted() {
			
			
			this.$bus.$on('openList',(id,b) => {
				this.tableData = this.getMList;
				if(b) this.isShow = true;
				let num;
				this.getMList.findIndex(function(value, index, arr) {
					if(id === value.id) {
						num = index
					}
				})
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
	}
	.ptit{
		padding: 10px;
		line-height: 50px;
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
		left: 4px;
		top: 4px;
		font-size: 30px;
		cursor: pointer;
	}
	.list-head{
		position: absolute;
		top: 102px;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: auto;
	}
</style>
