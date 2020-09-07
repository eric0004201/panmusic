<template>
	<div class="new">
		<div class="new-item" v-for="(item,index) in list" :key="index" @click="play(item)">
			<div class="num">{{numFormt(index)}}</div>
			<div class="img"><img :src="item.picUrl" /></div>
			<div class="wd">
				<div class="tip">{{item.name}}</div>
				<div>{{sname(item.song.artists)}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { artName } from 'common/mixin.js'
	export default{
		name:"NewMusic",
		computed:{
			
			numFormt(){
				return function(index){
					let num=parseInt(index) + 1;
					num = num < 10 ? "0" + num : num;
					return num
				}
			}
		},
		mixins:[artName],
		props:{
			list:{
				type:Array,
				default(){
					return []
				}
			}
		},
		methods:{
			play(item){
				this.$store.commit('addMusic',item.song);
				
				this.$bus.$emit("play",item.song);
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.new{
		position: relative;
		display: flex;
		flex-wrap: wrap;
		flex-direction:column;
		height: 500px;
	}
	.new-item{
		width: 50%;
		padding: 10px;
		display: flex;
		cursor: pointer;
	}
	.new-item:hover{
		background: $navHoverBg;
	}
	.img img{
		height: 76px;
	}
	.num{
		width: 38px;
		text-align: center;
		line-height: 76px;
		font-size: $fs16;
	}
	.wd{
		font-size: $fs14;
		padding-left: 20px;
	}
	.tip{
		padding-top: 8px;
		padding-bottom: 20px;
	}
</style>
