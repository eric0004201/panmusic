<template>
	<div class="mv-list">
		<mv-list-item v-for="item in mvList" :obj="item"></mv-list-item>
		<i></i><i></i><i></i><i></i>
	</div>
</template>

<script>
	import MvListItem from 'components/content/MvList/MvListItem'
	
	export default{
		name:"MvList",
		props:{
			mvList:{
				type:Array,
				default(){
					return []
				}
			}
		},
		components:{
			MvListItem
		}
	}
</script>


<style lang="scss" scoped>
	.mv-list{
		@include mlist
		
	}
	.mv-list i{
		width: 24%;
	}
</style>
