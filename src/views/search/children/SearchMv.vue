<template>
	<div class="res-mv" v-loading="isLoading">
		<mv-list :mv-list="mvList"></mv-list>
		<div class="pg">
			<pagination ref='page' :pageSize='pageSize' :total="cnum" @goPage='goPage'></pagination>
		</div>
		
	</div>
</template>

<script>
	import MvList from 'components/content/MvList/MvList.vue'
	import Pagination from 'components/content/Pagination/Pagination.vue'
	import { getResult } from 'network/find.js'
	
	export default{
		name:"SearchMv",
		components:{
			MvList,
			Pagination
		},
		data(){
			return {
				pageSize:48,
				page:0,
				key:'',
				cnum:0,
				mvList:[],
				isLoading:true
			}
		},
		created() {
			this.key = this.$route.params.id;
			this.getList();
		},
		mounted() {
			
		},
		methods:{
			getList(){
				let pg = this.pageSize * this.page;
				getResult(this.pageSize, pg, this.key, '1004').then(res => {
					
					this.mvList = res.result.mvs;
					this.cnum = res.result.mvCount;
					this.$bus.$emit("all",this.cnum);
					this.isLoading = false;
				})
			},
			goPage(val){
				this.page = val-1;
				this.getList();
				
				this.$bus.$emit("gotop")
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.res-mv{
		padding: 15px;
		padding-bottom: 100px;
	}
</style>
