<template>
	<div class="carousel">
		<el-carousel :interval="4000" type="card" height="240px">
			<el-carousel-item v-for="(item , index) in banner" :key="item.imageUrl">
				<img class="img" :src="item.imageUrl | imageUrl" />
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
	import { imgSrc } from 'common/mixin.js'

	export default{
		name:"MyCarousel",
		props:{
			banner:{
				type:Array,
				default(){
					return []
				}
			}
		},
		mixins:[imgSrc]
		
	}
</script>

<style lang="scss" scoped>
	.carousel{
		
	}
	.img{
		width: 100%;
	}
</style>

