<template>
	<div class="carousel">
		<el-carousel :interval="4000" type="card" :height="gheight">
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
		data(){
			return {
				dw:document.documentElement.clientWidth
			}
		},
		computed:{
			gheight(){
				let h = 135*this.dw/1000
				if(this.dw>1000){
					h=h+(this.dw-1000)*0.05;
				}
				return h+"px"
			}
		},
		mixins:[imgSrc],
		mounted() {
			window.onresize = () => {
				this.dw = document.documentElement.clientWidth;
			}
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

