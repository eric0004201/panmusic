<template>
	<div class="main" v-loading="loading">
		<div class="main-in">
			<tags :tags="tags" @tagClick="tagClick"></tags>
			<div>
				<songs-list ref="songs" @imgDone="imgDone" :mTableData="mTableData"></songs-list>
			</div>
		</div>
	</div>
</template>

<script>
	import Tags from 'components/content/Tags/Tags.vue'
	import SongsList from 'components/content/SongsList/SongsList.vue'
	import { getNewSongs } from 'network/player.js'
	
	export default{
		name:"NewMusic",
		components:{
			Tags,
			SongsList
		},
		data(){
			return {
				tags:['全部','华语','欧美','日本','韩国'],
				mTableData:[],
				loading:false
			}
		},
		created() {
			this.getList(0);
		},
		mounted() {
			
			let that = this;
			this.$bus.$on('openList',(id) => {
				this.cur = -1;
				this.mTableData.findIndex(function(value, index, arr) {
					if(id === value.id) {
						that.cur = index
						
					}
				})
				this.$refs.songs.cur = this.cur;
			});
			
		},
		methods:{
			
			tagClick(tag){
				let type=0;
				switch(tag){
					case '全部':
						type = 0;
						break;
					case '华语':
						type = 7;
						break;
					case '欧美':
						type = 96;
						break;
					case '日本':
						type = 8;
						break;
					case '韩国':
						type = 16;
						break;
						
				}
				this.getList(type);
			},
			imgDone(){
				this.loading = false;
			},
			getList(type){
				this.loading = true;
				
				getNewSongs(type).then(res => {
					
					this.mTableData = res.data;
					this.$refs.songs.firstCK = false;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/css/style.scss";
	
	
	
</style>
