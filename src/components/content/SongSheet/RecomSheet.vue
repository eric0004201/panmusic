<template>
	<div class="song-list">
		<div ref="item" class="item-wp" v-for="(item,index) in songs" :key="index">
			<recom-sheet-item ref="ss" :curIndex="curIndex"  @imgLoad="imgDone" :index="index"  :obj="item"></recom-sheet-item>
			
		</div>
		
		<i></i><i></i><i></i><i></i><i></i>
	</div>
</template>

<script>
	import RecomSheetItem from 'components/content/SongSheet/RecomSheetItem.vue'
	export default{
		name:"RecomSheet",
		props:{
			songs:{
				type:Array,
				default(){
					return [];
				}
			}
		},
		data(){
			return{
				curIndex:0
			}
			
		},
		mounted() {
			
		},
		methods:{
			imgDone(h){
				
				this.$emit("imgDone",h);
			},
			setIndex(n){
				
				this.curIndex = n;
			}
		},
		components:{
			RecomSheetItem
		}
	}
</script>

<style lang="scss" scoped>
	.song-list{
		@include mlist;
		min-height: 500px;
	}
	.item-wp{
		width: 32%;
	}
	.song-list i{
		width: 32%;
		
	}
</style>
