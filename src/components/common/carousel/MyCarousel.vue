<template>
	<div class="carousel">
		<el-carousel :interval="4000" type="card" height="240px">
			<el-carousel-item v-for="(item , index) in banner" :key="item.imageUrl">
				<img class="img" :src="item.imageUrl" />
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>


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
		mounted() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.carousel{
		
	}
	.img{
		width: 100%;
	}
</style>

