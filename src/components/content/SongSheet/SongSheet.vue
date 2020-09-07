<template>
	<div class="song-list">
		<song-sheet-item @imgLoad="imgDone" v-for="(item,index) in songs" :obj="item" :key="index"></song-sheet-item>
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
	.song-list i{
		width: 19%;
	}
</style>
