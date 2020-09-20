<template>
	<div class="page">
		<el-pagination
		    layout="prev, pager, next"
				:page-size="pageSize"
				:hide-on-single-page="true"
				:current-page.sync="currentPage"
				@current-change="goPage"
		    :total="total">
		 </el-pagination>
	</div>
</template>

<script>
	export default{
		name:"Pagination",
		data(){
			return {
				currentPage:1
			}
		},
		props:{
			pageSize:{
				type:Number,
				default(){
					return 0
				}
			},
			total:{
				type:Number,
				default(){
					return 0
				}
			}
		},
		methods:{
			goPage(val){
				
				this.$emit("goPage",val)
				
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		text-align: right;
		padding-bottom: 30px;
	}
	.bgon .page ::v-deep .el-pagination button:disabled{
		background: none;
	}
	.bgon .page ::v-deep .el-pagination .btn-next,.bgon .page ::v-deep .el-pagination .btn-prev{
		background: none;
	}
	.bgon .page ::v-deep .el-pager li{
		background: none;
	}
</style>
