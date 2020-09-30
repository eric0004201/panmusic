<template>
	<div class="new">
		<div class="new-item" v-for="(item,index) in list" :key="index" @click="play(item)">
			<div class="num">{{numFormt(index)}}</div>
			<div class="img"><img :src="item.picUrl | imageUrl" /></div>
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
		filters:{
			imageUrl(src){
				return "//"+src.split("//")[1] + "?param=100y100";
			}
		},
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
				this.$bus.$emit("curname",'播放列表');
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
	.bgon .new-item:hover{
		background: #b3b3b3;
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
		overflow: hidden;
		flex: 1;
	}
	.tip{
		padding-top: 8px;
		padding-bottom: 20px;
		@include txt-over;
	}
</style>
