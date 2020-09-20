<template>
	<div class="song-list">
		<div class="item-wp" v-for="(item,index) in songs" :key="index">
			<song-sheet-item @imgLoad="imgDone"  :obj="item" ></song-sheet-item>
		</div>
		
		<i></i><i></i><i></i><i></i><i></i>
	</div>
</template>

<script>
	import SongSheetItem from 'components/content/SongSheet/SongSheetItem.vue'
	export default{
		name:"SongSheet",
		props:{
			songs:{
				type:Array,
				default(){
					return [];
				}
			}
		},
		mounted() {
			
		},
		methods:{
			imgDone(){
				
				this.$emit("imgDone");
			}
		},
		components:{
			SongSheetItem
		}
	}
</script>

<style lang="scss" scoped>
	.song-list{
		@include mlist
	}
	.item-wp{
		width: 19%;
		@include mediaWidth;
	}
	.song-list i{
		width: 19%;
		@include mediaWidth;
	}
</style>
