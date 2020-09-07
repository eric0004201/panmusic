<template>
	<div class="slist">
		<song-sheet :songs="playList"></song-sheet>
		<div class="pg">
			<pagination ref='page' :pageSize='pageSize' :total="cnum" @goPage='goPage'></pagination>
		</div>
	</div>
</template>

<script>
	import SongSheet from 'components/content/SongSheet/SongSheet.vue'
	import Pagination from 'components/content/Pagination/Pagination.vue'
	import { getResult } from 'network/find.js'
	
	export default{
		name:"SearchList",
		components:{
			SongSheet,
			Pagination
		},
		data(){
			return {
				pageSize:50,
				page:0,
				key:'',
				playList:[],
				cnum:0
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
				getResult(this.pageSize, pg, this.key, '1000').then(res => {
					
					this.playList = res.result.playlists
					this.cnum = res.result.playlistCount
					this.$bus.$emit("all",this.cnum);
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
	.slist{
		padding: 20px;
	}
</style>
